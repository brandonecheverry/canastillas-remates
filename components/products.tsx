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
  },
  {
    title: "Senalizacion",
    description:
      "Senal de piso humedo para advertencia clara y visible, ideal para espacios interiores y exteriores.",
    icon: <AlertTriangle className="w-7 h-7" />,
    specs: ["Alta visibilidad", "Interior y exterior", "Prevencion de accidentes"],
  },
  {
    title: "Contenedores",
    description:
      "Contenedores en polietileno con ruedas y tapa, ideales para manejo de residuos y almacenamiento.",
    icon: <Container className="w-7 h-7" />,
    specs: ["Con ruedas", "Incluye tapa", "Polietileno resistente"],
  },
]

export function Products() {
  return (
    <section id="productos" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-medium text-sm mb-4">
            NUESTRO CATALOGO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Productos que impulsan tu operacion
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ofrecemos una amplia gama de productos de alta calidad para el sector
            alimenticio e industrial, todos con los mejores acabados y materiales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              icon={product.icon}
              specs={product.specs}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
