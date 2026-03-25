'use client'

import { TourDeparture } from '@/types/tour-detail'
import { useTourPage } from '@/component/main/tour-packages/TourPageContext'

const fmt = (val: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val)

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('id-ID', { weekday: 'long' }),
    short: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  }
}

const statusLabel: Record<string, { text: string; color: string }> = {
  available: { text: 'Available', color: '#2ecc71' },
  limited: { text: 'Limited Seats', color: '#f39c12' },
  sold_out: { text: 'Sold Out', color: '#e74c3c' },
}

export default function TourDepartureTabs({
  departures,
  basePrice,
}: {
  departures: TourDeparture[]
  basePrice: number
}) {
  const upcoming = departures
    .filter((d) => new Date(d.departureDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())

  const { selectedDeparture, setSelectedDeparture } = useTourPage()

  if (upcoming.length === 0) return null

  const selected = (selectedDeparture && upcoming.find(d => d.id === selectedDeparture.id)) ?? upcoming[0]

  return (
    <div className="departure-section mt-4 mb-4">
      <h4 className="mb-3" style={{ fontWeight: 600 }}>
        <i className="fa-regular fa-calendar-days me-2" style={{ color: 'var(--theme-color, #f26522)' }}></i>
        {upcoming.length} Tanggal Keberangkatan
      </h4>

      {/* Date Tabs */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        {upcoming.map((dep) => {
          const { day, short } = formatDate(dep.departureDate)
          const isActive = dep.id === selected?.id
          const isSoldOut = dep.status === 'sold_out'

          return (
            <button
              key={dep.id}
              type="button"
              onClick={() => setSelectedDeparture(dep)}
              disabled={isSoldOut}
              style={{
                padding: '10px 18px',
                border: `2px solid ${isActive ? 'var(--theme-color, #f26522)' : '#e8e8e8'}`,
                borderRadius: '8px',
                background: isActive ? 'var(--theme-color, #f26522)' : '#fff',
                color: isActive ? '#fff' : isSoldOut ? '#bbb' : '#333',
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                minWidth: '130px',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '2px' }}>{day}</div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{short}</div>
              {dep.status !== 'available' && (
                <div
                  style={{
                    fontSize: '10px',
                    marginTop: '3px',
                    color: isActive
                      ? 'rgba(255,255,255,0.85)'
                      : statusLabel[dep.status]?.color ?? '#999',
                  }}
                >
                  {statusLabel[dep.status]?.text}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Departure Detail */}
      <div
        style={{
          background: '#fafafa',
          border: '1px solid #e8e8e8',
          borderRadius: '12px',
          padding: '20px 24px',
        }}
      >
        <div className="row g-3 align-items-center">
          <div className="col-6 col-sm-3">
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>Departure</div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
              {formatDate(selected.departureDate).short}
            </div>
          </div>

          {selected.returnDate && (
            <div className="col-6 col-sm-3">
              <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>Return</div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                {formatDate(selected.returnDate).short}
              </div>
            </div>
          )}

          <div className="col-6 col-sm-3">
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>Seats Left</div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
              <span
                style={{
                  color: selected.availableSeats <= 5 ? '#f39c12' : '#2ecc71',
                  marginRight: '4px',
                }}
              >
                ●
              </span>
              {selected.availableSeats > 0 ? `${selected.availableSeats} seats` : 'Sold Out'}
            </div>
          </div>

          <div className="col-6 col-sm-3">
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>Price / Person</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--theme-color, #f26522)',
              }}
            >
              {fmt(selected.priceOverride ?? basePrice)}
            </div>
          </div>
        </div>

        {/* Book Now CTA */}
        {selected.status !== 'sold_out' && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e8e8e8' }}>
            <a
              href="#book-this-tour"
              className="theme-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Book Now — {formatDate(selected.departureDate).short}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
