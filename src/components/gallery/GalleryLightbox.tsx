import type { GalleryImage } from '../../data/gallery'

type GalleryLightboxProps = {
  images: GalleryImage[]
  activeIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const image = images[activeIndex]

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image"
      onClick={onClose}
    >
      <div
        className="lightbox-content gallery-lightbox"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose}>
          Close
        </button>
        <div className="gallery-lightbox-body">
          <button
            type="button"
            className="gallery-nav prev"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img src={image.src} alt={image.alt} />
          <button
            type="button"
            className="gallery-nav next"
            onClick={onNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

