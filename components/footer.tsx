import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

const products = [
  "Canastillas Plásticas",
  "Estibas Industriales",
  "Lockers Metálicos",
  "Estantería Metálica",
  "Mobiliario Industrial",
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-white">
      {/* Orange accent strip */}
      <div className="h-1 bg-primary w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <div className="bg-white rounded-xl px-3 py-1">
                <Image
                  src="/logos/logo_canastillas.jpeg"
                  alt="Canastillas y Remates"
                  width={120}
                  height={92}
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              15 años distribuyendo productos de alta calidad para el sector
              alimenticio e industrial en Pereira y toda la región.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+573217024720"
                className="flex items-center gap-3 text-white/55 hover:text-primary transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-primary" />
                +57 321 702 4720
              </a>
              <a
                href="mailto:canastillasyremates@hotmail.com"
                className="flex items-start gap-3 text-white/55 hover:text-primary transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="break-all">canastillasyremates@hotmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/55 text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Pereira, Risaralda, Colombia
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-5 uppercase text-xs tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-5 uppercase text-xs tracking-widest">
              Productos
            </h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <Link
                    href="#productos"
                    className="text-white/55 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-5 uppercase text-xs tracking-widest">
              Horario
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-white">Lunes — Viernes</p>
                <p className="text-white/55">8:00 AM — 6:00 PM</p>
              </div>
              <div>
                <p className="font-bold text-white">Sábado</p>
                <p className="text-white/55">8:00 AM — 1:00 PM</p>
              </div>
              <div>
                <p className="font-bold text-white">Domingo</p>
                <p className="text-white/55">Cerrado</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35 font-medium">
            <p>&copy; {currentYear} Canastillas y Remates. Todos los derechos reservados.</p>
            <p>Pereira, Risaralda · Colombia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
