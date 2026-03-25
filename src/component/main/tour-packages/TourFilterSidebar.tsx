'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useRef } from 'react'

const MIN_PRICE = 0
const MAX_PRICE = 100_000_000
const STEP = 500_000

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

export default function TourFilterSidebar({ destinations }: { destinations: Destination[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected = searchParams.get('destination') ?? ''
  const selectedDuration = searchParams.get('duration') ?? ''

  const [minVal, setMinVal] = useState(
    Number(searchParams.get('minPrice') ?? MIN_PRICE)
  )
  const [maxVal, setMaxVal] = useState(
    Number(searchParams.get('maxPrice') ?? MAX_PRICE)
  )
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const schedulePrice = (min: number, max: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      pushUrl({
        minPrice: min === MIN_PRICE ? null : String(min),
        maxPrice: max === MAX_PRICE ? null : String(max),
      })
    }, 400)
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - STEP)
    setMinVal(val)
    schedulePrice(val, maxVal)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + STEP)
    setMaxVal(val)
    schedulePrice(minVal, val)
  }

  const handleClearFilters = () => {
    setMinVal(MIN_PRICE)
    setMaxVal(MAX_PRICE)
    router.push(pathname, { scroll: false })
  }

  const hasActiveFilters =
    !!selected ||
    !!selectedDuration ||
    searchParams.has('minPrice') ||
    searchParams.has('maxPrice') ||
    searchParams.has('search')

  const fmt = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  const minPercent = ((minVal - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  const maxPercent = ((maxVal - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

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

      {/* Price Range Filter */}
      <div className="single-sidebar-widget">
        <div className="wid-title style-2">
          <h3>Price Range</h3>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div className="price-range-wrapper">
          <div
            className="slider-container"
            style={{ position: 'relative', height: '40px' }}
          >
            {/* Track fill */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
                height: '4px',
                background: 'var(--theme-color, #f26522)',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <input
              type="range"
              className="slider"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={minVal}
              onChange={handleMinChange}
              style={{ position: 'absolute', width: '100%', zIndex: 2 }}
            />
            <input
              type="range"
              className="slider"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={maxVal}
              onChange={handleMaxChange}
              style={{ position: 'absolute', width: '100%', zIndex: 2 }}
            />
          </div>
          <div className="price-text pt-4 d-flex flex-column gap-1" style={{ fontSize: '0.85rem' }}>
            <span>Min: <strong>{fmt(minVal)}</strong></span>
            <span>Max: <strong>{fmt(maxVal)}</strong></span>
          </div>
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
