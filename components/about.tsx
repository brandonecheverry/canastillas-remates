"use client"

import { Award, Users, Truck, Shield } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"

const stats = [
  { value: 15, suffix: "+", label: "Anos de experiencia", icon: Award },
  { value: 500, suffix: "+", label: "Clientes satisfechos", icon: Users },
  { value: 1000, suffix: "+", label: "Productos entregados", icon: Truck },
  { value: 100, suffix: "%", label: "Garantia de calidad", icon: Shield },
]

function AnimatedCounter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, value])

  return (
    <span className="font-serif text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  )
}

export function About() {
  const { ref: leftRef, inView: leftInView } = useInView(0.2)
  const { ref: rightRef, inView: rightInView } = useInView(0.2)

  return (
    <section id="nosotros" className="py-24 md:py-36 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`space-y-8 transition-all duration-800 ${leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}
            style={{ transitionDuration: "0.8s" }}
          >
            <div>
              <span className="inline-block text-primary font-medium text-xs tracking-widest uppercase mb-4 border border-primary/30 px-4 py-1.5 rounded-full">
                Sobre Nosotros
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
                Innovacion, durabilidad{" "}
                <span className="shimmer-text">y eficacia</span>
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Somos una empresa de{" "}
                <strong className="text-foreground">Pereira</strong> con{" "}
                <strong className="text-primary">15 anos en el mercado</strong>, dedicada a
                distribuir una gran variedad de canastillas, estibas plasticas y otros
                productos que facilitan el desarrollo de las diferentes actividades economicas.
              </p>
              <p>
                Nuestro compromiso es ofrecer soluciones de alta calidad para el{" "}
                <strong className="text-foreground">sector alimenticio e industrial</strong> de
                la region, con productos que cumplen los mas altos estandares de calidad y durabilidad.
              </p>
              <p>
                Trabajamos con los mejores materiales: lamina cold rolled, pintura
                electrostatica y polietileno de alta resistencia.
              </p>
            </div>

            <a
              href="https://wa.me/573217024720?text=Hola%2C%20quiero%20saber%20mas%20sobre%20la%20empresa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary border border-border text-foreground px-6 py-3 rounded-xl text-base font-medium hover:border-primary/50 transition-all duration-300 hover:bg-muted hover:shadow-[0_0_20px_hsl(28_90%_55%/0.1)]"
            >
              Conoce mas sobre nosotros
            </a>
          </div>

          {/* Right: animated stats */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-2 gap-4 transition-all duration-800 ${rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
            style={{ transitionDuration: "0.8s" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(28_90%_55%/0.15)] cursor-default"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  transform: rightInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, border-color 0.3s, box-shadow 0.3s`,
                }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} active={rightInView} />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
