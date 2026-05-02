'use client';

import { useState, useEffect, useCallback, useRef, type CSSProperties } from 'react';
import Button from '@/component/main/ui/Button';
import Image from 'next/image';
import type { HeroSectionProps } from '@/types';
import { getStrapiMedia } from './StrapiImage';

const INTERVAL_MS = 5000; // ms between auto-advances
const ANIM_MS     = 750;  // ms for slide transition

const HeroSection = ({
  title,
  subtitle,
  heroImages,
  ctaPrimary,
  ctaSecondary,
}: Readonly<HeroSectionProps>) => {
  const images = heroImages ?? [];
  const count  = images.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [exitIdx,   setExitIdx]   = useState<number | null>(null);
  const busy = useRef(false);

  // Navigate to a specific slide index
  const goTo = useCallback(
    (next: number) => {
      if (busy.current || next === activeIdx || count <= 1) return;
      busy.current = true;
      setExitIdx(activeIdx);
      setActiveIdx(next);
      setTimeout(() => {
        setExitIdx(null);
        busy.current = false;
      }, ANIM_MS);
    },
    [activeIdx, count],
  );

  const advance = useCallback(
    () => goTo((activeIdx + 1) % count),
    [activeIdx, count, goTo],
  );

  // Auto-advance; resets whenever activeIdx changes
  useEffect(() => {
    if (count <= 1) return;
    const id = setTimeout(advance, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeIdx, advance, count]);

  const bgStyle = (idx: number): CSSProperties => {
    const img = images[idx];
    if (!img) return {};
    const url = getStrapiMedia(img.url);
    return url ? { backgroundImage: `url('${url}')` } : {};
  };

  return (
    <>
      <style>{`
        /* ── Background slideshow container ── */
        .hs-slides {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        .hs-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          will-change: transform;
        }
        /* Entering slide: slides up from below */
        .hs-slide--enter {
          z-index: 2;
          animation: hsEnter ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        /* Exiting slide: slides out to the top */
        .hs-slide--exit {
          z-index: 1;
          animation: hsExit ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes hsEnter {
          from { transform: translateY(100%); }
          to   { transform: translateY(0);    }
        }
        @keyframes hsExit {
          from { transform: translateY(0);     }
          to   { transform: translateY(-100%); }
        }

        /* ── Dot indicators ── */
        .hs-dots {
          position: absolute;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .hs-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: 2px solid rgba(255, 255, 255, 0.65);
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: background 0.3s ease, transform 0.3s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hs-dot--active {
          background: #ffffff;
          transform: scale(1.45);
          border-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.28);
        }
        .hs-dot:hover:not(.hs-dot--active) {
          background: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.9);
        }
        @media (max-width: 576px) {
          .hs-dots { right: 14px; gap: 9px; }
          .hs-dot  { width: 8px; height: 8px; }
        }
      `}</style>

      <section className="hero-section">

        {/* ── Slide backgrounds ── */}
        <div className="hs-slides">
          {/* Exiting slide: keyed uniquely so it always remounts fresh */}
          {exitIdx !== null && (
            <div
              key={`exit-${exitIdx}`}
              className="hs-slide hs-slide--exit"
              style={bgStyle(exitIdx)}
            />
          )}
          {/* Active / entering slide */}
          <div
            key={`active-${activeIdx}`}
            className={`hs-slide${exitIdx !== null ? ' hs-slide--enter' : ''}`}
            style={bgStyle(activeIdx)}
          />
        </div>

        {/* ── Decorative plane shape ── */}
        <div className="shape float-bob-x">
          <Image
            src="/img/shape/plane-1.png"
            alt="shape"
            width={230}
            height={336}
          />
        </div>

        {/* ── Hero content ── */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="hero-wrapper">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">{subtitle}</span>
                  <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                    {title}
                  </h1>
                </div>
                <div className="hero-button wow fadeInUp" data-wow-delay=".7s">
                  {ctaPrimary && (
                    <Button href={ctaPrimary.url}>{ctaPrimary.text}</Button>
                  )}
                  {ctaSecondary && (
                    <Button href={ctaSecondary.url} variant="style-2">
                      {ctaSecondary.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dot indicators (only when multiple images) ── */}
        {count > 1 && (
          <nav className="hs-dots" aria-label="Slideshow navigation">
            {images.map((img, i) => (
              <button
                key={img.id ?? i}
                type="button"
                className={`hs-dot${i === activeIdx ? ' hs-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIdx ? 'true' : undefined}
              />
            ))}
          </nav>
        )}

      </section>
    </>
  );
};

export default HeroSection;
