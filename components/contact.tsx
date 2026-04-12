"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicacion",
    content: "Pereira, Risaralda, Colombia",
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "+57 300 123 4567",
    href: "tel:+573001234567",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@canastillasyremates.com",
    href: "mailto:info@canastillasyremates.com",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 AM - 6:00 PM",
  },
]

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Gracias por contactarnos. Nos comunicaremos contigo pronto.")
    setFormState({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="contacto" className="py-20 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-sm mb-4">
            CONTACTANOS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Hablemos de tu proyecto
          </h2>
          <p className="text-secondary-foreground/70 text-lg leading-relaxed">
            Estamos listos para ayudarte a encontrar las mejores soluciones para tu negocio.
            Contactanos hoy mismo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-foreground mb-1">{info.title}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-secondary-foreground/70 hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-secondary-foreground/70">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary-foreground/5 rounded-2xl p-6 border border-secondary-foreground/10">
              <h3 className="font-serif text-xl font-semibold mb-4">
                Por que elegirnos?
              </h3>
              <ul className="space-y-3 text-secondary-foreground/80">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  15 anos de experiencia en el mercado
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Productos de alta calidad y durabilidad
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Atencion personalizada
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Precios competitivos
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+57 300 000 0000"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-xl text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Cuentanos sobre tu proyecto o necesidades..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl text-base font-medium hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5" />
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
