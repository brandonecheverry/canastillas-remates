import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicacion",
    content: "Pereira, Risaralda, Colombia",
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
  },
]

export function Contact() {
  const whatsappNumber = "573217024720"
  const whatsappMessage = encodeURIComponent(
    "Hola, estoy interesado en sus productos. Me gustaria recibir mas informacion."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

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

          <div className="flex flex-col items-center justify-center bg-secondary-foreground/5 rounded-2xl p-8 md:p-12 border border-secondary-foreground/10">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-4 text-center">
              Escribenos por WhatsApp
            </h3>
            <p className="text-secondary-foreground/70 text-center mb-8 max-w-md">
              La forma mas rapida de obtener informacion sobre nuestros productos. 
              Te responderemos a la brevedad posible.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              Iniciar conversacion
            </a>
            <p className="text-secondary-foreground/50 text-sm mt-4">
              +57 321 702 4720
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
