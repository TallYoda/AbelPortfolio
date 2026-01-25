import Section from '../components/layout/Section'
import ContactForm from '../components/contact/ContactForm'

export default function ContactSection() {
  return (
    <Section id="contact" className="contact">
      <div className="section-header">
        <h2>Contact</h2>
        <p>
          For inquiries, commissions, or availability, send a note using the
          form below.
        </p>
      </div>
      <ContactForm />
    </Section>
  )
}

