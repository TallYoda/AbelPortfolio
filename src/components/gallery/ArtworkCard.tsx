import type { CSSProperties } from 'react'
import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'
import ArtworkOverlay from './ArtworkOverlay'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <button
      type="button"
      className="work-card"
      style={
        {
          '--col-span': artwork.colSpan,
          '--row-span': artwork.rowSpan,
        } as CSSProperties
      }
      onClick={onClick}
    >
      <span className="work-media">
        <img
          src={artwork.thumbnail}
          alt={getArtworkAlt(artwork)}
          loading="lazy"
          decoding="async"
        />
      </span>
      <ArtworkOverlay
        title={artwork.title}
        medium={artwork.medium}
        dimensions={artwork.dimensions}
      />
    </button>
  )
}

