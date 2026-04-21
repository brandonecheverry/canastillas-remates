"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

// ─── Interpolation helpers ──────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const STAGES = [
  { at: 0.00, rotX:  0.9, rotY: -0.5, rotZ:  0.1, posY: -2.5, scale: 0.6 },
  { at: 0.20, rotX:  0.4, rotY: -0.2, rotZ:  0.0, posY: -0.5, scale: 0.9 },
  { at: 0.40, rotX:  0.0, rotY:  0.3, rotZ:  0.0, posY:  0.0, scale: 1.1 },
  { at: 0.60, rotX: -0.2, rotY:  0.8, rotZ: -0.05,posY:  0.2, scale: 1.2 },
  { at: 0.80, rotX: -0.4, rotY:  1.4, rotZ: -0.1, posY:  0.0, scale: 1.1 },
  { at: 1.00, rotX: -0.7, rotY:  2.2, rotZ: -0.2, posY:  2.0, scale: 0.5 },
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

// ─── Canastilla 3D geometry ─────────────────────────────────────────────────
function CanastillaModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRef = useRef(interpolateStages(0))

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = interpolateStages(scrollProgress)
    const k = 1 - Math.pow(0.015, delta)

    targetRef.current.rotX  = lerp(targetRef.current.rotX,  target.rotX,  k)
    targetRef.current.rotY  = lerp(targetRef.current.rotY,  target.rotY,  k)
    targetRef.current.rotZ  = lerp(targetRef.current.rotZ,  target.rotZ,  k)
    targetRef.current.posY  = lerp(targetRef.current.posY,  target.posY,  k)
    targetRef.current.scale = lerp(targetRef.current.scale, target.scale, k)

    groupRef.current.rotation.x = targetRef.current.rotX
    groupRef.current.rotation.y = targetRef.current.rotY
    groupRef.current.rotation.z = targetRef.current.rotZ
    groupRef.current.position.y = targetRef.current.posY
    groupRef.current.scale.setScalar(targetRef.current.scale)
  })

  // Shared material — bright orange plastic
  const plasticMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e05a10"),
        roughness: 0.35,
        metalness: 0.05,
        envMapIntensity: 1.2,
      }),
    []
  )

  // Dimensions
  const W = 3.2, D = 2.4, H = 1.4, T = 0.07 // width, depth, height, thickness

  // Slat geometry for the side ventilation bars
  const slatGeo = useMemo(() => new THREE.BoxGeometry(T, H * 0.55, T * 1.5), [])
  const hSlatGeo = useMemo(() => new THREE.BoxGeometry(W * 0.28, T, T * 1.5), [])

  // Build vertical slats for the long sides
  const longSideSlats = useMemo(() => {
    const count = 9
    const spacing = (W - T * 2) / (count + 1)
    return Array.from({ length: count }, (_, i) => ({
      x: -W / 2 + T + spacing * (i + 1),
      y: 0,
      z: D / 2,
    }))
  }, [])

  // Build vertical slats for the short sides
  const shortSideSlats = useMemo(() => {
    const count = 6
    const spacing = (D - T * 2) / (count + 1)
    return Array.from({ length: count }, (_, i) => ({
      x: W / 2,
      y: 0,
      z: -D / 2 + T + spacing * (i + 1),
    }))
  }, [])

  // Handle geometry
  const handleGeo = useMemo(
    () => new THREE.TorusGeometry(0.22, 0.045, 10, 24, Math.PI),
    []
  )

  // Bottom grid bars
  const bottomBarGeo = useMemo(() => new THREE.BoxGeometry(W - T * 2, T * 0.8, T), [])
  const bottomBarGeoB = useMemo(() => new THREE.BoxGeometry(T, T * 0.8, D - T * 2), [])

  const bottomBarsX = useMemo(
    () => Array.from({ length: 5 }, (_, i) => -D / 2 + T + ((D - T * 2) / 6) * (i + 1)),
    []
  )
  const bottomBarsZ = useMemo(
    () => Array.from({ length: 7 }, (_, i) => -W / 2 + T + ((W - T * 2) / 8) * (i + 1)),
    []
  )

  return (
    <group ref={groupRef}>
      {/* ── Bottom panel frame ── */}
      {/* Floor outer frame */}
      <mesh geometry={new THREE.BoxGeometry(W, T, D)} material={plasticMat} position={[0, -H / 2, 0]} />

      {/* ── Bottom grid ── */}
      {bottomBarsX.map((z, i) => (
        <mesh key={`bx-${i}`} geometry={bottomBarGeo} material={plasticMat} position={[0, -H / 2 + T / 2, z]} />
      ))}
      {bottomBarsZ.map((x, i) => (
        <mesh key={`bz-${i}`} geometry={bottomBarGeoB} material={plasticMat} position={[x, -H / 2 + T / 2, 0]} />
      ))}

      {/* ── Four vertical corner posts ── */}
      {[[-W/2+T/2, D/2-T/2], [W/2-T/2, D/2-T/2], [-W/2+T/2, -D/2+T/2], [W/2-T/2, -D/2+T/2]].map(([x, z], i) => (
        <mesh key={`post-${i}`} material={plasticMat} position={[x as number, 0, z as number]}>
          <boxGeometry args={[T * 2, H, T * 2]} />
        </mesh>
      ))}

      {/* ── Top rim ── */}
      <mesh material={plasticMat} position={[0, H / 2, 0]}>
        <boxGeometry args={[W, T * 1.5, D]} />
      </mesh>
      {/* Top rim inner cutout — subtract via smaller inset box with different material */}
      <mesh material={plasticMat} position={[0, H / 2 - T / 4, 0]}>
        <boxGeometry args={[W - T * 3, T * 1.5, D - T * 3]} />
      </mesh>

      {/* ── Long side walls — horizontal rails ── */}
      {[-1, 0, 1].map((lvl, li) => (
        <group key={`rl-${li}`}>
          {/* front */}
          <mesh material={plasticMat} position={[0, lvl * (H / 3.5), D / 2]}>
            <boxGeometry args={[W, T, T]} />
          </mesh>
          {/* back */}
          <mesh material={plasticMat} position={[0, lvl * (H / 3.5), -D / 2]}>
            <boxGeometry args={[W, T, T]} />
          </mesh>
          {/* left */}
          <mesh material={plasticMat} position={[-W / 2, lvl * (H / 3.5), 0]}>
            <boxGeometry args={[T, T, D]} />
          </mesh>
          {/* right */}
          <mesh material={plasticMat} position={[W / 2, lvl * (H / 3.5), 0]}>
            <boxGeometry args={[T, T, D]} />
          </mesh>
        </group>
      ))}

      {/* ── Long side vertical ventilation slats (front & back) ── */}
      {longSideSlats.map((s, i) => (
        <group key={`ls-${i}`}>
          <mesh geometry={slatGeo} material={plasticMat} position={[s.x, s.y, s.z]} />
          <mesh geometry={slatGeo} material={plasticMat} position={[s.x, s.y, -s.z]} />
        </group>
      ))}

      {/* ── Short side vertical ventilation slats (left & right) ── */}
      {shortSideSlats.map((s, i) => (
        <group key={`ss-${i}`}>
          <mesh material={plasticMat} position={[s.x, s.y, s.z]}>
            <boxGeometry args={[T * 1.5, H * 0.55, T]} />
          </mesh>
          <mesh material={plasticMat} position={[-s.x, s.y, s.z]}>
            <boxGeometry args={[T * 1.5, H * 0.55, T]} />
          </mesh>
        </group>
      ))}

      {/* ── Handles ── */}
      {[-1, 1].map((side, i) => (
        <mesh
          key={`handle-${i}`}
          geometry={handleGeo}
          material={plasticMat}
          position={[side * (W / 2 - 0.02), H / 2 - 0.05, 0]}
          rotation={[Math.PI / 2, side * Math.PI / 2, 0]}
        />
      ))}

      {/* ── Ambient fill light from below ── */}
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#ff6a20" />
      <pointLight position={[3, 2, 3]}  intensity={0.8} color="#ffffff" />
    </group>
  )
}

// ─── Scene wrapper ─────────────────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]}  intensity={2.5} castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={0.8} color="#ff8c42" />
      <spotLight position={[0, 8, 0]} intensity={3} angle={0.4} penumbra={0.8} color="#ffffff" />
      <Environment preset="warehouse" />
      <CanastillaModel scrollProgress={scrollProgress} />
    </>
  )
}

// ─── Text stages ────────────────────────────────────────────────────────────
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

// ─── Main export ────────────────────────────────────────────────────────────
export function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalHeight = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / totalHeight))
      setScrollProgress(p)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% ${40 + scrollProgress * 20}%, hsl(28 60% 12% / 0.9) 0%, hsl(220 20% 4%) 65%)`,
          }}
        />

        {/* Three.js Canvas */}
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0.8, 5.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>

        {/* Narrative text */}
        {TEXT_STAGES.map((stage) => {
          const visible = scrollProgress >= stage.minP && scrollProgress <= stage.maxP
          const fadeIn  = scrollProgress >= stage.minP && scrollProgress <= stage.minP + 0.07
          const fadeOut = scrollProgress >= stage.maxP - 0.07 && scrollProgress <= stage.maxP
          const localT  = fadeIn
            ? (scrollProgress - stage.minP) / 0.07
            : fadeOut
            ? 1 - (scrollProgress - (stage.maxP - 0.07)) / 0.07
            : 1
          return (
            <div
              key={stage.title}
              className="absolute left-6 md:left-16 top-1/2 max-w-[260px] pointer-events-none z-10"
              style={{
                opacity: visible ? localT : 0,
                transform: `translateY(calc(-50% + ${visible ? 0 : 24}px))`,
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2 font-medium">
                Canastillas
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance mb-3">
                {stage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.sub}</p>
            </div>
          )
        })}

        {/* Scroll progress bar */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-28 bg-border/30 rounded-full overflow-hidden">
            <div
              className="w-full bg-primary rounded-full"
              style={{ height: `${scrollProgress * 100}%`, transition: "height 0.1s linear" }}
            />
          </div>
          <span className="text-[9px] tracking-widest text-muted-foreground"
            style={{ writingMode: "vertical-rl" }}>
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Initial scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 8) }}
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
