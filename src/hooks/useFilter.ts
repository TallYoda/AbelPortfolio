import { useEffect, useMemo, useRef, useState } from 'react'
import type { Artwork } from '../types/artwork'

export type FilterValue = 'all' | 'available' | 'sketches'

export function useFilter(artworks: Artwork[], sketches: Artwork[]) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all')
  const [renderFilter, setRenderFilter] = useState<FilterValue>('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimeout = useRef<number | null>(null)

  const visibleArtworks = useMemo(() => {
    if (renderFilter === 'available') {
      return artworks.filter((artwork) => artwork.available)
    }
    if (renderFilter === 'sketches') {
      return sketches
    }
    return artworks
  }, [artworks, renderFilter, sketches])

  useEffect(() => {
    return () => {
      if (filterTimeout.current !== null) {
        window.clearTimeout(filterTimeout.current)
      }
    }
  }, [])

  const setFilter = (nextFilter: FilterValue) => {
    if (nextFilter === selectedFilter) return
    setSelectedFilter(nextFilter)
    setRenderFilter(nextFilter)
    setIsFiltering(true)
    if (filterTimeout.current !== null) {
      window.clearTimeout(filterTimeout.current)
    }
    filterTimeout.current = window.setTimeout(() => {
      setIsFiltering(false)
    }, 240)
  }

  return {
    selectedFilter,
    setFilter,
    isFiltering,
    visibleArtworks,
  }
}

