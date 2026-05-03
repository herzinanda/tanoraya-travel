'use client'

import { TourDeparture } from '@/types/tour-detail'
import { useTourPage } from '@/component/main/tour-packages/TourPageContext'
import { getEffectivePrice, getLowestTierPrice } from '@/utils/price-tiers'

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

  const { selectedDeparture, setSelectedDeparture, setBookingMode, isCustomDate, setIsCustomDate, numParticipants, setNumParticipants } = useTourPage()

  const customDateCTA = (
    <div
      style={{
        background: isCustomDate ? '#fff8f0' : '#fafafa',
        border: `1px solid ${isCustomDate ? 'var(--theme-color, #f26522)' : '#e8e8e8'}`,
        borderRadius: '12px',
        padding: '20px 24px',
        marginTop: '16px',
        textAlign: 'center',
      }}
    >
      <i className="fa-regular fa-calendar-plus" style={{ fontSize: 28, color: 'var(--theme-color, #f26522)', marginBottom: 8, display: 'block' }}></i>
      <p style={{ fontWeight: 600, marginBottom: 6, fontSize: '0.95rem' }}>
        Tidak menemukan jadwal yang tepat?
      </p>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 14 }}>
        Pilih tanggal keberangkatan sesuai keinginan Anda, dan kami akan menghubungi Anda untuk konfirmasi ketersediaan.
      </p>
      {isCustomDate ? (
        <button
          type="button"
          className="theme-btn"
          onClick={() => {
            setIsCustomDate(false)
            if (upcoming.length > 0) setSelectedDeparture(upcoming[0])
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#999', borderColor: '#999' }}
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Jadwal Tersedia
        </button>
      ) : (
        <a
          href="#book-this-tour"
          className="theme-btn"
          onClick={() => {
            setIsCustomDate(true)
            setBookingMode('quote')
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          Pilih Tanggal Sendiri <i className="fa-solid fa-calendar-pen"></i>
        </a>
      )}
    </div>
  )

  if (upcoming.length === 0) {
    return (
      <div className="departure-section mt-4 mb-4">
        <h4 className="mb-3" style={{ fontWeight: 600 }}>
          <i className="fa-regular fa-calendar-days me-2" style={{ color: 'var(--theme-color, #f26522)' }}></i>
          Tanggal Keberangkatan
        </h4>
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #e8e8e8',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <i className="fa-regular fa-calendar-xmark" style={{ fontSize: 36, color: '#ccc', marginBottom: 12, display: 'block' }}></i>
          <p style={{ fontWeight: 600, marginBottom: 6, fontSize: '1rem' }}>
            Belum ada jadwal keberangkatan yang tersedia
          </p>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
            Hubungi kami untuk informasi jadwal terbaru atau request tanggal khusus.
          </p>
        </div>
        {customDateCTA}
      </div>
    )
  }

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
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '4px' }}>
              Participants
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button type="button" onClick={() => setNumParticipants(Math.max(1, numParticipants - 1))}
                style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #ddd', background: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>−</button>
              <span style={{ fontWeight: 700, fontSize: 16, minWidth: 22, textAlign: 'center' }}>{numParticipants}</span>
              <button type="button" onClick={() => setNumParticipants(Math.min(50, numParticipants + 1))}
                style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #ddd', background: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>+</button>
            </div>
          </div>

          <div className="col-6 col-sm-3">
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '2px' }}>
              Price / Person
            </div>
            {(selected.priceTiers?.length ?? 0) > 0 && (
              <div style={{ fontSize: '11px', color: 'var(--theme)', fontWeight: 600, marginBottom: 2 }}>
                Group rate · {selected.priceTiers!.length} tiers
              </div>
            )}
            <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--header)' }}>
              {fmt(getEffectivePrice(numParticipants, selected.priceTiers, selected.priceOverride ?? basePrice))}
            </div>
            {(selected.priceTiers?.length ?? 0) > 0 && (
              <div style={{ fontSize: '11px', color: '#aaa' }}>
                Start from {fmt(getLowestTierPrice(selected.priceTiers, selected.priceOverride ?? basePrice))}
              </div>
            )}
          </div>
        </div>

        {/* CTAs */}
        {selected.status !== 'sold_out' && !isCustomDate && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e8e8e8', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#book-this-tour"
              className="theme-btn"
              onClick={() => setBookingMode('book')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Book Now — {formatDate(selected.departureDate).short}
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a
              href="#book-this-tour"
              className="theme-btn rounded-full"
              onClick={() => setBookingMode('quote')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#25D366',
                color: '#fff',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: 18 }}></i>
              Ask Us First
            </a>
          </div>
        )}
      </div>

      {customDateCTA}
    </div>
  )
}
