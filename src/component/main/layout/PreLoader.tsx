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
          animation: tanoLogoFadeIn 0.6s ease-out both;
        }

        @keyframes tanoLogoFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Spinning dashed circle */
        .tano-spinner-ring {
          position: absolute;
          inset: 0;
          z-index: 1;
          animation: tanoSpin 2.5s linear infinite;
        }

        .tano-spinner-ring svg {
          width: 100%;
          height: 100%;
        }

        @keyframes tanoSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 576px) {
          .tano-loader-wrap {
            width: 220px;
            height: 220px;
          }
          .tano-loader-logo {
            width: 120px;
          }
        }
      `}</style>

      <div className={`tano-preloader${fadeOut ? ' fade-out' : ''}`}>
        <div className="tano-loader-wrap">
          {/* Spinning dashed circle */}
          <div className="tano-spinner-ring">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tano-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a3272" />
                  <stop offset="50%" stopColor="#F7941D" />
                  <stop offset="100%" stopColor="#1a3272" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="url(#tano-ring-grad)"
                strokeWidth="3"
                strokeDasharray="12 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Logo */}
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
