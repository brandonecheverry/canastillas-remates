"use client"

import { useEffect, useRef, useState, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

// ─── Lerp ──────────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// ─── Scroll stages ─────────────────────────────────────────────────────────────
const STAGES = [
  { at: 0.00, rotX:  0.4,  rotY: -0.6,  rotZ:  0.1,  posY: -1.5, scale: 1.4 },
  { at: 0.20, rotX:  0.15, rotY: -0.2,  rotZ:  0.0,  posY: -0.3, scale: 2.0 },
  { at: 0.40, rotX:  0.0,  rotY:  0.5,  rotZ:  0.0,  posY:  0.0, scale: 2.4 },
  { at: 0.60, rotX: -0.1,  rotY:  1.1,  rotZ: -0.05, posY:  0.2, scale: 2.5 },
  { at: 0.80, rotX: -0.3,  rotY:  1.8,  rotZ: -0.08, posY:  0.0, scale: 2.1 },
  { at: 1.00, rotX: -0.5,  rotY:  2.6,  rotZ: -0.12, posY:  3.5, scale: 1.0 },
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

// ─── GLB Model ─────────────────────────────────────────────────────────────────
function CrateModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const current  = useRef(interpolateStages(0))
  const { scene } = useGLTF("/models/plastic_crate.glb")

  const model = useMemo(() => {
    const clone = scene.clone(true)

    // Center via bounding box
    const box = new THREE.Box3().setFromObject(clone)
    const center = box.getCenter(new THREE.Vector3())
    clone.position.sub(center)

    // Enhance every mesh material
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.roughness = 0.4
            m.metalness = 0.05
            m.envMapIntensity = 1.5
            m.needsUpdate = true
          }
        })
      }
    })
    return clone
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = interpolateStages(scrollProgress)
    const k = 1 - Math.pow(0.02, delta)

    current.current.rotX  = lerp(current.current.rotX,  target.rotX,  k)
    current.current.rotY  = lerp(current.current.rotY,  target.rotY,  k)
    current.current.rotZ  = lerp(current.current.rotZ,  target.rotZ,  k)
    current.current.posY  = lerp(current.current.posY,  target.posY,  k)
    current.current.scale = lerp(current.current.scale, target.scale, k)

    groupRef.current.rotation.set(
      current.current.rotX,
      current.current.rotY,
      current.current.rotZ
    )
    groupRef.current.position.y = current.current.posY
    groupRef.current.scale.setScalar(current.current.scale)
  })

  return (
    <group ref={groupRef}>
      <primitive object={model.current} />
    </group>
  )
}

useGLTF.preload("/models/plastic_crate.glb")

// ─── Scene ──────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]}   intensity={3} castShadow />
      <directionalLight position={[-5, 4, -5]}  intensity={1.5} color="#ff8c42" />
      <spotLight
        position={[0, 14, 2]}
        intensity={8}
        angle={0.35}
        penumbra={0.8}
        castShadow
      />
      <pointLight position={[4, 0, 4]} intensity={20} color="#ff5500" distance={18} />
      <Environment preset="warehouse" />
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.5}
        scale={12}
        blur={2.5}
        far={6}
      />
      <Suspense fallback={null}>
        <CrateModel scrollProgress={scrollProgress} />
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

        {/* Background gradient that shifts with scroll */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% ${30 + progress * 30}%, hsl(25 50% 8%) 0%, hsl(220 18% 4%) 70%)`,
          }}
        />

        {/* 3D Canvas */}
        <Canvas
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 1, 9], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          shadows
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
            : 1
            : 0
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
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2 font-medium">
                Canastillas Plasticas
              </p>
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
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Desliza para descubrir
          </p>
          <div className="mx-auto w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
