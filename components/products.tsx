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
    icon: <Box className="w-4 h-4" />,
    specs: ["Multiples tamanos", "Alta durabilidad", "Apilables"],
    image: "/images/canastillas.png",
  },
  {
    title: "Estibas Plasticas",
    description:
      "Estibas plasticas industriales de alta resistencia para optimizar el almacenamiento y logistica.",
    icon: <Layers className="w-4 h-4" />,
    specs: ["Resistentes a humedad", "Facil limpieza", "Larga vida util"],
    image: "/images/estiba.png",
  },
  {
    title: "Lockers Metalicos",
    description:
      "Lockers en lamina cold rolled con soldadura MIG y pintura electrostatica. Color a convenir.",
    icon: <Lock className="w-4 h-4" />,
    specs: ["Lamina cold rolled", "Soldadura MIG", "Pintura electrostatica"],
    image: "/images/locker.png",
  },
  {
    title: "Punto Ecologico",
    description:
      "Punto ecologico con 3 papeleras de 55 lts c/u en colores verde, blanco, rojo o negro.",
    icon: <Trash2 className="w-4 h-4" />,
    specs: ["93x92x38.6 cm", "3 papeleras de 55 lts", "Multiples colores"],
    image: "/images/punto-ecologico.png",
  },
  {
    title: "Mobiliario Industrial",
    description:
      "Mesas redondas metalicas 60x60x73 alt con pintura electrostatica negra. Sillas en polietileno reciclado.",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    specs: ["Mesa 60x60x73 cm", "Pintura electrostatica", "Material reciclado"],
    image: "/images/mobiliario.png",
  },
  {
    title: "Escritorios",
    description:
      "Superficie en tablex de 25mm enchapado en formica, base metalica y archivador en lamina cold rolled.",
    icon: <FileText className="w-4 h-4" />,
    specs: ["Tablex 25mm", "Enchapado formica", "Base metalica"],
    image: "/images/escritorio.png",
  },
  {
    title: "Estanteria Metalica",
    description:
      "Estanteria semi pesada de ensamble con perforacion aguacate, terminada en pintura electrostatica.",
    icon: <Archive className="w-4 h-4" />,
    specs: ["Semi pesada y liviana", "Perforacion aguacate", "Color a convenir"],
    image: "/images/estanteria.png",
  },
  {
    title: "Senalizacion",
    description:
      "Senal de piso humedo para advertencia clara y visible, ideal para espacios interiores y exteriores.",
    icon: <AlertTriangle className="w-4 h-4" />,
    specs: ["Alta visibilidad", "Interior y exterior", "Prevencion de accidentes"],
    image: "/images/senalizacion.png",
  },
  {
    title: "Contenedores",
    description:
      "Contenedores en polietileno con ruedas y tapa, ideales para manejo de residuos y almacenamiento.",
    icon: <Container className="w-4 h-4" />,
    specs: ["Con ruedas", "Incluye tapa", "Polietileno resistente"],
    image: "/images/contenedores.png",
  },
]

export function Products() {
  return (
    <section id="productos" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Catalogo
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Todo lo que tu<br />
              <span className="text-primary">operacion necesita</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed md:text-right">
            9 lineas de producto con los mejores materiales y acabados para el sector
            alimenticio e industrial.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
