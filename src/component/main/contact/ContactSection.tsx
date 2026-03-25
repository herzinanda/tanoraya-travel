'use client'

import Image from 'next/image'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await submitContact(form)
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="contact-section section-padding fix section-bg bg-cover"
      style={{ backgroundImage: 'url(/img/contact/bg.png)' }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="contact-wrapper">
              <div className="section-title">
                <span className="sub-title wow fadeInUp">Contact Us</span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                  Let&apos;s Plan Your Dream Journey Together
                </h2>
              </div>
              <div className="contact-thumb">
                <Image src="/img/contact/1.jpg" className="ex" alt="img" width={563} height={370} />
                <h4>
                  <Image src="/img/icon/phone.svg" alt="img" width={35} height={35} />
                  <a href="tel:+6281166666666">+62 811 6666 666</a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-form style-2">
              <h3>Fill The Contact Form</h3>
              <p>Feel free to contact us, we don&apos;t spam your email</p>

              {success ? (
                <div style={{ padding: 20, background: '#f0faf0', borderRadius: 8, color: '#27ae60', marginTop: 16 }}>
                  <i className="fa-solid fa-circle-check me-2" />
                  Thank you! Your message has been received. We&apos;ll get back to you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-clt">
                        <input
                          type="text"
                          placeholder="Your name *"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-clt">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-clt">
                        <input
                          type="email"
                          placeholder="Email address *"
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-clt">
                        <textarea
                          placeholder="Write your message *"
                          value={form.message}
                          onChange={(e) => set('message', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="col-12">
                        <div style={{ color: '#e74c3c', fontSize: 13, padding: '8px 12px', background: '#fdf0f0', borderRadius: 6, marginBottom: 8 }}>
                          {error}
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <button type="submit" className="theme-btn style-2" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
