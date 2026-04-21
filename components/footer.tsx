import Link from "next/link"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"

const quickLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

const products = [
  "Canastillas Plasticas",
  "Estibas Industriales",
  "Lockers Metalicos",
  "Estanteria Metalica",
  "Mobiliario Industrial",
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-primary rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-xl">C</span>
                </div>
              </div>
              <span className="font-serif text-base font-semibold text-foreground">
                Canastillas <span className="text-primary">y Remates</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              15 anos distribuyendo productos de alta calidad para el sector alimenticio e
              industrial en Pereira y toda la region.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+573217024720"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                +57 321 702 4720
              </a>
              <a
                href="mailto:canastillasyremates@hotmail.com"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="break-all">canastillasyremates@hotmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                Pereira, Risaralda, Colombia
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              Navegacion
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              Productos
            </h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <Link
                    href="#productos"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block transition-transform"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horario + WhatsApp */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
              Horario
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground mb-8">
              <p>
                <span className="text-foreground">Lunes - Viernes</span>
                <br />
                8:00 AM - 6:00 PM
              </p>
              <p>
                <span className="text-foreground">Sabado</span>
                <br />
                8:00 AM - 1:00 PM
              </p>
              <p>
                <span className="text-foreground">Domingo</span>
                <br />
                Cerrado
              </p>
            </div>
            <a
              href="https://wa.me/573217024720?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_#22c55e60] hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Canastillas y Remates. Todos los derechos reservados.</p>
            <p>Pereira, Risaralda &mdash; Colombia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
