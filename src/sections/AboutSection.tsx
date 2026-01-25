import Section from '../components/layout/Section'
import Biography from '../components/about/Biography'
import ArtistStatement from '../components/about/ArtistStatement'
import CV from '../components/about/CV'

export default function AboutSection() {
  return (
    <Section id="about" className="about">
      <div className="section-header">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <Biography />
        <ArtistStatement />
        <CV />
      </div>
    </Section>
  )
}

