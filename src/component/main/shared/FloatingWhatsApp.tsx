'use client'

import { useState } from 'react'

const WA_NUMBER = '6281166666666'
const WA_MESSAGE = 'Halo, mohon info mengenai paket wisata Tanoraya Travel 🙏'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <style>{`
        .float-wa-wrap {
          position: fixed;
          bottom: 32px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .float-wa-tooltip {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          padding: 10px 16px;
          max-width: 220px;
          font-size: 0.82rem;
          line-height: 1.4;
          color: #333;
          position: relative;
          animation: floatFadeIn 0.22s ease;
          border: 1px solid #f0f0f0;
        }

        .float-wa-tooltip::after {
          content: '';
          position: absolute;
          bottom: -8px;
          right: 22px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #fff;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.06));
        }

        .float-wa-tooltip strong {
          display: block;
          margin-bottom: 2px;
          color: #e8793a;
          font-size: 0.85rem;
        }

        .float-wa-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8793a 0%, #c95c1a 100%);
          box-shadow: 0 6px 24px rgba(232,121,58,0.45);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          position: relative;
          overflow: visible;
        }

        .float-wa-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 10px 32px rgba(232,121,58,0.55);
        }

        .float-wa-btn:active {
          transform: scale(0.96);
        }

        /* Persona avatar SVG ring */
        .float-wa-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* WhatsApp badge */
        .float-wa-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 24px;
          height: 24px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        /* Pulse ring */
        .float-wa-btn::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(232,121,58,0.4);
          animation: waPulse 2s ease-in-out infinite;
        }

        @keyframes waPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.18); opacity: 0; }
        }

        @keyframes floatFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .float-wa-wrap { bottom: 20px; right: 16px; }
          .float-wa-btn  { width: 56px; height: 56px; }
          .float-wa-avatar { width: 56px; height: 56px; }
        }
      `}</style>

      <div className="float-wa-wrap">
        {hovered && (
          <div className="float-wa-tooltip">
            <strong>Tanoraya Travel</strong>
            Chat dengan kami sekarang — kami siap membantu! 😊
          </div>
        )}

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="float-wa-btn"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="float-wa-avatar">
            {/* Persona: travel agent silhouette SVG */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Head */}
              <circle cx="18" cy="13" r="6" fill="white" fillOpacity="0.95"/>
              {/* Body */}
              <path d="M6 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" fillOpacity="0.9"/>
              {/* Hat / travel accent */}
              <path d="M12 10c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" fill="none"/>
              <circle cx="27" cy="9" r="3" fill="white" fillOpacity="0.75"/>
              <path d="M25.5 9l1.5-3 1.5 3" fill="white" fillOpacity="0.75"/>
            </svg>

            {/* WhatsApp badge */}
            <span className="float-wa-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
          </div>
        </a>
      </div>
    </>
  )
}
