"use client"

import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicacion",
    content: "Pereira, Risaralda, Colombia",
    href: undefined,
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "+57 321 702 4720",
    href: "tel:+573217024720",
  },
  {
    icon: Mail,
    title: "Email",
    content: "canastillasyremates@hotmail.com",
    href: "mailto:canastillasyremates@hotmail.com",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 AM - 6:00 PM",
    href: undefined,
  },
]

const reasons = [
  "15 anos de experiencia en el mercado",
  "Productos de alta calidad y durabilidad",
  "Atencion personalizada",
  "Precios competitivos",
]

export function Contact() {
  const { ref, inView } = useInView(0.1)

  const whatsappNumber = "573217024720"
  const whatsappMessage = encodeURIComponent(
    "Hola, estoy interesado en sus productos. Me gustaria recibir mas informacion."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section id="contacto" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/60" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="inline-block text-primary font-medium text-xs tracking-widest uppercase mb-4 border border-primary/30 px-4 py-1.5 rounded-full">
            Contactanos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Hablemos de{" "}
            <span className="shimmer-text">tu proyecto</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Estamos listos para ayudarte a encontrar las mejores soluciones para tu negocio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: info cards */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <div
                  key={info.title}
                  className="glass rounded-2xl p-5 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(28_90%_55%/0.1)] group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground text-sm mb-1">{info.title}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Reasons box */}
            <div className="glass rounded-2xl p-6 border border-border">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Por que elegirnos?
              </h3>
              <ul className="space-y-3">
                {reasons.map((reason, i) => (
                  <li
                    key={reason}
                    className="flex items-center gap-3 text-muted-foreground text-sm"
                    style={{
                      transitionDelay: `${i * 100 + 300}ms`,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateX(0)" : "translateX(-10px)",
                      transition: `opacity 0.5s ease ${i * 100 + 300}ms, transform 0.5s ease ${i * 100 + 300}ms`,
                    }}
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: WhatsApp CTA */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-border flex flex-col items-center justify-center text-center h-full min-h-[400px] relative overflow-hidden">
              {/* Background glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 pointer-events-none" />

              {/* WhatsApp icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse" />
                <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse-glow">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                Escribenos por WhatsApp
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                La forma mas rapida de obtener informacion sobre nuestros productos.
                Te respondemos a la brevedad posible.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_#22c55e60] hover:scale-105 group"
              >
                <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Iniciar conversacion
              </a>

              <p className="text-muted-foreground text-sm mt-5">+57 321 702 4720</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
