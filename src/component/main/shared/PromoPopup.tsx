'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface PromoData {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  ctaLabel?: string
  ctaUrl?: string
  imageUrl?: string
  imageAlt?: string
  expiresAt?: string
}

const SESSION_KEY = 'tanoraya_promo_closed'

export default function PromoPopup({ promo }: { promo: PromoData }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [promo.expiresAt])

  function close() {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 350)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .promo-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99998;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: promoFadeIn 0.35s ease;
        }
        .promo-backdrop.closing {
          animation: promoFadeOut 0.35s ease forwards;
        }
        @keyframes promoFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes promoFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        .promo-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          max-width: 460px;
          width: 100%;
          position: relative;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
          animation: promoSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .promo-backdrop.closing .promo-card {
          animation: promoSlideDown 0.35s ease forwards;
        }
        @keyframes promoSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes promoSlideDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(40px) scale(0.95); }
        }

        /* Close button */
        .promo-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: background 0.2s, transform 0.2s;
          color: #333;
          font-size: 1rem;
          line-height: 1;
        }
        .promo-close:hover {
          background: #fff;
          transform: scale(1.1);
        }

        /* Image area */
        .promo-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          background: linear-gradient(145deg, #e8793a 0%, #c95c1a 100%);
          overflow: hidden;
        }
        .promo-img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Badge */
        .promo-badge {
          display: inline-block;
          background: linear-gradient(90deg, #e8793a, #c95c1a);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        /* Body */
        .promo-body {
          padding: 20px 24px 28px;
          text-align: center;
        }
        .promo-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .promo-subtitle {
          font-size: 0.88rem;
          color: #e8793a;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .promo-desc {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .promo-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #e8793a 0%, #c95c1a 100%);
          color: #fff;
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(232,121,58,0.4);
        }
        .promo-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(232,121,58,0.5);
          color: #fff;
        }
        .promo-skip {
          display: block;
          margin-top: 12px;
          font-size: 0.78rem;
          color: #aaa;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .promo-skip:hover { color: #888; }

        @media (max-width: 480px) {
          .promo-img-wrap { height: 170px; }
          .promo-body { padding: 16px 18px 22px; }
          .promo-title { font-size: 1.25rem; }
        }
      `}</style>

      <div className={`promo-backdrop${closing ? ' closing' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="promo-card" role="dialog" aria-modal="true" aria-label="Promo popup">

          {/* Close × */}
          <button className="promo-close" onClick={close} aria-label="Close promo">
            ✕
          </button>

          {/* Image / header */}
          <div className="promo-img-wrap">
            {promo.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={promo.imageUrl}
                alt={promo.imageAlt ?? promo.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div className="promo-img-fallback">
                <FallbackIllustration />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="promo-body">
            {promo.badge && <span className="promo-badge">{promo.badge}</span>}
            <h2 className="promo-title">{promo.title}</h2>
            {promo.subtitle && <p className="promo-subtitle">{promo.subtitle}</p>}
            {promo.description && <p className="promo-desc">{promo.description}</p>}

            {promo.ctaUrl && promo.ctaLabel && (
              <Link href={promo.ctaUrl} className="promo-cta" onClick={close}>
                {promo.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            )}

            <button className="promo-skip" onClick={close}>
              No thanks, maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function FallbackIllustration() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky backdrop */}
      <rect width="200" height="160" fill="url(#skyGrad)" rx="0"/>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c95c1a"/>
          <stop offset="100%" stopColor="#e8793a"/>
        </linearGradient>
      </defs>
      {/* Clouds */}
      <ellipse cx="30" cy="40" rx="22" ry="10" fill="white" fillOpacity="0.2"/>
      <ellipse cx="22" cy="38" rx="12" ry="9" fill="white" fillOpacity="0.2"/>
      <ellipse cx="160" cy="30" rx="26" ry="11" fill="white" fillOpacity="0.18"/>
      <ellipse cx="175" cy="28" rx="14" ry="9" fill="white" fillOpacity="0.18"/>
      {/* Hot air balloon */}
      <ellipse cx="100" cy="55" rx="30" ry="34" fill="white" fillOpacity="0.92"/>
      <path d="M100 21 Q116 38 100 89 Q84 38 100 21" fill="white" fillOpacity="0.25"/>
      <line x1="83" y1="88" x2="88" y2="104" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
      <line x1="117" y1="88" x2="112" y2="104" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/>
      <rect x="86" y="104" width="28" height="14" rx="3" fill="white" fillOpacity="0.85"/>
      {/* Stars */}
      <circle cx="55" cy="20" r="2" fill="white" fillOpacity="0.6"/>
      <circle cx="148" cy="55" r="1.5" fill="white" fillOpacity="0.5"/>
      <circle cx="170" cy="70" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="25" cy="70" r="1.5" fill="white" fillOpacity="0.5"/>
      {/* Ground / hills */}
      <ellipse cx="40" cy="148" rx="50" ry="20" fill="white" fillOpacity="0.12"/>
      <ellipse cx="160" cy="150" rx="55" ry="18" fill="white" fillOpacity="0.12"/>
      {/* Tanoraya text */}
      <text x="100" y="142" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="white" fillOpacity="0.9" letterSpacing="2">TANORAYA TRAVEL</text>
    </svg>
  )
}
