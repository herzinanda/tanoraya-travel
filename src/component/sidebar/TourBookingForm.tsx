'use client'

import { useState } from 'react'
import { TourDeparture } from '@/types/tour-detail'
import { submitBooking } from '@/app/actions/booking'
import { useTourPage } from '@/component/main/tour-packages/TourPageContext'
import { getEffectivePrice } from '@/utils/price-tiers'

const WA_NUMBER = '6281166666666'
const TITLES = ['Mr.', 'Mrs.', 'Ms.']

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

const fmtIDR = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

type Props = { basePrice: number; departures: TourDeparture[]; tourTitle?: string; tourCode?: string }

export default function TourBookingForm({ basePrice, departures, tourTitle, tourCode }: Props) {
  const upcoming = departures
    .filter((d) => new Date(d.departureDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())

  const {
    selectedDeparture, setSelectedDeparture,
    bookingMode, setBookingMode,
    isCustomDate, setIsCustomDate,
    customDateRange, setCustomDateRange,
    numParticipants, setNumParticipants,
  } = useTourPage()
  const activeDepId = selectedDeparture?.id ?? upcoming[0]?.id ?? ''

  // Live price calculation
  const activeDep = selectedDeparture ?? upcoming[0] ?? null
  const pricePerPerson = activeDep
    ? getEffectivePrice(numParticipants, activeDep.priceTiers, activeDep.priceOverride ?? basePrice)
    : basePrice
  const totalPrice = pricePerPerson * numParticipants
  const hasTiers = (activeDep?.priceTiers?.length ?? 0) > 0

  const [bookerTitle, setBookerTitle] = useState('Mr.')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [error, setError] = useState('')

  const isQuoteMode = bookingMode === 'quote'

  // Today's date for min attribute
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isCustomDate) {
      if (!customDateRange.startDate) {
        setError('Pilih tanggal keberangkatan.')
        return
      }
      if (!customDateRange.endDate) {
        setError('Pilih tanggal kepulangan.')
        return
      }
      if (customDateRange.endDate <= customDateRange.startDate) {
        setError('Tanggal kepulangan harus setelah tanggal keberangkatan.')
        return
      }
    } else if (upcoming.length > 0 && !activeDepId) {
      setError('Please select a departure date.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const notesLines: string[] = []
      notesLines.push(`Participants: ${numParticipants}`)
      if (isCustomDate) {
        notesLines.push(`Custom dates: ${customDateRange.startDate} to ${customDateRange.endDate}`)
      }
      if (notes) notesLines.push(notes)

      const result = await submitBooking({
        bookerTitle,
        booker_first_name: firstName,
        booker_last_name: lastName,
        booker_phone: phone,
        booker_email: email,
        booker_notes: notesLines.join('\n'),
        tour_departure_id: isCustomDate ? '' : activeDepId,
        num_participants: numParticipants,
        book_status: isQuoteMode ? 'quote_requested' : 'pending',
        tour_code: tourCode,
        booking_type: isCustomDate ? 'custom' : isQuoteMode ? 'quote' : 'book',
      })

      const refId = result?.bookingRef ?? result?.data?.documentId ?? result?.data?.id ?? ''
      setBookingRef(refId)
      setSuccess(true)

      // Redirect to WhatsApp if quote mode or custom date
      if (isQuoteMode || isCustomDate) {
        const trip = tourTitle || 'trip ini'
        const dateInfo = isCustomDate
          ? ` untuk tanggal ${customDateRange.startDate} s/d ${customDateRange.endDate}`
          : ''
        const message = `Halo, saya tertarik dengan trip *${trip}*${dateInfo}. Saya sudah mengisi form booking dengan ID *${refId}*. Mohon info lebih lanjut. Terima kasih!`
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
        window.open(waUrl, '_blank')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="activities-card">
        <div className="booking-form text-center py-4">
          {isQuoteMode || isCustomDate ? (
            <>
              <i className="fab fa-whatsapp" style={{ fontSize: 48, color: '#25D366', display: 'block', marginBottom: 16 }} />
              <h3>{isCustomDate ? 'Request Terkirim!' : 'Quote Requested!'}</h3>
              {bookingRef && <p style={{ color: '#888', fontSize: 13, marginTop: 6 }}>Ref: {bookingRef}</p>}
              <p style={{ color: '#666', marginTop: 8 }}>
                Kami akan menghubungi Anda segera. Jendela WhatsApp sudah terbuka untuk melanjutkan diskusi.
              </p>
              <button
                type="button"
                className="theme-btn mt-3"
                style={{ justifyContent: 'center', background: '#25D366', borderColor: '#25D366' }}
                onClick={() => {
                  const trip = tourTitle || 'trip ini'
                  const dateInfo = isCustomDate
                    ? ` untuk tanggal ${customDateRange.startDate} s/d ${customDateRange.endDate}`
                    : ''
                  const message = `Halo, saya tertarik dengan trip *${trip}*${dateInfo}. Saya sudah mengisi form booking dengan ID *${bookingRef}*. Mohon info lebih lanjut. Terima kasih!`
                  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
                }}
              >
                <i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i>
                Open WhatsApp
              </button>
            </>
          ) : (
            <>
              <i className="fa-solid fa-circle-check" style={{ fontSize: 48, color: '#2ecc71', display: 'block', marginBottom: 16 }} />
              <h3>Booking Submitted!</h3>
              {bookingRef && <p style={{ color: '#888', fontSize: 13, marginTop: 6 }}>Ref: {bookingRef}</p>}
              <p style={{ color: '#666', marginTop: 8 }}>We&apos;ll contact you shortly to confirm your booking.</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="activities-card">
      <div className="booking-form">
        <h3>
          {isCustomDate
            ? 'Request Tanggal Khusus'
            : isQuoteMode
              ? 'Request a Quote'
              : 'Book This Tour'}
        </h3>

        {/* Mode Toggle */}
        {!isCustomDate && (
          <div className="d-flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setBookingMode('book')}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: `2px solid ${!isQuoteMode ? 'var(--theme-color, #f26522)' : '#e8e8e8'}`,
                borderRadius: '8px',
                background: !isQuoteMode ? 'var(--theme-color, #f26522)' : '#fff',
                color: !isQuoteMode ? '#fff' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              <i className="fa-solid fa-calendar-check" style={{ marginRight: 6 }}></i>
              Book Now
            </button>
            <button
              type="button"
              onClick={() => setBookingMode('quote')}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: `2px solid ${isQuoteMode ? '#25D366' : '#e8e8e8'}`,
                borderRadius: '8px',
                background: isQuoteMode ? '#25D366' : '#fff',
                color: isQuoteMode ? '#fff' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              <i className="fab fa-whatsapp" style={{ marginRight: 6 }}></i>
              Ask via WhatsApp
            </button>
          </div>
        )}

        {/* Custom date mode banner */}
        {isCustomDate && (
          <div style={{
            background: '#fff8f0',
            border: '1px solid #f26522',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#666',
          }}>
            <i className="fa-solid fa-info-circle" style={{ color: 'var(--theme-color, #f26522)', marginRight: 6 }}></i>
            Anda memilih tanggal khusus. Kami akan mengonfirmasi ketersediaan melalui WhatsApp.
            <button
              type="button"
              onClick={() => {
                setIsCustomDate(false)
                if (upcoming.length > 0) setSelectedDeparture(upcoming[0])
                setBookingMode('book')
              }}
              style={{
                display: 'block',
                marginTop: 8,
                background: 'none',
                border: 'none',
                color: 'var(--theme-color, #f26522)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Kembali ke jadwal tersedia
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Departure — date pickers for custom, select for normal */}
          {isCustomDate ? (
            <>
              <div className="mb-3">
                <label>Tanggal Keberangkatan <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="date"
                  value={customDateRange.startDate}
                  min={today}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Tanggal Kepulangan <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  min={customDateRange.startDate || today}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, endDate: e.target.value })}
                  required
                />
              </div>
            </>
          ) : upcoming.length > 0 ? (
            <div className="mb-3">
              <label>Departure Date <span style={{ color: 'red' }}>*</span></label>
              <select
                value={activeDepId}
                onChange={(e) => {
                  const dep = upcoming.find((d) => d.id === e.target.value)
                  if (dep) setSelectedDeparture(dep)
                }}
                required
              >
                {upcoming.map((dep) => (
                  <option key={dep.id} value={dep.id} disabled={dep.status === 'sold_out'}>
                    {formatDate(dep.departureDate)}
                    {dep.status === 'limited' ? ' — Limited Seats' : ''}
                    {dep.status === 'sold_out' ? ' — Sold Out' : ''}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
              Contact us for available departure dates.
            </p>
          )}

          {/* Booker info */}
          <div className="mb-3 d-flex gap-2">
            <div style={{ width: 90, flexShrink: 0 }}>
              <label>Title</label>
              <select value={bookerTitle} onChange={(e) => setBookerTitle(e.target.value)}>
                {TITLES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>First Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
            </div>
          </div>

          <div className="mb-3">
            <label>Last Name <span style={{ color: 'red' }}>*</span></label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62..." />
          </div>

          <div className="mb-3">
            <label>Email <span style={{ color: 'red' }}>*</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
          </div>

          {/* Number of participants */}
          <div className="mb-3">
            <label>Number of Participants</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                type="button"
                onClick={() => setNumParticipants(Math.max(1, numParticipants - 1))}
                style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontWeight: 700, fontSize: 18, cursor: 'pointer', lineHeight: 1 }}
              >−</button>
              <input
                type="number"
                min={1}
                max={50}
                value={numParticipants}
                onChange={(e) => setNumParticipants(Math.max(1, Math.min(50, Number(e.target.value))))}
                style={{ width: 60, textAlign: 'center' }}
              />
              <button
                type="button"
                onClick={() => setNumParticipants(Math.min(50, numParticipants + 1))}
                style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontWeight: 700, fontSize: 18, cursor: 'pointer', lineHeight: 1 }}
              >+</button>
              {hasTiers && (
                <span style={{ fontSize: 12, color: 'var(--theme)', fontWeight: 600, marginLeft: 4 }}>
                  Group rate active
                </span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label>
              {isQuoteMode || isCustomDate ? 'Questions / Notes' : 'Notes'}{' '}
              <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isCustomDate
                  ? 'Contoh: Kami rombongan 10 orang, ingin berangkat akhir bulan...'
                  : isQuoteMode
                    ? 'Apa yang ingin Anda tanyakan tentang trip ini?'
                    : 'Special requests, dietary needs, etc.'
              }
              rows={3}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          {/* Live price summary */}
          {pricePerPerson > 0 && !isCustomDate && (
            <div style={{
              background: 'linear-gradient(135deg, #fff8f0, #fff3e6)',
              border: '1px solid var(--theme)',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: 8 }}>
                Price Summary
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#555', marginBottom: 6 }}>
                <span>{fmtIDR(pricePerPerson)} × {numParticipants} pax</span>
                {hasTiers && <span style={{ color: 'var(--theme)', fontWeight: 600 }}>Group rate</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f7c08a', paddingTop: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--header)' }}>{fmtIDR(totalPrice)}</span>
              </div>
              {hasTiers && (
                <p style={{ fontSize: 11, color: '#aaa', marginTop: 6, marginBottom: 0 }}>
                  * Price per person adjusts automatically by group size
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="mb-3" style={{ color: '#e74c3c', fontSize: 13, padding: '8px 12px', background: '#fdf0f0', borderRadius: 6 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="theme-btn w-100"
            disabled={loading}
            style={{
              justifyContent: 'center',
              ...(isQuoteMode || isCustomDate ? { background: '#25D366', borderColor: '#25D366' } : {}),
            }}
          >
            {loading
              ? 'Submitting...'
              : isCustomDate
                ? <><i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i>Kirim Request</>
                : isQuoteMode
                  ? <><i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i>Request Quote &amp; Chat</>
                  : 'Book Now'
            }
          </button>
        </form>
      </div>
    </div>
  )
}
