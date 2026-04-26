import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CrateBackground } from "@/components/crate-background"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://canastillasyremates.com/#business",
      name: "Canastillas y Remates",
      description:
        "Distribuidores de canastillas plásticas, estibas, estanterías metálicas, lockers y mobiliario industrial en Pereira con más de 15 años de experiencia.",
      url: "https://canastillasyremates.com",
      telephone: "+573217024720",
      email: "canastillasyremates@hotmail.com",
      foundingDate: "2009",
      image: "https://canastillasyremates.com/logos/logo_canastillas.jpeg",
      logo: "https://canastillasyremates.com/logos/logo_canastillas.jpeg",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pereira",
        addressRegion: "Risaralda",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 4.8133,
        longitude: -75.6961,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "08:00",
          closes: "13:00",
        },
      ],
      sameAs: [],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Productos Industriales",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Canastillas Plásticas" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Estibas Plásticas" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Estantería Metálica" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Lockers Metálicos" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Punto Ecológico" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mobiliario Industrial" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://canastillasyremates.com/#website",
      url: "https://canastillasyremates.com",
      name: "Canastillas y Remates",
      inLanguage: "es-CO",
      publisher: { "@id": "https://canastillasyremates.com/#business" },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CrateBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <main>
          <Hero />
          <Products />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
