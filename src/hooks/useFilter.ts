import { useEffect, useMemo, useRef, useState } from 'react'
import type { Artwork } from '../types/artwork'

export type FilterValue = 'all' | 'available'

export function useFilter(artworks: Artwork[]) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all')
  const [renderFilter, setRenderFilter] = useState<FilterValue>('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimeout = useRef<number | null>(null)

  const visibleArtworks = useMemo(() => {
    if (renderFilter === 'available') {
      return artworks.filter((artwork) => artwork.available)
    }
    return artworks
  }, [artworks, renderFilter])

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
    setIsFiltering(true)
    if (filterTimeout.current !== null) {
      window.clearTimeout(filterTimeout.current)
    }
    filterTimeout.current = window.setTimeout(() => {
      setRenderFilter(nextFilter)
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

