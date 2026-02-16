import WorksSection from '../sections/WorksSection'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Abstract painter</p>
          <h1>
          Studio practice centered on intuitive mark-making in acrylic and ink on canvas, 
          where fragmented forms and symbols 
          surface from memory and lived experience. 
          Based in Addis Ababa, Ethiopia.
            
          </h1>
          <p className="lede">
           Good to witness 
           On the canvas <br/>
           lines flowing freely with curiosity <br/>
           creating forms shaped by
           the paths <br/>
           they've travelled 
           and each form holding <br/>
           colors 
           that either reveal <br/>
           or conceal its identity 
          </p>
        </div>
      </section>

      <WorksSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}

