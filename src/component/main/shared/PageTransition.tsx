'use client'

import { useEffect, useState } from 'react'

export default function PageTransition() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const hide = () => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 600)
    }

    if (document.readyState === 'complete') {
      setTimeout(hide, 400)
    } else {
      window.addEventListener('load', () => setTimeout(hide, 400))
    }

    // Safety fallback
    const fallback = setTimeout(hide, 3000)
    return () => clearTimeout(fallback)
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        .pt-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s ease;
        }
        .pt-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        /* Clouds */
        .pt-cloud {
          position: absolute;
          opacity: 0.55;
          animation: ptDrift 6s ease-in-out infinite alternate;
        }
        .pt-cloud-1 { top: 22%; left: 8%; animation-delay: 0s; }
        .pt-cloud-2 { top: 15%; right: 9%; animation-delay: 1.2s; }
        .pt-cloud-3 { bottom: 20%; left: 12%; animation-delay: 2.4s; }
        .pt-cloud-4 { bottom: 18%; right: 10%; animation-delay: 0.7s; }

        @keyframes ptDrift {
          from { transform: translateX(0); }
          to   { transform: translateX(14px); }
        }

        /* Main circle */
        .pt-circle {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: linear-gradient(145deg, #e8793a 0%, #c95c1a 100%);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(232, 121, 58, 0.4);
          animation: ptPulse 2s ease-in-out infinite;
        }

        @keyframes ptPulse {
          0%, 100% { box-shadow: 0 20px 60px rgba(232,121,58,0.4); }
          50%       { box-shadow: 0 24px 72px rgba(232,121,58,0.6); }
        }

        /* Orbit ring */
        .pt-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 2px dashed rgba(232, 121, 58, 0.3);
          animation: ptSpin 12s linear infinite;
        }

        @keyframes ptSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Balloon floats */
        .pt-balloon-wrap {
          position: absolute;
          top: -28px;
          right: 28px;
          animation: ptFloat 3s ease-in-out infinite;
        }

        @keyframes ptFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }

        /* Script title */
        .pt-title {
          font-family: var(--font-dancing-script, 'Dancing Script', cursive);
          font-size: 2.2rem;
          color: #fff;
          line-height: 1;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .pt-subtitle {
          font-size: 0.7rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin-top: 4px;
        }

        /* Luggage bounce */
        .pt-luggage {
          position: absolute;
          bottom: -32px;
          left: 50%;
          transform: translateX(-50%);
          animation: ptBounce 1.4s ease-in-out infinite;
        }

        @keyframes ptBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-6px); }
        }

        /* Dot loader */
        .pt-dots {
          position: absolute;
          bottom: -62px;
          display: flex;
          gap: 6px;
        }
        .pt-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e8793a;
          animation: ptDotPulse 1.2s ease-in-out infinite;
        }
        .pt-dot:nth-child(2) { animation-delay: 0.2s; }
        .pt-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes ptDotPulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40%           { transform: scale(1);   opacity: 1; }
        }

        @media (max-width: 576px) {
          .pt-circle { width: 200px; height: 200px; }
          .pt-title  { font-size: 1.7rem; }
        }
      `}</style>

      <div className={`pt-overlay${fadeOut ? ' fade-out' : ''}`}>
        {/* Background clouds */}
        <div className="pt-cloud pt-cloud-1">
          <CloudSVG size={90} />
        </div>
        <div className="pt-cloud pt-cloud-2">
          <CloudSVG size={70} />
        </div>
        <div className="pt-cloud pt-cloud-3">
          <CloudSVG size={60} />
        </div>
        <div className="pt-cloud pt-cloud-4">
          <CloudSVG size={80} />
        </div>

        <div style={{ position: 'relative' }}>
          {/* Dashed orbit ring */}
          <div className="pt-ring" />

          {/* Main circle */}
          <div className="pt-circle">
            {/* Hot air balloon top-right */}
            <div className="pt-balloon-wrap">
              <BalloonSVG />
            </div>

            {/* Brand text */}
            <span className="pt-title">Tanoraya</span>
            <span className="pt-subtitle">Travel</span>

            {/* Luggage bottom-center */}
            <div className="pt-luggage">
              <LuggageSVG />
            </div>
          </div>

          {/* Loading dots below circle */}
          <div className="pt-dots">
            <div className="pt-dot" />
            <div className="pt-dot" />
            <div className="pt-dot" />
          </div>
        </div>
      </div>
    </>
  )
}

function CloudSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="40" ry="18" fill="#e8793a" fillOpacity="0.15" />
      <ellipse cx="35" cy="34" rx="20" ry="16" fill="#e8793a" fillOpacity="0.18" />
      <ellipse cx="65" cy="36" rx="18" ry="14" fill="#e8793a" fillOpacity="0.18" />
      <ellipse cx="50" cy="28" rx="22" ry="18" fill="#e8793a" fillOpacity="0.2" />
    </svg>
  )
}

function BalloonSVG() {
  return (
    <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Balloon body */}
      <ellipse cx="24" cy="22" rx="18" ry="20" fill="white" fillOpacity="0.9" />
      {/* Vertical stripes */}
      <path d="M24 2 Q30 12 24 42 Q18 12 24 2" fill="white" fillOpacity="0.3" />
      <path d="M16 6 Q10 18 14 40" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      <path d="M32 6 Q38 18 34 40" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
      {/* Basket ropes */}
      <line x1="18" y1="42" x2="20" y2="54" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      <line x1="30" y1="42" x2="28" y2="54" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      {/* Basket */}
      <rect x="18" y="54" width="12" height="8" rx="2" fill="white" fillOpacity="0.8" />
    </svg>
  )
}

function LuggageSVG() {
  return (
    <svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="4" y="10" width="36" height="26" rx="4" fill="white" fillOpacity="0.88" />
      {/* Handle */}
      <path d="M15 10 L15 6 Q15 2 22 2 Q29 2 29 6 L29 10" stroke="white" strokeOpacity="0.8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Center strip */}
      <rect x="20" y="10" width="4" height="26" fill="white" fillOpacity="0.25" />
      {/* Horizontal belt */}
      <rect x="4" y="20" width="36" height="4" rx="1" fill="white" fillOpacity="0.25" />
      {/* Wheels */}
      <circle cx="11" cy="37" r="3" fill="white" fillOpacity="0.7" />
      <circle cx="33" cy="37" r="3" fill="white" fillOpacity="0.7" />
    </svg>
  )
}
