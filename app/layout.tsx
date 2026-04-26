import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const BASE_URL = "https://canastillasyremates.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Canastillas y Remates | Distribuidores de Canastillas en Pereira",
    template: "%s | Canastillas y Remates",
  },
  description:
    "Compra canastillas plásticas, estibas, estanterías metálicas y lockers en Pereira. 15 años de experiencia distribuyendo soluciones de almacenamiento industrial y alimenticio en toda la región cafetera.",
  keywords: [
    // Canastillas — variantes de búsqueda prioritarias
    "canastillas",
    "canastillas plasticas",
    "canastillas plasticas Pereira",
    "canastillas industriales",
    "canastillas para frutas",
    "canastillas para verduras",
    "canastillas para alimentos",
    "canastillas de plastico Colombia",
    "venta de canastillas",
    "canastillas al por mayor",
    "canastillas Risaralda",
    "canastillas Eje Cafetero",
    // Otros productos
    "estibas plasticas",
    "estibas plasticas Pereira",
    "estanteria metalica",
    "lockers metalicos",
    "locker metalico Pereira",
    "mobiliario industrial",
    "contenedores plasticos",
    "punto ecologico",
    "punto ecologico Pereira",
    // Negocio
    "Canastillas y Remates",
    "distribuidores industriales Pereira",
    "almacenamiento industrial Colombia",
    "sector alimenticio Pereira",
    "Pereira",
    "Risaralda",
    "Colombia",
  ],
  authors: [{ name: "Canastillas y Remates", url: BASE_URL }],
  creator: "Canastillas y Remates",
  publisher: "Canastillas y Remates",
  category: "Distribución Industrial",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: BASE_URL,
    siteName: "Canastillas y Remates",
    title: "Canastillas y Remates | Venta de Canastillas en Pereira",
    description:
      "Distribuidor de canastillas plásticas, estibas, estanterías y lockers en Pereira. 15 años de experiencia. Atendemos sector alimenticio e industrial en toda la región.",
    images: [
      {
        url: "/logos/logo_canastillas.jpeg",
        width: 1200,
        height: 630,
        alt: "Canastillas y Remates - Distribuidores industriales en Pereira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canastillas y Remates | Venta de Canastillas en Pereira",
    description:
      "Distribuidor de canastillas plásticas, estibas y mobiliario industrial en Pereira. 15 años de experiencia.",
    images: ["/logos/logo_canastillas.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "", // Agrega aquí tu Google Search Console verification token
  },
}

export const viewport: Viewport = {
  themeColor: "#e87a2a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
