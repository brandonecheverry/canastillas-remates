import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

const contactInfo = [
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
    icon: MapPin,
    title: "Ubicacion",
    content: "Pereira, Risaralda, Colombia",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 AM - 6:00 PM · Sab: 8:00 AM - 1:00 PM",
  },
]

export function Contact() {
  const whatsappNumber = "573217024720"
  const whatsappMessage = encodeURIComponent(
    "Hola, estoy interesado en sus productos. Me gustaria recibir mas informacion."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section id="contacto" className="py-20 md:py-28 bg-foreground text-white relative overflow-hidden">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-32 -translate-y-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-24 translate-y-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            Hablemos de tu{" "}
            <span className="text-primary">negocio</span>
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            Respondemos rapido. Escribenos por WhatsApp o por cualquiera de nuestros canales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-3">
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                  {info.title}
                </p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-sm font-semibold text-white hover:text-primary transition-colors break-all"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-white">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* WhatsApp CTA — main action */}
          <div className="bg-[#25D366] rounded-3xl p-8 md:p-10 text-center flex flex-col items-center shadow-2xl shadow-[#25D366]/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              La forma mas rapida
            </h3>
            <p className="text-white/80 mb-8 text-sm leading-relaxed max-w-xs">
              Escribenos por WhatsApp y te cotizamos en minutos. Sin formularios, sin esperas.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#25D366] px-8 py-4 rounded-xl text-base font-black hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
            <p className="text-white/60 text-xs mt-4 font-medium">+57 321 702 4720</p>
          </div>

        </div>
      </div>
    </section>
  )
}
