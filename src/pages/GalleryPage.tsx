import { useEffect, useState } from 'react'
import Section from '../components/layout/Section'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import { galleryImages } from '../data/gallery'
import { useScrollLock } from '../hooks/useScrollLock'

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useScrollLock(activeIndex !== null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % galleryImages.length
        )
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? galleryImages.length - 1
            : (prev - 1 + galleryImages.length) % galleryImages.length
        )
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length
    )
  }

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === null
        ? galleryImages.length - 1
        : (prev - 1 + galleryImages.length) % galleryImages.length
    )
  }

  return (
    <main id="top">
      <Section className="gallery-hero">
        <div className="section-header">
          <div>
            <h2>Gallery</h2>
            <p>
              Scenes from my studio 11 exhibition titled{' '}
              <span className="italic">Between Then and When</span>. These
              images are taken from my debut solo exhibition at Studio 11, Including snapshots
              from the artisit talk I took part in at opening day.
            </p>
          </div>
        </div>
      </Section>

      <Section className="gallery-section">
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className="gallery-card"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image.thumb}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </Section>

      {activeIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  )
}

