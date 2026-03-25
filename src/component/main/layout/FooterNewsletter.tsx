'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/app/actions/newsletter'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const result = await subscribeNewsletter(email)
    if (result.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
    setMessage(result.message)
  }

  return (
    <form onSubmit={handleSubmit} className="footer-input style-3">
      {status === 'success' ? (
        <p style={{ color: '#4caf50', fontWeight: 500 }}>{message}</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <button
            className="newsletter-btn theme-btn"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}{' '}
            <i className="fa-sharp fa-regular fa-arrow-right"></i>
          </button>
        </>
      )}
      {status === 'error' && (
        <p style={{ color: '#e53935', fontSize: '0.8rem', marginTop: '0.5rem' }}>{message}</p>
      )}
    </form>
  )
}
