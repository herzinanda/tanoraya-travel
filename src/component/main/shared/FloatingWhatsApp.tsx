'use client'

import Image from 'next/image'
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
          bottom: 24px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .float-wa-tooltip {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          padding: 10px 16px;
          max-width: 200px;
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
          right: 28px;
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
          display: block;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          transition: transform 0.25s ease;
          animation: taraFloat 3s ease-in-out infinite;
        }

        .float-wa-btn:hover {
          transform: scale(1.06) translateY(-4px);
          animation: none;
        }

        .float-wa-btn:active {
          transform: scale(0.97);
          animation: none;
        }

        .float-wa-btn img {
          width: 200px;
          height: auto;
          display: block;
          filter: drop-shadow(0 8px 20px rgba(26,50,114,0.22));
        }

        /* WhatsApp badge */
        .float-wa-badge {
          position: absolute;
          bottom: 28px;
          right: 0px;
          width: 28px;
          height: 28px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid #fff;
          box-shadow: 0 3px 10px rgba(0,0,0,0.18);
          animation: waBadgePop 2.5s ease-in-out infinite;
        }

        @keyframes taraFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        @keyframes waBadgePop {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.15); }
        }

        @keyframes floatFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .float-wa-wrap { bottom: 16px; right: 12px; }
          .float-wa-btn img { width: 120px; }
          .float-wa-badge { width: 24px; height: 24px; bottom: 22px; }
        }
      `}</style>

      <div className="float-wa-wrap">
        {hovered && (
          <div className="float-wa-tooltip">
            <strong>Tara — Travel Assistant</strong>
            Chat dengan kami di WhatsApp, kami siap membantu! 😊
          </div>
        )}

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="float-wa-btn"
          aria-label="Chat on WhatsApp with Tara"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src="/img/logo/contact-us-icon.png"
            alt="Tara - Travel Assistant"
            width={300}
            height={300}
            priority
          />

          {/* WhatsApp badge */}
          <span className="float-wa-badge" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
        </a>
      </div>
    </>
  )
}
