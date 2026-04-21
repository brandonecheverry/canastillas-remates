import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ScrollScene } from "@/components/scroll-scene"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ScrollScene />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
