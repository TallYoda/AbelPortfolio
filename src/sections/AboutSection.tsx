import Section from '../components/layout/Section'
import Biography from '../components/about/Biography'
import ArtistStatement from '../components/about/ArtistStatement'

export default function AboutSection() {
  return (
    <Section id="about" className="about">
      <div className="section-header">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <div className="about-left">
          <figure className="about-portrait">
            <img src="/artworks/Portrait.jpeg" alt="Artist portrait" />
          </figure>
          <Biography />
        </div>
        <div className="about-statement">
          <ArtistStatement />
        </div>
      </div>
    </Section>
  )
}

