"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const floatingImages = [
  { src: "/images/canastillas.png", alt: "Canastillas", delay: "0s", size: "w-28 h-28", pos: "top-8 right-8" },
  { src: "/images/estiba.png", alt: "Estiba", delay: "1.5s", size: "w-24 h-24", pos: "top-1/3 right-0 -translate-y-1/2" },
  { src: "/images/locker.png", alt: "Locker", delay: "0.8s", size: "w-28 h-28", pos: "bottom-16 right-12" },
  { src: "/images/estanteria.png", alt: "Estanteria", delay: "2s", size: "w-20 h-20", pos: "top-1/2 left-8" },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  const features = [
    "15 anos de experiencia",
    "Sector alimenticio e industrial",
    "Cobertura regional",
  ]

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background noise"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-30"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.8s ease",
        }}
      />

      {/* Radial glows */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.6s ease",
        }}
      />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left content */}
          <div className="space-y-8 perspective-1000">
            <div
              className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Distribuidores desde 2009 · Pereira, Colombia
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
                Soluciones que{" "}
                <span className="shimmer-text">impulsan</span>
                <br />
                tu negocio
              </h1>
            </div>

            <p
              className={`text-lg text-muted-foreground max-w-xl leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              Empresa de Pereira con 15 anos en el mercado, distribuyendo canastillas,
              estibas plasticas y productos industriales para el sector alimenticio e industrial.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Link
                href="#productos"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl text-base font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(28_90%_55%/0.4)] hover:scale-105 group"
              >
                Ver Catalogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/573217024720?text=Hola%2C%20quiero%20solicitar%20una%20cotizacion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-secondary border border-border text-foreground px-6 py-4 rounded-xl text-base font-medium hover:border-primary/50 transition-all duration-300 hover:bg-muted"
              >
                Solicitar Cotizacion
              </a>
            </div>

            <div
              className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D floating product scene */}
          <div
            className={`relative h-[480px] perspective-2000 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`,
              transition: "transform 0.6s ease",
            }}
          >
            {/* Central orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Rings */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border border-primary/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />

                {/* Glow core */}
                <div className="absolute inset-8 bg-primary/10 rounded-full blur-xl animate-pulse-glow" />

                {/* Center card */}
                <div className="absolute inset-12 glass rounded-2xl flex flex-col items-center justify-center border border-primary/30 animate-pulse-glow">
                  <span className="font-serif text-5xl font-bold text-primary">15</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center leading-tight">Anos de<br/>Experiencia</span>
                </div>
              </div>
            </div>

            {/* Floating product images */}
            {floatingImages.map((img, i) => (
              <div
                key={img.alt}
                className={`absolute ${img.pos} ${img.size} glass rounded-2xl border border-border p-2 overflow-hidden`}
                style={{
                  animation: `float ${4 + i}s ease-in-out infinite`,
                  animationDelay: img.delay,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}

            {/* Stats badge */}
            <div
              className="absolute bottom-4 left-4 glass rounded-2xl px-4 py-3 border border-border"
              style={{ animation: "float-reverse 6s ease-in-out infinite" }}
            >
              <p className="text-xs text-muted-foreground">Clientes satisfechos</p>
              <p className="font-serif text-2xl font-bold text-primary">+500</p>
            </div>

            {/* Products badge */}
            <div
              className="absolute top-4 left-0 glass rounded-2xl px-4 py-3 border border-border"
              style={{ animation: "float 8s ease-in-out infinite", animationDelay: "1s" }}
            >
              <p className="text-xs text-muted-foreground">Productos</p>
              <p className="font-serif text-2xl font-bold text-foreground">9+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float-slow">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  )
}
