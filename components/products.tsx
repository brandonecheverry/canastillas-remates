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
  FileDown,
  ArrowRight,
} from "lucide-react"
import { ProductCard } from "./product-card"

const products = [
  {
    title: "Canastillas Plásticas",
    description:
      "Gran variedad de canastillas plásticas para almacenamiento y transporte en el sector alimenticio e industrial.",
    icon: <Box className="w-4 h-4" />,
    specs: ["Múltiples tamaños", "Alta durabilidad", "Apilables"],
    image: "/images/canastillas.png",
  },
  {
    title: "Estibas Plásticas",
    description:
      "Estibas plásticas industriales de alta resistencia para optimizar el almacenamiento y logística.",
    icon: <Layers className="w-4 h-4" />,
    specs: ["Resistentes a humedad", "Fácil limpieza", "Larga vida útil"],
    image: "/images/estiba.png",
  },
  {
    title: "Lockers Metálicos",
    description:
      "Lockers en lámina cold rolled con soldadura MIG y pintura electrostática. Color a convenir.",
    icon: <Lock className="w-4 h-4" />,
    specs: ["Lámina cold rolled", "Soldadura MIG", "Pintura electrostática"],
    image: "/images/locker.png",
  },
  {
    title: "Punto Ecologico",
    description:
      "Punto ecologico con 3 papeleras de 55 lts c/u en colores verde, blanco, rojo o negro.",
    icon: <Trash2 className="w-4 h-4" />,
    specs: ["93x92x38.6 cm", "3 papeleras de 55 lts", "Múltiples colores"],
    image: "/images/punto-ecologico.png",
  },
  {
    title: "Mobiliario Industrial",
    description:
      "Mesas redondas metálicas 60x60x73 alt con pintura electrostática negra. Sillas en polietileno reciclado.",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    specs: ["Mesa 60x60x73 cm", "Pintura electrostática", "Material reciclado"],
    image: "/images/mobiliario.png",
  },
  {
    title: "Escritorios",
    description:
      "Superficie en tablex de 25mm enchapado en fórmica, base metálica y archivador en lámina cold rolled.",
    icon: <FileText className="w-4 h-4" />,
    specs: ["Tablex 25mm", "Enchapado fórmica", "Base metálica"],
    image: "/images/escritorio.png",
  },
  {
    title: "Estantería Metálica",
    description:
      "Estantería semi pesada de ensamble con perforación aguacate, terminada en pintura electrostática.",
    icon: <Archive className="w-4 h-4" />,
    specs: ["Semi pesada y liviana", "Perforación aguacate", "Color a convenir"],
    image: "/images/estanteria.png",
  },
  {
    title: "Señalizacion",
    description:
      "Señal de piso húmedo para advertencia clara y visible, ideal para espacios interiores y exteriores.",
    icon: <AlertTriangle className="w-4 h-4" />,
    specs: ["Alta visibilidad", "Interior y exterior", "Prevención de accidentes"],
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
    <section id="productos" className="py-20 md:py-28" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(3px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Catálogo
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Todo lo que tu<br />
              <span className="text-primary">operación necesita</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-relaxed md:text-right">
            9 líneas de producto con los mejores materiales y acabados para el sector
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

        {/* Catalog download banner */}
        <div className="mt-12 bg-foreground rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileDown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Catálogo General</h3>
              <p className="text-white/55 text-sm mt-0.5">
                Todos los productos, especificaciones y medidas en un solo documento.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="/documents/catalogo_general.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all hover:scale-105 whitespace-nowrap"
            >
              <FileDown className="w-4 h-4" />
              Ver PDF
            </a>
            <a
              href="/documents/catalogo_general.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-all whitespace-nowrap"
            >
              <ArrowRight className="w-4 h-4 rotate-90" />
              Descargar
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
