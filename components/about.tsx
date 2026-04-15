import { Award, Users, Truck, Shield } from "lucide-react"

const stats = [
  { value: "15+", label: "Anos en el mercado", icon: Award, accent: true },
  { value: "500+", label: "Clientes satisfechos", icon: Users, accent: false },
  { value: "1000+", label: "Productos entregados", icon: Truck, accent: false },
  { value: "100%", label: "Garantia de calidad", icon: Shield, accent: false },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Sobre Nosotros
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
            15 anos construyendo{" "}
            <span className="text-primary">confianza</span>
          </h2>
        </div>

        {/* Stats grid — big and bold */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 md:p-8 text-center ${
                stat.accent
                  ? "bg-primary text-white"
                  : "bg-foreground text-white"
              }`}
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.accent ? "text-white/80" : "text-primary"}`} />
              <p className="text-4xl md:text-5xl font-black mb-1">{stat.value}</p>
              <p className={`text-sm font-medium ${stat.accent ? "text-white/75" : "text-white/60"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Copy */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
            <p>
              Somos una empresa de <strong className="text-foreground font-bold">Pereira</strong> con{" "}
              <strong className="text-foreground font-bold">15 anos en el mercado</strong>, dedicada a
              distribuir una gran variedad de canastillas, estibas plasticas y otros
              productos que facilitan el desarrollo de las diferentes actividades economicas.
            </p>
            <p>
              Nuestro compromiso es ofrecer soluciones de alta calidad para el{" "}
              <strong className="text-foreground font-bold">sector alimenticio e industrial</strong> de
              la region, con productos que cumplen los mas altos estandares de durabilidad.
            </p>
            <p>
              Trabajamos con los mejores materiales: lamina cold rolled, pintura
              electrostatica y polietileno de alta resistencia.
            </p>
          </div>

          <div className="bg-muted/40 rounded-3xl p-8 border border-border space-y-4">
            <h3 className="text-xl font-black text-foreground">Por que elegirnos?</h3>
            <ul className="space-y-3">
              {[
                "15 anos de trayectoria y experiencia",
                "Materiales de primera calidad",
                "Atencion personalizada y cercana",
                "Precios justos y competitivos",
                "Envios a toda la region",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 mt-2"
            >
              Contactanos ahora
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
