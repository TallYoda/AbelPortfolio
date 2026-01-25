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
            <h1>Atmospheric compositions shaped by light, memory, and rhythm.</h1>
            <p className="lede">
              Studio practice rooted in layered pigment, slow gestures, and
              luminous color fields. Based in Seattle, working internationally.
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

