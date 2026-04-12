import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

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
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">C</span>
              </div>
              <span className="font-serif text-lg font-semibold">Canastillas y Remates</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              15 anos distribuyendo productos de alta calidad para el sector alimenticio e
              industrial en Pereira y toda la region.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+573217024720"
                className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +57 321 702 4720
              </a>
              <a
                href="mailto:canastillasyremates@hotmail.com"
                className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                canastillasyremates@hotmail.com
              </a>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                Pereira, Risaralda, Colombia
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Enlaces Rapidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Productos</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <Link
                    href="#productos"
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Horario de Atencion</h4>
            <div className="space-y-3 text-sm text-background/70">
              <p>
                <span className="text-background">Lunes - Viernes</span>
                <br />
                8:00 AM - 6:00 PM
              </p>
              <p>
                <span className="text-background">Sabado</span>
                <br />
                8:00 AM - 1:00 PM
              </p>
              <p>
                <span className="text-background">Domingo</span>
                <br />
                Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>&copy; {currentYear} Canastillas y Remates. Todos los derechos reservados.</p>
            <p>Pereira, Risaralda - Colombia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
