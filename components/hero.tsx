import { ArrowRight, CheckCircle2, Package, Users, Star, FileDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const stats = [
    { value: "15+", label: "Años en el mercado", icon: Star },
    { value: "500+", label: "Clientes activos", icon: Users },
    { value: "9", label: "Líneas de producto", icon: Package },
  ]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white"
    >
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-6 origin-top-right translate-x-12" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/8 rounded-full -translate-x-32 translate-y-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold animate-fade-in">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Distribuidores desde 2009 · Pereira
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight animate-fade-up">
              Tu operación,{" "}
              <span className="text-primary relative inline-block">
                sin límites
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="hsl(25 90% 52%)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-up delay-100">
              Canastillas, estibas, lockers y mobiliario industrial para el sector
              alimenticio e industrial en Pereira y toda la región. Calidad que se nota.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
              <a
                href="/documents/catalogo_general.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-base font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                <FileDown className="w-5 h-5" />
                Ver Catálogo PDF
              </a>
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-7 py-4 rounded-xl text-base font-bold hover:bg-foreground hover:text-white transition-all"
              >
                Pedir Cotización
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 animate-fade-up delay-300">
              {["Envíos a toda la región", "Atención personalizada", "Precios competitivos"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logo + Stats */}
          <div className="relative flex flex-col gap-6 animate-fade-in delay-200">
            <div className="bg-white rounded-3xl border-2 border-border p-8 flex items-center justify-center shadow-xl">
              <Image
                src="/logos/logo_canastillas.jpeg"
                alt="Canastillas y Remates"
                width={340}
                height={260}
                className="w-full max-w-xs h-auto object-contain mix-blend-multiply"
                priority
              />
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-foreground text-white rounded-2xl p-4 text-center"
                >
                  <p className="text-2xl font-black text-primary">{s.value}</p>
                  <p className="text-xs text-white/70 mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
