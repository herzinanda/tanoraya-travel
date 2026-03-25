'use client'

import { useState } from 'react'
import Image from 'next/image'
import { submitQuote } from '@/app/actions/quote'

const BUDGET_RANGES = [
  'Under Rp 5.000.000',
  'Rp 5.000.000 – Rp 15.000.000',
  'Rp 15.000.000 – Rp 30.000.000',
  'Rp 30.000.000 – Rp 50.000.000',
  'Above Rp 50.000.000',
]

const HOW_HEARD = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Friend / Family',
  'Travel Agent',
  'Other',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TITLES = ['Mr.', 'Mrs.', 'Ms.']

export default function RequestAQuoteForm({ destinations }: { destinations: any[] }) {
  const [form, setForm] = useState({
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    destination_interest: '',
    preferred_travel_month: '',
    number_of_travellers: 1,
    budget_range: '',
    special_requirements: '',
    how_did_you_hear: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await submitQuote({
        booker_title: form.title,
        full_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        destination_interest: form.destination_interest,
        preferred_travel_month: form.preferred_travel_month,
        number_of_travellers: form.number_of_travellers,
        budget_range: form.budget_range,
        special_requirements: form.special_requirements,
        how_did_you_hear: form.how_did_you_hear,
      })
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-5">
        <i
          className="fa-solid fa-circle-check"
          style={{ fontSize: 64, color: '#2ecc71', display: 'block', marginBottom: 20 }}
        />
        <h3>Thank You!</h3>
        <p style={{ color: '#666', marginTop: 12, maxWidth: 400, margin: '12px auto 0' }}>
          Your quote request has been received. Our team will get back to you within 24 hours.
        </p>
        <a
          href="https://wa.me/628116666666"
          className="theme-btn d-inline-flex align-items-center gap-2 mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i> Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="row g-4">

        {/* Title */}
        <div className="col-lg-2">
          <div className="form-clt">
            <span>Title</span>
            <select value={form.title} onChange={(e) => set('title', e.target.value)}>
              <option value="">—</option>
              {TITLES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* First Name */}
        <div className="col-lg-5">
          <div className="form-clt">
            <span>First Name <span style={{ color: 'red' }}>*</span></span>
            <input
              type="text"
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => set('first_name', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="col-lg-5">
          <div className="form-clt">
            <span>Last Name <span style={{ color: 'red' }}>*</span></span>
            <input
              type="text"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => set('last_name', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Email <span style={{ color: 'red' }}>*</span></span>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Phone Number <span style={{ color: 'red' }}>*</span></span>
            <input
              type="tel"
              placeholder="+62..."
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Destination */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Destination Interest</span>
            <select value={form.destination_interest} onChange={(e) => set('destination_interest', e.target.value)}>
              <option value="">— Select Destination —</option>
              {destinations.map((d: any) => (
                <option key={d.documentId || d.id} value={d.title}>{d.title}</option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
        </div>

        {/* Travel Month */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Preferred Travel Month</span>
            <select value={form.preferred_travel_month} onChange={(e) => set('preferred_travel_month', e.target.value)}>
              <option value="">— Select Month —</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Number of Travellers */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Number of Travellers <span style={{ color: 'red' }}>*</span></span>
            <input
              type="number"
              min={1}
              max={100}
              value={form.number_of_travellers}
              onChange={(e) => set('number_of_travellers', Number(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>Budget Range (per person)</span>
            <select value={form.budget_range} onChange={(e) => set('budget_range', e.target.value)}>
              <option value="">— Select Budget —</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* How did you hear */}
        <div className="col-lg-6">
          <div className="form-clt">
            <span>How did you hear about us?</span>
            <select value={form.how_did_you_hear} onChange={(e) => set('how_did_you_hear', e.target.value)}>
              <option value="">— Select —</option>
              {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="col-lg-12">
          <div className="form-clt">
            <span>Special Requirements</span>
            <textarea
              rows={4}
              placeholder="Dietary needs, accessibility requirements, special occasions..."
              value={form.special_requirements}
              onChange={(e) => set('special_requirements', e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="col-12">
            <div style={{ color: '#e74c3c', fontSize: 13, padding: '10px 14px', background: '#fdf0f0', borderRadius: 6 }}>
              {error}
            </div>
          </div>
        )}

        <div className="col-lg-6">
          <button type="submit" className="theme-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Quote Request'}
            {!loading && (
              <Image src="/img/icon/white-arrow.svg" alt="arrow" width={22} height={16} />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
