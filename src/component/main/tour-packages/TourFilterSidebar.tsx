'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const DURATION_OPTIONS = [
  { label: '1 – 3 Days', value: '1-3', min: 1, max: 3 },
  { label: '4 – 7 Days', value: '4-7', min: 4, max: 7 },
  { label: '8+ Days', value: '8+', min: 8, max: undefined },
]

interface Destination {
  id: string
  title: string
  destinationUrl: string
}

export default function TourFilterSidebar({ destinations, horizontal = false }: { destinations: Destination[]; horizontal?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected = searchParams.get('destination') ?? ''
  const selectedDuration = searchParams.get('duration') ?? ''

  const pushUrl = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === null) params.delete(k)
      else params.set(k, v)
    })
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const toggleDestination = (slug: string) => {
    pushUrl({ destination: selected === slug ? null : slug })
  }

  const toggleDuration = (value: string) => {
    pushUrl({ duration: selectedDuration === value ? null : value })
  }

  const handleClearFilters = () => {
    router.push(pathname, { scroll: false })
  }

  const hasActiveFilters = !!selected || !!selectedDuration || searchParams.has('search')

  if (horizontal) {
    return (
      <div className="tour-filter-bar mb-4">
        {/* Destination */}
        <div className="tfb-group">
          <span className="tfb-label">Destination</span>
          <div className="tfb-options">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => toggleDestination(dest.destinationUrl)}
                className={`tfb-chip${selected === dest.destinationUrl ? ' active' : ''}`}
              >
                {dest.title}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="tfb-group">
          <span className="tfb-label">Duration</span>
          <div className="tfb-options">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleDuration(opt.value)}
                className={`tfb-chip${selectedDuration === opt.value ? ' active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <div className="tfb-group tfb-group--clear">
            <button onClick={handleClearFilters} className="tfb-clear">
              <i className="fa-solid fa-xmark me-1"></i> Clear
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="main-sidebar mt-0">

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="single-sidebar-widget">
          <button
            onClick={handleClearFilters}
            className="theme-btn w-100"
            style={{ fontSize: '0.9rem' }}
          >
            <i className="fa-solid fa-xmark me-2"></i>
            Clear Filters
          </button>
        </div>
      )}

      {/* Destination Filter */}
      <div className="single-sidebar-widget">
        <div className="wid-title">
          <h3>Destination Category</h3>
        </div>
        <div className="categories-list">
          {destinations.map((dest) => (
            <label
              key={dest.id}
              className="checkbox-single d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleDestination(dest.destinationUrl)}
            >
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input
                    type="checkbox"
                    checked={selected === dest.destinationUrl}
                    onChange={() => {}}
                  />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{dest.title}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="single-sidebar-widget">
        <div className="wid-title style-2">
          <h3>Duration</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="categories-list">
          {DURATION_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="checkbox-single d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleDuration(opt.value)}
            >
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input
                    type="checkbox"
                    checked={selectedDuration === opt.value}
                    onChange={() => {}}
                  />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{opt.label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tour Types */}
      <div className="single-sidebar-widget">
        <div className="wid-title style-2">
          <h3>Tour Types</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="categories-list">
          {['Premium', 'Luxury', 'Standard'].map((type) => (
            <label key={type} className="checkbox-single d-flex justify-content-between align-items-center">
              <span className="d-flex gap-xl-3 gap-2 align-items-center">
                <span className="checkbox-area d-center">
                  <input type="checkbox" onChange={() => {}} />
                  <span className="checkmark d-center"></span>
                </span>
                <span className="text-color">{type}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  )
}
