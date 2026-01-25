import type { Artwork } from '../../types/artwork'
import ArtworkCard from './ArtworkCard'

type GalleryGridProps = {
  artworks: Artwork[]
  isFiltering: boolean
  onSelect: (artwork: Artwork) => void
}

export default function GalleryGrid({
  artworks,
  isFiltering,
  onSelect,
}: GalleryGridProps) {
  return (
    <div className={`works-grid ${isFiltering ? 'is-filtering' : ''}`}>
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => onSelect(artwork)}
        />
      ))}
    </div>
  )
}

