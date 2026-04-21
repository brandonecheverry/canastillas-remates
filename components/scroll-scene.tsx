"use client"

import { useEffect, useRef, useState, useMemo, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { TextureLoader } from "three"
import * as THREE from "three"

// ─── Lerp ─────────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// ─── Scroll stages ─────────────────────────────────────────────────────────────
const STAGES = [
  { at: 0.00, rotX:  0.5,  rotY: -0.8,  rotZ:  0.1,  posY: -2.5, scale: 0.018 },
  { at: 0.20, rotX:  0.25, rotY: -0.3,  rotZ:  0.0,  posY: -0.5, scale: 0.028 },
  { at: 0.40, rotX:  0.0,  rotY:  0.35, rotZ:  0.0,  posY:  0.0, scale: 0.034 },
  { at: 0.60, rotX: -0.15, rotY:  0.9,  rotZ: -0.05, posY:  0.2, scale: 0.036 },
  { at: 0.80, rotX: -0.35, rotY:  1.6,  rotZ: -0.1,  posY:  0.0, scale: 0.030 },
  { at: 1.00, rotX: -0.6,  rotY:  2.4,  rotZ: -0.15, posY:  3.0, scale: 0.014 },
]

function interpolateStages(p: number) {
  let i = STAGES.length - 2
  for (let j = 0; j < STAGES.length - 1; j++) {
    if (p <= STAGES[j + 1].at) { i = j; break }
  }
  const s0 = STAGES[i], s1 = STAGES[i + 1]
  const t = Math.max(0, Math.min(1, (p - s0.at) / (s1.at - s0.at)))
  return {
    rotX:  lerp(s0.rotX,  s1.rotX,  t),
    rotY:  lerp(s0.rotY,  s1.rotY,  t),
    rotZ:  lerp(s0.rotZ,  s1.rotZ,  t),
    posY:  lerp(s0.posY,  s1.posY,  t),
    scale: lerp(s0.scale, s1.scale, t),
  }
}

// ─── OBJ Model ─────────────────────────────────────────────────────────────────
function CrateOBJ({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const current  = useRef(interpolateStages(0))

  const obj      = useLoader(OBJLoader, "/models/crate.obj")
  const diffuse  = useLoader(TextureLoader, "/models/crate_diff.jpg")

  // Apply texture + material to every mesh in the OBJ
  const model = useMemo(() => {
    const clone = obj.clone()
    diffuse.flipY = false
    diffuse.colorSpace = THREE.SRGBColorSpace

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          map:       diffuse,
          roughness: 0.45,
          metalness: 0.05,
          envMapIntensity: 1.2,
        })
        mesh.castShadow    = true
        mesh.receiveShadow = true
      }
    })

    // Center the model using its bounding box
    const box    = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    clone.position.sub(center)

    return clone
  }, [obj, diffuse])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = interpolateStages(scrollProgress)
    const k      = 1 - Math.pow(0.018, delta)

    current.current.rotX  = lerp(current.current.rotX,  target.rotX,  k)
    current.current.rotY  = lerp(current.current.rotY,  target.rotY,  k)
    current.current.rotZ  = lerp(current.current.rotZ,  target.rotZ,  k)
    current.current.posY  = lerp(current.current.posY,  target.posY,  k)
    current.current.scale = lerp(current.current.scale, target.scale, k)

    groupRef.current.rotation.set(current.current.rotX, current.current.rotY, current.current.rotZ)
    groupRef.current.position.y = current.current.posY
    groupRef.current.scale.setScalar(current.current.scale)
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} />
      {/* Warm fill light inside the crate */}
      <pointLight position={[0, 0, 0]} intensity={60} color="#ff6a20" distance={300} />
    </group>
  )
}

// ─── Scene ──────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8,  5]}  intensity={3.5} castShadow />
      <directionalLight position={[-4, 3, -4]} intensity={1.5} color="#ff8c42" />
      <spotLight position={[0, 12, 0]} intensity={5} angle={0.4} penumbra={0.9} />
      <Environment preset="warehouse" />
      <Suspense fallback={null}>
        <CrateOBJ scrollProgress={scrollProgress} />
      </Suspense>
    </>
  )
}

// ─── Narrative text stages ──────────────────────────────────────────────────────
const TEXT_STAGES = [
  {
    minP: 0.08, maxP: 0.32,
    title: "Resistencia industrial",
    sub: "Fabricadas en polietileno de alta densidad para soportar las exigencias del sector alimenticio.",
  },
  {
    minP: 0.38, maxP: 0.62,
    title: "Diseno que protege",
    sub: "Ranuras de ventilacion estrategicas mantienen frescos tus productos durante el transporte.",
  },
  {
    minP: 0.68, maxP: 0.90,
    title: "15 anos de confianza",
    sub: "Miles de empresas en la region confian en nuestra calidad desde 2009.",
  },
]

// ─── Main export ────────────────────────────────────────────────────────────────
export function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const totalHeight = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / totalHeight))
      setProgress(p)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% ${35 + progress * 25}%, hsl(25 55% 9%) 0%, hsl(220 20% 4%) 65%)`,
          }}
        />

        {/* Canvas */}
        <Canvas
          className="absolute inset-0 !h-full !w-full"
          camera={{ position: [0, 12, 80], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene scrollProgress={progress} />
        </Canvas>

        {/* Narrative texts */}
        {TEXT_STAGES.map((stage) => {
          const active  = progress >= stage.minP && progress <= stage.maxP
          const fadeIn  = progress >= stage.minP && progress <= stage.minP + 0.07
          const fadeOut = progress >= stage.maxP - 0.07 && progress <= stage.maxP
          const opacity = active
            ? fadeIn  ? (progress - stage.minP) / 0.07
            : fadeOut ? 1 - (progress - (stage.maxP - 0.07)) / 0.07
            : 1 : 0
          return (
            <div
              key={stage.title}
              className="absolute left-6 md:left-16 top-1/2 max-w-[260px] pointer-events-none z-10"
              style={{
                opacity,
                transform: `translateY(calc(-50% + ${active ? 0 : 20}px))`,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2 font-medium">Canastillas</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance mb-3">
                {stage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.sub}</p>
            </div>
          )
        })}

        {/* Scroll progress bar */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <div className="w-px h-28 bg-white/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-primary rounded-full"
              style={{ height: `${progress * 100}%`, transition: "height 0.1s linear" }}
            />
          </div>
          <span
            className="text-[9px] tracking-widest text-muted-foreground"
            style={{ writingMode: "vertical-rl" }}
          >
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
          style={{ opacity: Math.max(0, 1 - progress * 8) }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Desliza para descubrir</p>
          <div className="mx-auto w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
