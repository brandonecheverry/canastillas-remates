import { Award, Users, Truck, Shield } from "lucide-react"

const stats = [
  { value: "15+", label: "Anos de experiencia", icon: Award },
  { value: "500+", label: "Clientes satisfechos", icon: Users },
  { value: "1000+", label: "Productos entregados", icon: Truck },
  { value: "100%", label: "Garantia de calidad", icon: Shield },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block text-primary font-medium text-sm mb-4">
                SOBRE NOSOTROS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Aliando innovacion, durabilidad y eficacia
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Somos una empresa de <strong className="text-foreground">Pereira</strong> con{" "}
                <strong className="text-foreground">15 anos en el mercado</strong>, dedicada a
                distribuir una gran variedad de canastillas, estibas plasticas y otros
                productos que facilitan el desarrollo de las diferentes actividades economicas.
              </p>
              <p>
                Nuestro compromiso es ofrecer soluciones de alta calidad para el{" "}
                <strong className="text-foreground">sector alimenticio e industrial</strong> de
                la region, con productos que cumplen los mas altos estandares de calidad y
                durabilidad.
              </p>
              <p>
                Trabajamos con los mejores materiales como lamina cold rolled, pintura
                electrostatica y polietileno de alta resistencia, garantizando productos
                duraderos y funcionales para su negocio.
              </p>
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-base font-medium hover:bg-secondary/90 transition-colors"
            >
              Conoce mas sobre nosotros
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-serif text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
