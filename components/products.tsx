"use client"

import {
  Box,
  Layers,
  Lock,
  Trash2,
  UtensilsCrossed,
  FileText,
  Archive,
  AlertTriangle,
  Container,
} from "lucide-react"
import { ProductCard } from "./product-card"
import { useInView } from "@/hooks/use-in-view"

const products = [
  {
    title: "Canastillas Plasticas",
    description:
      "Gran variedad de canastillas plasticas para almacenamiento y transporte en el sector alimenticio e industrial.",
    icon: <Box className="w-7 h-7" />,
    specs: ["Multiples tamanos", "Alta durabilidad", "Apilables"],
    image: "/images/canastillas.png",
  },
  {
    title: "Estibas Plasticas",
    description:
      "Estibas plasticas industriales de alta resistencia para optimizar el almacenamiento y logistica.",
    icon: <Layers className="w-7 h-7" />,
    specs: ["Resistentes a humedad", "Facil limpieza", "Larga vida util"],
    image: "/images/estiba.png",
  },
  {
    title: "Lockers Metalicos",
    description:
      "Lockers en lamina cold rolled con soldadura MIG y pintura electrostatica. Color a convenir.",
    icon: <Lock className="w-7 h-7" />,
    specs: ["Lamina cold rolled", "Soldadura MIG", "Pintura electrostatica"],
    image: "/images/locker.png",
  },
  {
    title: "Punto Ecologico",
    description:
      "Punto ecologico con 3 papeleras de 55 lts c/u en colores verde, blanco, rojo o negro.",
    icon: <Trash2 className="w-7 h-7" />,
    specs: ["93cm ancho x 92cm alto x 38.6cm fondo", "3 papeleras de 55 lts", "Multiples colores"],
    image: "/images/punto-ecologico.png",
  },
  {
    title: "Mobiliario Industrial",
    description:
      "Mesas redondas metalicas 60x60x73 alt con pintura electrostatica negra. Sillas en polietileno reciclado.",
    icon: <UtensilsCrossed className="w-7 h-7" />,
    specs: ["Mesa 60x60x73 cm", "Pintura electrostatica", "Material reciclado"],
    image: "/images/mobiliario.png",
  },
  {
    title: "Escritorios",
    description:
      "Superficie en tablex de 25mm enchapado en formica, base metalica y archivador en lamina cold rolled.",
    icon: <FileText className="w-7 h-7" />,
    specs: ["Tablex 25mm", "Enchapado formica", "Base metalica"],
    image: "/images/escritorio.png",
  },
  {
    title: "Estanteria Metalica",
    description:
      "Estanteria semi pesada de ensamble con perforacion aguacate, terminada en pintura electrostatica.",
    icon: <Archive className="w-7 h-7" />,
    specs: ["Semi pesada y liviana", "Perforacion aguacate", "Color a convenir"],
    image: "/images/estanteria.png",
  },
  {
    title: "Senalizacion",
    description:
      "Senal de piso humedo para advertencia clara y visible, ideal para espacios interiores y exteriores.",
    icon: <AlertTriangle className="w-7 h-7" />,
    specs: ["Alta visibilidad", "Interior y exterior", "Prevencion de accidentes"],
    image: "/images/senalizacion.png",
  },
  {
    title: "Contenedores",
    description:
      "Contenedores en polietileno con ruedas y tapa, ideales para manejo de residuos y almacenamiento.",
    icon: <Container className="w-7 h-7" />,
    specs: ["Con ruedas", "Incluye tapa", "Polietileno resistente"],
    image: "/images/contenedores.png",
  },
]

export function Products() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="productos" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <span className="inline-block text-primary font-medium text-xs tracking-widest uppercase mb-4 border border-primary/30 px-4 py-1.5 rounded-full">
            Nuestro Catalogo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Productos que{" "}
            <span className="shimmer-text">impulsan</span>{" "}
            tu operacion
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Amplia gama de productos de alta calidad para el sector alimenticio e industrial,
            con los mejores acabados y materiales del mercado.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <ProductCard
                title={product.title}
                description={product.description}
                icon={product.icon}
                specs={product.specs}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
