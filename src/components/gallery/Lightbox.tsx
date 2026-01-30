import type { Artwork } from '../../types/artwork'

type LightboxProps = {
  artwork: Artwork
  onClose: () => void
}

export default function Lightbox({ artwork, onClose }: LightboxProps) {
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title} details`}
      onClick={onClose}
    >
      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose}>
          Close
        </button>
        <img src={artwork.full} alt={`${artwork.title} full view`} />
        <div className="lightbox-meta">
          <h3>{artwork.title}</h3>
          <p>
            {artwork.medium} · {artwork.dimensions}
          </p>
          <p>{artwork.available ? 'Available' : 'Sold'}</p>
        </div>
      </div>
    </div>
  )
}

