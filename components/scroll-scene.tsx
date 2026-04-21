"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// ─── Lerp helper ─────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// ─── Scroll stages ────────────────────────────────────────────────────────────
const STAGES = [
  { at: 0.00, rotX:  0.9, rotY: -0.5, rotZ:  0.1,  posY: -3.0, scale: 0.55 },
  { at: 0.20, rotX:  0.4, rotY: -0.2, rotZ:  0.0,  posY: -0.5, scale: 0.85 },
  { at: 0.40, rotX:  0.0, rotY:  0.4, rotZ:  0.0,  posY:  0.0, scale: 1.1  },
  { at: 0.60, rotX: -0.2, rotY:  0.9, rotZ: -0.05, posY:  0.2, scale: 1.2  },
  { at: 0.80, rotX: -0.4, rotY:  1.5, rotZ: -0.1,  posY:  0.0, scale: 1.1  },
  { at: 1.00, rotX: -0.7, rotY:  2.3, rotZ: -0.2,  posY:  3.0, scale: 0.4  },
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

// ─── Canastilla 3D Model ──────────────────────────────────────────────────────
function CanastillaModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const current  = useRef(interpolateStages(0))

  // Shared orange plastic material
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e05a10"),
    roughness: 0.4,
    metalness: 0.05,
  }), [])

  // Dimensions
  const W = 3.2, D = 2.4, H = 1.5, T = 0.07

  // Bottom floor
  const floorGeo = useMemo(() => new THREE.BoxGeometry(W, T, D), [W, D, T])

  // Top rim (full width)
  const rimGeo = useMemo(() => new THREE.BoxGeometry(W, T * 1.8, D), [W, D, T])

  // Corner posts
  const postGeo = useMemo(() => new THREE.BoxGeometry(T * 2.2, H, T * 2.2), [H, T])

  // Horizontal rails — long side (front/back)
  const hRailLongGeo = useMemo(() => new THREE.BoxGeometry(W, T, T), [W, T])
  // Horizontal rails — short side (left/right)
  const hRailShortGeo = useMemo(() => new THREE.BoxGeometry(T, T, D), [D, T])

  // Vertical slats — long side (front/back)
  const vSlatLongGeo  = useMemo(() => new THREE.BoxGeometry(T * 1.2, H * 0.58, T * 1.4), [H, T])
  // Vertical slats — short side (left/right)
  const vSlatShortGeo = useMemo(() => new THREE.BoxGeometry(T * 1.4, H * 0.58, T * 1.2), [H, T])

  // Bottom grid bars
  const bgBarXGeo = useMemo(() => new THREE.BoxGeometry(W - T * 2, T * 0.9, T), [W, T])
  const bgBarZGeo = useMemo(() => new THREE.BoxGeometry(T, T * 0.9, D - T * 2), [D, T])

  // Handle torus
  const handleGeo = useMemo(() => new THREE.TorusGeometry(0.2, 0.04, 10, 24, Math.PI), [])

  // Pre-compute slat positions
  const longSlats = useMemo(() => {
    const count = 9
    const spacing = (W - T * 2) / (count + 1)
    return Array.from({ length: count }, (_, i) => -W / 2 + T + spacing * (i + 1))
  }, [W, T])

  const shortSlats = useMemo(() => {
    const count = 6
    const spacing = (D - T * 2) / (count + 1)
    return Array.from({ length: count }, (_, i) => -D / 2 + T + spacing * (i + 1))
  }, [D, T])

  const bottomBarsZ = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => -D / 2 + T + ((D - T * 2) / 5) * (i + 1)), [D, T])

  const bottomBarsX = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => -W / 2 + T + ((W - T * 2) / 7) * (i + 1)), [W, T])

  const railLevels = useMemo(() => [-0.38, 0, 0.38].map(f => f * H), [H])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = interpolateStages(scrollProgress)
    const k = 1 - Math.pow(0.018, delta)

    current.current.rotX  = lerp(current.current.rotX,  target.rotX,  k)
    current.current.rotY  = lerp(current.current.rotY,  target.rotY,  k)
    current.current.rotZ  = lerp(current.current.rotZ,  target.rotZ,  k)
    current.current.posY  = lerp(current.current.posY,  target.posY,  k)
    current.current.scale = lerp(current.current.scale, target.scale, k)

    groupRef.current.rotation.set(current.current.rotX, current.current.rotY, current.current.rotZ)
    groupRef.current.position.y = current.current.posY
    groupRef.current.scale.setScalar(current.current.scale)
  })

  const corners: [number, number][] = [
    [-W / 2 + T / 2,  D / 2 - T / 2],
    [ W / 2 - T / 2,  D / 2 - T / 2],
    [-W / 2 + T / 2, -D / 2 + T / 2],
    [ W / 2 - T / 2, -D / 2 + T / 2],
  ]

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh geometry={floorGeo} material={mat} position={[0, -H / 2, 0]} />

      {/* Bottom grid — cross bars */}
      {bottomBarsZ.map((z, i) => (
        <mesh key={`bgx-${i}`} geometry={bgBarXGeo} material={mat} position={[0, -H / 2 + T / 2, z]} />
      ))}
      {bottomBarsX.map((x, i) => (
        <mesh key={`bgz-${i}`} geometry={bgBarZGeo} material={mat} position={[x, -H / 2 + T / 2, 0]} />
      ))}

      {/* Corner posts */}
      {corners.map(([x, z], i) => (
        <mesh key={`post-${i}`} geometry={postGeo} material={mat} position={[x, 0, z]} />
      ))}

      {/* Top rim */}
      <mesh geometry={rimGeo} material={mat} position={[0, H / 2, 0]} />

      {/* Horizontal rails on all 4 sides — 3 levels */}
      {railLevels.map((y, li) => (
        <group key={`rail-${li}`}>
          <mesh geometry={hRailLongGeo}  material={mat} position={[0,  y,  D / 2]} />
          <mesh geometry={hRailLongGeo}  material={mat} position={[0,  y, -D / 2]} />
          <mesh geometry={hRailShortGeo} material={mat} position={[-W / 2, y, 0]} />
          <mesh geometry={hRailShortGeo} material={mat} position={[ W / 2, y, 0]} />
        </group>
      ))}

      {/* Vertical slats — front & back */}
      {longSlats.map((x, i) => (
        <group key={`ls-${i}`}>
          <mesh geometry={vSlatLongGeo} material={mat} position={[x, 0,  D / 2]} />
          <mesh geometry={vSlatLongGeo} material={mat} position={[x, 0, -D / 2]} />
        </group>
      ))}

      {/* Vertical slats — left & right */}
      {shortSlats.map((z, i) => (
        <group key={`ss-${i}`}>
          <mesh geometry={vSlatShortGeo} material={mat} position={[-W / 2, 0, z]} />
          <mesh geometry={vSlatShortGeo} material={mat} position={[ W / 2, 0, z]} />
        </group>
      ))}

      {/* Handles on left & right */}
      <mesh geometry={handleGeo} material={mat}
        position={[-(W / 2 + 0.01), H / 2 - 0.08, 0]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
      <mesh geometry={handleGeo} material={mat}
        position={[W / 2 + 0.01, H / 2 - 0.08, 0]}
        rotation={[Math.PI / 2,  Math.PI / 2, 0]} />

      {/* Accent lights inside */}
      <pointLight position={[0, -1, 0]} intensity={1.5} color="#ff6a20" distance={5} />
      <pointLight position={[0,  2, 2]} intensity={0.8} color="#ffffff"  distance={8} />
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8,  5]}  intensity={3}   castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#ff8c42" />
      <spotLight position={[0, 10, 0]} intensity={4} angle={0.35} penumbra={0.9} />
      <Environment preset="warehouse" />
      <CanastillaModel scrollProgress={scrollProgress} />
    </>
  )
}

// ─── Narrative text stages ────────────────────────────────────────────────────
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

// ─── Main export ──────────────────────────────────────────────────────────────
export function ScrollScene() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect        = el.getBoundingClientRect()
      const totalHeight = el.offsetHeight - window.innerHeight
      setProgress(Math.min(1, Math.max(0, -rect.top / totalHeight)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Dark radial background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% ${35 + progress * 25}%, hsl(25 55% 10%) 0%, hsl(220 20% 4%) 65%)`,
          }}
        />

        {/* Three.js Canvas */}
        <Canvas
          className="absolute inset-0 !h-full !w-full"
          camera={{ position: [0, 0.6, 5.8], fov: 40 }}
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
          <span className="text-[9px] tracking-widest text-muted-foreground"
            style={{ writingMode: "vertical-rl" }}>
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Initial scroll hint */}
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
