import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const features = [
    "15 anos de experiencia",
    "Sector alimenticio e industrial",
    "Envios a toda la region",
  ]

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Distribuidores desde 2009
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
              Soluciones industriales que{" "}
              <span className="text-primary">impulsan</span> tu negocio
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Somos una empresa de Pereira con 15 anos en el mercado, dedicada a
              distribuir canastillas, estibas plasticas y una amplia variedad de
              productos para el sector alimenticio e industrial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#productos"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg text-base font-medium hover:bg-primary/90 transition-colors"
              >
                Ver Catalogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-lg text-base font-medium hover:bg-secondary/90 transition-colors"
              >
                Solicitar Cotizacion
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-card rounded-3xl border border-border overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-6xl font-bold text-primary">15</span>
                </div>
                <p className="font-serif text-2xl font-semibold text-foreground mb-2">
                  Anos de Experiencia
                </p>
                <p className="text-muted-foreground">
                  Sirviendo al sector industrial de la region
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">+500</p>
                  <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
