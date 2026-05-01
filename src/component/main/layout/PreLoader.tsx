'use client'

import { useEffect, useState } from 'react'

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

        .tano-swoosh-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: tanoScaleIn 0.8s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        @keyframes tanoScaleIn {
          from { opacity: 0; transform: scale(0.6) translateY(16px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }

        .tano-swoosh-wrap svg {
          width: 260px;
          height: auto;
          overflow: visible;
          filter: drop-shadow(0 6px 18px rgba(26,50,114,0.18));
        }

        .tano-pl-arc {
          opacity: 0;
          animation: tanoFadeIn 0.55s 0.1s ease-out forwards;
        }
        .tano-pl-swoosh {
          opacity: 0;
          animation: tanoFadeIn 0.75s 0.3s ease-out forwards;
        }
        .tano-pl-crescent {
          opacity: 0;
          animation: tanoCrescentPop 0.5s 0.75s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        @keyframes tanoFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes tanoCrescentPop {
          from { opacity: 0; transform: scale(0.2); transform-box: fill-box; transform-origin: center; }
          to   { opacity: 1; transform: scale(1);   transform-box: fill-box; transform-origin: center; }
        }

        /* Pulse on the whole logo after build-in */
        .tano-swoosh-wrap svg {
          animation: tanoLogoPulse 2s ease-in-out 1.5s infinite;
        }
        @keyframes tanoLogoPulse {
          0%,100% { filter: drop-shadow(0 6px 18px rgba(26,50,114,0.18)); }
          50%      { filter: drop-shadow(0 10px 28px rgba(247,148,29,0.3)); }
        }

        .tano-loading-dots {
          display: flex;
          gap: 7px;
        }
        .tano-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1a3272;
          animation: tanoDot 1.2s ease-in-out infinite;
          opacity: 0;
          animation-delay: 1s;
        }
        .tano-dot:nth-child(1) { animation-delay: 1.0s; }
        .tano-dot:nth-child(2) { animation-delay: 1.2s; }
        .tano-dot:nth-child(3) { animation-delay: 1.4s; }
        @keyframes tanoDot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
          40%          { transform: scale(1);   opacity: 1;   }
        }

        @media (max-width: 576px) {
          .tano-swoosh-wrap svg { width: 200px; }
        }
      `}</style>

      <div className={`tano-preloader${fadeOut ? ' fade-out' : ''}`}>
        <div className="tano-swoosh-wrap">

          <svg
            viewBox="0 0 320 115"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Tanoraya Tour & Travel"
          >
            <defs>
              {/* Navy → royal blue */}
              <linearGradient id="tpl-gblue" x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#1a32a0" />
                <stop offset="100%" stopColor="#2468c8" />
              </linearGradient>
              {/* Sky-blue for outer arc */}
              <linearGradient id="tpl-gblue-lt" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#4a90d0" />
                <stop offset="100%" stopColor="#88bce0" />
              </linearGradient>
              {/* Yellow → orange → deep-orange */}
              <linearGradient id="tpl-gorange" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%"   stopColor="#ffe040" />
                <stop offset="45%"  stopColor="#f7941d" />
                <stop offset="100%" stopColor="#e84318" />
              </linearGradient>
            </defs>

            {/* ① Light-blue outer arc — visible through swoosh interior */}
            <path
              className="tano-pl-arc"
              fill="url(#tpl-gblue-lt)"
              d="M 255,6
                 C 295,15 320,52 308,90
                 C 298,114 268,119 243,104
                 C 259,94 271,74 273,53
                 C 275,31 266,14 255,6 Z"
            />

            {/* ② Main navy swoosh — evenodd punches the interior hole */}
            <path
              className="tano-pl-swoosh"
              fill="url(#tpl-gblue)"
              fillRule="evenodd"
              d="
                M 10,104
                C 32,90  63,66  97,47
                C 131,28 169,13 206,8
                C 233,4  259,8  277,22
                C 300,40 306,68 290,90
                C 276,106 252,112 232,102
                C 214,92 208,74 214,56
                C 220,38 237,26 255,26
                C 234,19 207,17 183,24
                C 150,34 120,55 90,77
                C 65,93  36,106 10,104 Z

                M 238,26
                C 264,28 278,50 272,74
                C 266,95 246,105 226,97
                C 212,88 212,70 220,54
                C 228,38 234,24 238,26 Z
              "
            />

            {/* ③ Orange crescent — fills the lower part of the interior */}
            <path
              className="tano-pl-crescent"
              fill="url(#tpl-gorange)"
              d="M 252,28
                 C 272,42 278,66 266,84
                 C 258,98 242,104 226,96
                 C 238,87 246,71 243,53
                 C 241,40 245,32 252,28 Z"
            />
          </svg>

          {/* Loading dots */}
          <div className="tano-loading-dots">
            <div className="tano-dot" />
            <div className="tano-dot" />
            <div className="tano-dot" />
          </div>
        </div>
      </div>
    </>
  )
}
