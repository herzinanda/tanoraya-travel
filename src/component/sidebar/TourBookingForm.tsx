'use client'

import { useState } from 'react'
import { TourDeparture } from '@/types/tour-detail'
import { submitBooking, Participant } from '@/app/actions/booking'
import { useTourPage } from '@/component/main/tour-packages/TourPageContext'

const TITLES = ['Mr.', 'Mrs.', 'Ms.']
const ID_TYPES: ('KTP' | 'Passport')[] = ['KTP', 'Passport']

const fmt = (val: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

const emptyParticipant = (): Participant => ({
  title: 'Mr.',
  first_name: '',
  last_name: '',
  id_type: 'KTP',
  id_number: '',
})

type Props = { basePrice: number; departures: TourDeparture[] }

export default function TourBookingForm({ basePrice, departures }: Props) {
  const upcoming = departures
    .filter((d) => new Date(d.departureDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())

  const { selectedDeparture, setSelectedDeparture } = useTourPage()
  const activeDepId = selectedDeparture?.id ?? upcoming[0]?.id ?? ''

  const [bookerTitle, setBookerTitle] = useState('Mr.')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [fillLater, setFillLater] = useState(false)
  const [numParticipants, setNumParticipants] = useState(1)
  const [participants, setParticipants] = useState<Participant[]>([emptyParticipant()])

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [error, setError] = useState('')

  const selectedDep = upcoming.find((d) => d.id === activeDepId)
  const price = selectedDep?.priceOverride ?? basePrice

  const handleNumChange = (n: number) => {
    const clamped = Math.max(1, Math.min(20, n))
    setNumParticipants(clamped)
    setParticipants((prev) => {
      const next = [...prev]
      while (next.length < clamped) next.push(emptyParticipant())
      return next.slice(0, clamped)
    })
  }

  const updateParticipant = (i: number, key: keyof Participant, val: string) => {
    setParticipants((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: val } : p)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fillLater && upcoming.length > 0 && !activeDepId) {
      setError('Please select a departure date.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await submitBooking({
        bookerTitle,
        booker_first_name: firstName,
        booker_last_name: lastName,
        booker_phone: phone,
        booker_email: email,
        fill_participant_later: fillLater,
        tour_departure_id: activeDepId,
        participants: fillLater ? [] : participants,
      })
      setBookingRef(result?.data?.documentId ?? result?.data?.id ?? '')
      setSuccess(true)
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
          <i className="fa-solid fa-circle-check" style={{ fontSize: 48, color: '#2ecc71', display: 'block', marginBottom: 16 }} />
          <h3>Booking Submitted!</h3>
          {bookingRef && <p style={{ color: '#888', fontSize: 13, marginTop: 6 }}>Ref: {bookingRef}</p>}
          <p style={{ color: '#666', marginTop: 8 }}>We&apos;ll contact you shortly to confirm your booking.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="activities-card">
      <div className="booking-form">
        <h3>Book This Tour</h3>
        <form onSubmit={handleSubmit}>

          {/* Departure */}
          {upcoming.length > 0 ? (
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
                    {dep.priceOverride ? ` (${fmt(dep.priceOverride)})` : ''}
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

          {/* Participant count */}
          <div className="mb-3">
            <label>Number of Participants</label>
            <input
              type="number"
              min={1}
              max={20}
              value={numParticipants}
              onChange={(e) => handleNumChange(Number(e.target.value))}
            />
          </div>

          {/* Fill later toggle */}
          <div className="mb-3 d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setFillLater((v) => !v)}>
            <input type="checkbox" checked={fillLater} onChange={() => {}} style={{ width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
            <label style={{ cursor: 'pointer', marginBottom: 0, fontSize: 14 }}>
              I&apos;ll fill participant details later
            </label>
          </div>

          {/* Participant rows */}
          {!fillLater && (
            <div className="mb-3">
              <h5 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Participant Details</h5>
              {participants.map((p, i) => (
                <div key={i} style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: '12px', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Participant {i + 1}</p>
                  <div className="d-flex gap-2 mb-2">
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <select value={p.title} onChange={(e) => updateParticipant(i, 'title', e.target.value)}>
                        {TITLES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="First name"
                      value={p.first_name}
                      onChange={(e) => updateParticipant(i, 'first_name', e.target.value)}
                      required
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Last name"
                      value={p.last_name}
                      onChange={(e) => updateParticipant(i, 'last_name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <select
                      value={p.id_type}
                      onChange={(e) => updateParticipant(i, 'id_type', e.target.value)}
                      style={{ width: 110, flexShrink: 0 }}
                    >
                      {ID_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <input
                      type="text"
                      placeholder="ID Number"
                      value={p.id_number}
                      onChange={(e) => updateParticipant(i, 'id_number', e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mb-3 d-flex justify-content-between align-items-center" style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
            <span style={{ fontWeight: 600 }}>Price / Person</span>
            <span style={{ fontWeight: 700, color: 'var(--theme-color, #f26522)', fontSize: 18 }}>{fmt(price)}</span>
          </div>

          {error && (
            <div className="mb-3" style={{ color: '#e74c3c', fontSize: 13, padding: '8px 12px', background: '#fdf0f0', borderRadius: 6 }}>
              {error}
            </div>
          )}

          <button type="submit" className="theme-btn w-100" disabled={loading} style={{ justifyContent: 'center' }}>
            {loading ? 'Submitting...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  )
}
