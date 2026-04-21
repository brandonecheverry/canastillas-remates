"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// Keyframes for the scroll-driven 3D animation, Apple-style
// The canastilla starts small and far away, then zooms in, rotates and settles
const STAGES = [
  // [scrollProgress 0-1, scale, rotateX, rotateY, rotateZ, translateZ, opacity, brightness]
  { at: 0.0, scale: 0.35, rotX: 55,  rotY: -30, rotZ: 8,  tz: -400, opacity: 0,   bright: 0.4 },
  { at: 0.1, scale: 0.5,  rotX: 45,  rotY: -20, rotZ: 4,  tz: -250, opacity: 0.6, bright: 0.6 },
  { at: 0.3, scale: 0.75, rotX: 30,  rotY: -10, rotZ: 2,  tz: -100, opacity: 0.9, bright: 0.8 },
  { at: 0.5, scale: 1.0,  rotX: 10,  rotY: 5,   rotZ: 0,  tz: 0,    opacity: 1,   bright: 1.0 },
  { at: 0.7, scale: 1.15, rotX: -5,  rotY: 15,  rotZ: -2, tz: 20,   opacity: 1,   bright: 1.0 },
  { at: 0.85,scale: 1.25, rotX: -15, rotY: 25,  rotZ: -4, tz: 40,   opacity: 0.8, bright: 0.9 },
  { at: 1.0, scale: 1.6,  rotX: -30, rotY: 40,  rotZ: -6, tz: 80,   opacity: 0,   bright: 0.5 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function interpolate(progress: number) {
  let i = STAGES.length - 2
  for (let j = 0; j < STAGES.length - 1; j++) {
    if (progress <= STAGES[j + 1].at) { i = j; break }
  }
  const s0 = STAGES[i]
  const s1 = STAGES[i + 1]
  const t = (progress - s0.at) / (s1.at - s0.at)
  return {
    scale:   lerp(s0.scale, s1.scale, t),
    rotX:    lerp(s0.rotX,  s1.rotX,  t),
    rotY:    lerp(s0.rotY,  s1.rotY,  t),
    rotZ:    lerp(s0.rotZ,  s1.rotZ,  t),
    tz:      lerp(s0.tz,    s1.tz,    t),
    opacity: lerp(s0.opacity, s1.opacity, t),
    bright:  lerp(s0.bright,  s1.bright,  t),
  }
}

const TEXT_STAGES = [
  { minP: 0.05, maxP: 0.28, title: "Resistencia industrial", sub: "Fabricadas en polietileno de alta densidad para soportar las exigencias del sector alimenticio." },
  { minP: 0.35, maxP: 0.55, title: "Diseno que protege", sub: "Ranuras de ventilacion estrategicas mantienen frescos tus productos durante el transporte." },
  { minP: 0.60, maxP: 0.80, title: "15 anos de confianza", sub: "Miles de empresas en la region confian en nuestra calidad desde 2009." },
]

export function ScrollScene() {
  const stickyRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(interpolate(0))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = stickyRef.current
      if (!el) return
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const totalHeight = parent.offsetHeight - window.innerHeight
      // progress goes 0 → 1 across the entire sticky section
      const progress = Math.min(1, Math.max(0, -rect.top / totalHeight))
      setProgress(progress)
      setState(interpolate(progress))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    // Tall outer div creates the scroll "room" — 400vh gives plenty of scroll travel
    <div className="relative h-[400vh] -mt-20" aria-hidden="true">
      {/* Sticky container that stays in view while outer div scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        {/* Radial glow that follows the canastilla */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, hsl(28 90% 55% / 0.12) 0%, transparent 70%)",
            opacity: state.opacity,
          }}
        />

        {/* Lateral scroll progress bar */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none">
          <div className="w-px h-32 bg-border/40 rounded-full overflow-hidden">
            <div
              className="w-full bg-primary rounded-full transition-all duration-100"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[10px] tracking-widest text-muted-foreground mt-2 rotate-90 origin-center whitespace-nowrap" style={{ marginTop: "2.5rem" }}>
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* The 3D canastilla */}
        <div
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              transform: `
                scale(${state.scale})
                rotateX(${state.rotX}deg)
                rotateY(${state.rotY}deg)
                rotateZ(${state.rotZ}deg)
                translateZ(${state.tz}px)
              `,
              opacity: state.opacity,
              filter: `brightness(${state.bright}) drop-shadow(0 30px 60px hsl(28 90% 55% / 0.35))`,
              willChange: "transform, opacity, filter",
              transition: "transform 0.05s linear, opacity 0.05s linear",
            }}
          >
            <Image
              src="/images/canastillas.png"
              alt="Canastilla plastica 3D"
              width={520}
              height={520}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Narrative text stages — fade in/out per scroll range */}
        {TEXT_STAGES.map((stage) => {
          const visible = progress >= stage.minP && progress <= stage.maxP
          const fadeIn  = progress >= stage.minP && progress <= stage.minP + 0.08
          const fadeOut = progress >= stage.maxP - 0.08 && progress <= stage.maxP
          const localT  = fadeIn
            ? (progress - stage.minP) / 0.08
            : fadeOut
            ? 1 - (progress - (stage.maxP - 0.08)) / 0.08
            : 1
          return (
            <div
              key={stage.title}
              className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-xs pointer-events-none"
              style={{
                opacity: visible ? localT : 0,
                transform: `translateY(calc(-50% + ${visible ? 0 : 20}px))`,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2 font-medium">Canastillas Plasticas</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance mb-3">
                {stage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.sub}</p>
            </div>
          )
        })}

        {/* Scroll progress text hints that fade in/out */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Desliza para descubrir</p>
          <div className="mx-auto mt-3 w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
