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

export const metadata: Metadata = {
  title: "Canastillas y Remates | Distribuidores Industriales en Pereira",
  description:
    "Con 15 años de experiencia, somos líderes en la distribución de canastillas, estibas plásticas, estanterías metálicas, lockers y mobiliario industrial para el sector alimenticio e industrial en Pereira y la región.",
  keywords: [
    "canastillas plasticas",
    "estibas plasticas",
    "estanteria metalica",
    "lockers metalicos",
    "mobiliario industrial",
    "Pereira",
    "Colombia",
    "sector alimenticio",
    "sector industrial",
    "punto ecologico",
    "contenedores plasticos",
  ],
  authors: [{ name: "Canastillas y Remates" }],
  creator: "Canastillas y Remates",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://canastillasyremates.com",
    siteName: "Canastillas y Remates",
    title: "Canastillas y Remates | Distribuidores Industriales en Pereira",
    description:
      "15 años distribuyendo canastillas, estibas y mobiliario industrial en Pereira. Soluciones para el sector alimenticio e industrial.",
    images: [{ url: "/logos/logo_canastillas.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canastillas y Remates | Distribuidores Industriales",
    description:
      "15 años distribuyendo canastillas, estibas y mobiliario industrial en Pereira.",
  },
  robots: {
    index: true,
    follow: true,
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
