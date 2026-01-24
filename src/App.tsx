import type { CSSProperties, FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

type Artwork = {
  id: string
  title: string
  medium: string
  dimensions: string
  year: string
  available: boolean
  thumbnail: string
  full: string
  colSpan: number
  rowSpan: number
}

type FilterValue = 'all' | 'available'

const artworks: Artwork[] = [
  {
    id: 'a1',
    title: 'Untitled I',
    medium: 'Oil on canvas',
    dimensions: '40 × 50 in',
    year: '2022',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_0113.JPG',
    full: '/artworks/IMG_0113.JPG',
    colSpan: 5,
    rowSpan: 2,
  },
  {
    id: 'a2',
    title: 'Untitled II',
    medium: 'Acrylic on canvas',
    dimensions: '24 × 30 in',
    year: '2021',
    available: false,
    thumbnail: '/artworks/thumbs/IMG_0128.JPG',
    full: '/artworks/IMG_0128.JPG',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'a3',
    title: 'Untitled III',
    medium: 'Oil and graphite',
    dimensions: '36 × 48 in',
    year: '2023',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_0135.JPG',
    full: '/artworks/IMG_0135.JPG',
    colSpan: 3,
    rowSpan: 2,
  },
  {
    id: 'a4',
    title: 'Untitled IV',
    medium: 'Acrylic on linen',
    dimensions: '30 × 40 in',
    year: '2024',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_0150.JPG',
    full: '/artworks/IMG_0150.JPG',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'a5',
    title: 'Untitled V',
    medium: 'Oil on linen',
    dimensions: '48 × 60 in',
    year: '2024',
    available: false,
    thumbnail: '/artworks/thumbs/IMG_0151.JPG',
    full: '/artworks/IMG_0151.JPG',
    colSpan: 6,
    rowSpan: 2,
  },
  {
    id: 'a6',
    title: 'Untitled VI',
    medium: 'Oil on panel',
    dimensions: '20 × 20 in',
    year: '2020',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_0157-1.JPG',
    full: '/artworks/IMG_0157-1.JPG',
    colSpan: 3,
    rowSpan: 1,
  },
  {
    id: 'a7',
    title: 'Untitled VII',
    medium: 'Acrylic and pastel',
    dimensions: '36 × 44 in',
    year: '2021',
    available: false,
    thumbnail: '/artworks/thumbs/IMG_20231202_171941_493.jpg',
    full: '/artworks/IMG_20231202_171941_493.jpg',
    colSpan: 5,
    rowSpan: 1,
  },
  {
    id: 'a8',
    title: 'Untitled VIII',
    medium: 'Oil on canvas',
    dimensions: '50 × 60 in',
    year: '2023',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_20241101_211241_442.JPG',
    full: '/artworks/IMG_20241101_211241_442.JPG',
    colSpan: 4,
    rowSpan: 2,
  },
  {
    id: 'a9',
    title: 'Untitled IX',
    medium: 'Oil and pigment',
    dimensions: '28 × 36 in',
    year: '2022',
    available: false,
    thumbnail: '/artworks/thumbs/IMG_20241101_211301_690.JPG',
    full: '/artworks/IMG_20241101_211301_690.JPG',
    colSpan: 3,
    rowSpan: 1,
  },
  {
    id: 'a10',
    title: 'Untitled X',
    medium: 'Acrylic on canvas',
    dimensions: '42 × 54 in',
    year: '2025',
    available: true,
    thumbnail: '/artworks/thumbs/IMG_20241101_211422_369.JPG',
    full: '/artworks/IMG_20241101_211422_369.JPG',
    colSpan: 5,
    rowSpan: 1,
  },
  {
    id: 'a11',
    title: 'Untitled XI',
    medium: 'Oil on canvas',
    dimensions: '32 × 40 in',
    year: '2021',
    available: true,
    thumbnail: '/artworks/thumbs/-5794095454684825216_121.jpg',
    full: '/artworks/-5794095454684825216_121.jpg',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'a12',
    title: 'Untitled XII',
    medium: 'Acrylic on canvas',
    dimensions: '24 × 36 in',
    year: '2020',
    available: false,
    thumbnail: '/artworks/thumbs/-5794095454684825220_121.jpg',
    full: '/artworks/-5794095454684825220_121.jpg',
    colSpan: 3,
    rowSpan: 2,
  },
]

const exhibitions = [
  {
    year: '2025',
    text: 'Solo Exhibition, Stillness in Motion — Northline Gallery, Seattle',
  },
  {
    year: '2024',
    text: 'Group Show, Spatial Echoes — Margo Studio, Portland',
  },
  {
    year: '2023',
    text: 'Selected Works, Spring Salon — Crane Art Center, Chicago',
  },
]

const education = [
  { year: '2018', text: 'MFA, Painting — Rhode Island School of Design' },
  { year: '2014', text: 'BFA, Studio Art — School of the Art Institute' },
]

const selectedWorks = [
  'In collections of the Hayes Family Trust, New York',
  'Commissioned triptych for Lumen Hospitality, Austin',
  'Private collection, Berlin',
]

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all')
  const [renderFilter, setRenderFilter] = useState<FilterValue>('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  )
  const [feedback, setFeedback] = useState('')
  const formRef = useRef<HTMLFormElement | null>(null)
  const filterTimeout = useRef<number | null>(null)

  const visibleArtworks = useMemo(() => {
    if (renderFilter === 'available') {
      return artworks.filter((artwork) => artwork.available)
    }
    return artworks
  }, [renderFilter])

  useEffect(() => {
    if (!activeArtwork) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeArtwork])

  useEffect(() => {
    if (!activeArtwork) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArtwork(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeArtwork])

  useEffect(() => {
    return () => {
      if (filterTimeout.current !== null) {
        window.clearTimeout(filterTimeout.current)
      }
    }
  }, [])

  const handleFilterChange = (nextFilter: FilterValue) => {
    if (nextFilter === selectedFilter) return
    setSelectedFilter(nextFilter)
    setIsFiltering(true)
    if (filterTimeout.current !== null) {
      window.clearTimeout(filterTimeout.current)
    }
    filterTimeout.current = window.setTimeout(() => {
      setRenderFilter(nextFilter)
      setIsFiltering(false)
    }, 240)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formRef.current) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setFeedback(
        'Email service is not configured yet. Add EmailJS keys to continue.'
      )
      return
    }

    setStatus('sending')
    setFeedback('')
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      })
      setStatus('success')
      setFeedback('Message sent. Thank you for reaching out.')
      formRef.current.reset()
    } catch (error) {
      setStatus('error')
      setFeedback('Unable to send right now. Please try again soon.')
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top">
            Elena Voss
          </a>
          <nav className="nav">
            <a href="#works">Works</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="icon-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

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

        <section id="works" className="section works">
          <div className="section-header">
            <div>
              <h2>Selected Works</h2>
              <p>Loosely arranged studies, available pieces noted.</p>
            </div>
            <div className="filters">
              <button
                type="button"
                className={selectedFilter === 'all' ? 'is-active' : ''}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button
                type="button"
                className={selectedFilter === 'available' ? 'is-active' : ''}
                onClick={() => handleFilterChange('available')}
              >
                Available for Sale
              </button>
            </div>
          </div>

          <div className={`works-grid ${isFiltering ? 'is-filtering' : ''}`}>
            {visibleArtworks.map((artwork) => (
              <button
                key={artwork.id}
                type="button"
                className="work-card"
                style={
                  {
                    '--col-span': artwork.colSpan,
                    '--row-span': artwork.rowSpan,
                  } as CSSProperties
                }
                onClick={() => setActiveArtwork(artwork)}
              >
                <span className="work-media">
                  <img
                    src={artwork.thumbnail}
                    alt={`${artwork.title} — ${artwork.medium}`}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="work-overlay">
                  <span className="work-title">{artwork.title}</span>
                  <span className="work-meta">
                    {artwork.medium} · {artwork.dimensions}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-header">
            <h2>About</h2>
          </div>
          <div className="about-grid">
            <div className="about-block">
              <h3>Biography</h3>
              <p>
                Elena Voss is an abstract painter exploring atmosphere through
                layered color fields and restrained geometry. Her work is shaped
                by long walks along coastal edges, studio improvisations, and a
                devotion to slow visual rhythms.
              </p>
            </div>
            <div className="about-block">
              <h3>Artist statement</h3>
              <p>
                Each painting begins with a quiet structure and gradually opens
                into luminous space. I am interested in how color behaves when
                it is allowed to breathe, how surface records time, and how
                memory translates into tonal shifts.
              </p>
            </div>
            <div className="about-block">
              <h3>CV</h3>
              <div className="cv-group">
                <p className="cv-title">Exhibitions</p>
                <ul>
                  {exhibitions.map((item) => (
                    <li key={item.text}>
                      <span>{item.year}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cv-group">
                <p className="cv-title">Education</p>
                <ul>
                  {education.map((item) => (
                    <li key={item.text}>
                      <span>{item.year}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cv-group">
                <p className="cv-title">Selected works</p>
                <ul>
                  {selectedWorks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-header">
            <h2>Contact</h2>
            <p>
              For inquiries, commissions, or availability, send a note using the
              form below.
            </p>
          </div>
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input type="text" name="user_name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="user_email" required />
            </label>
            <label className="full">
              <span>Message</span>
              <textarea name="message" rows={6} required />
            </label>
            <div className="form-actions">
              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
              {feedback && (
                <p className={`form-feedback ${status}`}>{feedback}</p>
              )}
            </div>
          </form>
        </section>
      </main>

      {activeArtwork && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeArtwork.title} details`}
          onClick={() => setActiveArtwork(null)}
        >
          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveArtwork(null)}
            >
              Close
            </button>
            <img
              src={activeArtwork.full}
              alt={`${activeArtwork.title} full view`}
            />
            <div className="lightbox-meta">
              <h3>{activeArtwork.title}</h3>
              <p>
                {activeArtwork.medium} · {activeArtwork.dimensions} ·{' '}
                {activeArtwork.year}
              </p>
              <p>{activeArtwork.available ? 'Available' : 'Sold'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

