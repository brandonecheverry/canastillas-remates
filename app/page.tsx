import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CrateBackground } from "@/components/crate-background"

export default function HomePage() {
  return (
    <>
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
