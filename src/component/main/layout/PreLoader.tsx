'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PreLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const hide = () => {
      setFadeOut(true)
      setTimeout(() => setVisible(false), 700)
    }

    if (document.readyState === 'complete') {
      setTimeout(hide, 600)
    } else {
      window.addEventListener('load', () => setTimeout(hide, 600))
    }

    // Safety fallback
    const fallback = setTimeout(hide, 4000)
    return () => clearTimeout(fallback)
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        .tano-preloader {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.7s ease;
        }
        .tano-preloader.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .tano-loader-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 280px;
          height: 280px;
        }

        /* Logo in the center */
        .tano-loader-logo {
          position: relative;
          z-index: 2;
          width: 160px;
          height: auto;
          animation: tanoLogoPulse 1.5s ease-in-out infinite;
        }

        @keyframes tanoLogoPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @media (max-width: 576px) {
          .tano-loader-wrap {
            width: 180px;
            height: 180px;
          }
          .tano-loader-logo {
            width: 120px;
          }
        }
      `}</style>

      <div className={`tano-preloader${fadeOut ? ' fade-out' : ''}`}>
        <div className="tano-loader-wrap">
          <Image
            className="tano-loader-logo"
            src="/img/logo/tanoraya-vertical.png"
            alt="Tanoraya Tour & Travel"
            width={160}
            height={200}
            priority
          />
        </div>
      </div>
    </>
  )
}
