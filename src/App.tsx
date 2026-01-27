import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WorksSection from './sections/WorksSection'
import AboutSection from './sections/AboutSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  return (
    <div className="page">
      <Header />

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">Abstract painter</p>
            <h1>Expressive compositions built through layered surfaces, gesture, and material tension.
            </h1>
            <p className="lede">
            Studio practice driven by dense pigment, scraping, and intuitive mark-making, where fragmented forms and symbols emerge from memory and lived experience.
            Based in Addis Ababa, Ethiopia.
            </p>
          </div>
        </section>

        <WorksSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

