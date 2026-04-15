"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#productos", label: "Productos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}>
      {/* Orange accent strip */}
      <div className="h-1 bg-primary w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/logo_canastillas.jpeg"
              alt="Canastillas y Remates"
              width={120}
              height={92}
              className="h-12 w-auto object-contain mix-blend-multiply"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-foreground/70 hover:text-primary transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573217024720?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1ebe5d] transition-all hover:scale-105 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors text-base font-semibold px-3 py-2 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/573217024720?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg text-sm font-bold justify-center mt-3"
              >
                <Phone className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
