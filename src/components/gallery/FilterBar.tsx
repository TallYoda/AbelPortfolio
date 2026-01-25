import type { FilterValue } from '../../hooks/useFilter'

type FilterBarProps = {
  selected: FilterValue
  onChange: (value: FilterValue) => void
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      <button
        type="button"
        className={selected === 'all' ? 'is-active' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        type="button"
        className={selected === 'available' ? 'is-active' : ''}
        onClick={() => onChange('available')}
      >
        Available for Sale
      </button>
    </div>
  )
}

