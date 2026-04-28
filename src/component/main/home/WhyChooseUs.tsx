import Image from 'next/image'
import Link from 'next/link'
import { Award, Sparkles, Globe, ShieldCheck, ArrowRight, type LucideIcon } from 'lucide-react'
import { WhyChooseUsProps } from '@/types'
import { getStrapiMedia } from './StrapiImage'

const ICON_MAP: Record<string, LucideIcon> = {
  award: Award,
  sparkle: Sparkles,
  sparkles: Sparkles,
  globe: Globe,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
}

const DEFAULT_ICON_KEYS = ['award', 'sparkle', 'globe', 'shield'] as const

const FALLBACK_FEATURES = [
  { id: 1, title: 'Expert Guides', description: 'Locally trained tour leaders with 10+ years of experience.', iconName: 'award' },
  { id: 2, title: 'Personalized Service', description: 'Itineraries shaped around your taste, pace and budget.', iconName: 'sparkle' },
  { id: 3, title: 'All-Inclusive Packages', description: 'Flights, stays, activities — every detail handled for you.', iconName: 'globe' },
  { id: 4, title: 'Safe & Hassle-Free', description: '24/7 support and flexible rebooking on every journey.', iconName: 'shield' },
]

const WhyChooseUs = ({
  title,
  subtitle,
  description,
  Images,
  badgeNumber,
  badgeLabel,
  whyChooseUsItem,
}: Readonly<Partial<WhyChooseUsProps>>) => {
  const features =
    whyChooseUsItem && whyChooseUsItem.length > 0 ? whyChooseUsItem : FALLBACK_FEATURES

  const mainImgUrl = Images?.[0]?.url ? getStrapiMedia(Images[0].url) : null
  const subImgUrl  = Images?.[1]?.url ? getStrapiMedia(Images[1].url) : null
  const mainImgAlt = Images?.[0]?.alternativeText || 'Why Tanoraya'
  const subImgAlt  = Images?.[1]?.alternativeText || ''

  return (
    <section className="t-section t-why">
      <div className="container">

        {/* ── Main grid ── */}
        <div className="t-why__grid">

          {/* Left: Content */}
          <div>
            <div className="t-eyebrow">{subtitle || 'Why Tanoraya'}</div>

            <h2
              className="t-section__title"
              dangerouslySetInnerHTML={{
                __html:
                  title ||
                  'Travel the world, <em>the Tanoraya way</em>',
              }}
            />

            <p className="t-section__sub">
              {description ||
                "From the beaches of Bali to the peaks of the Alps, we design trips that balance comfort, adventure, and authentic local culture. Here's what sets us apart."}
            </p>

            {/* Features 2×2 */}
            <div className="t-why__features">
              {features.map((f, i) => {
                const iconKey =
                  f.iconName?.toLowerCase() ?? DEFAULT_ICON_KEYS[i % DEFAULT_ICON_KEYS.length]
                const IconComponent = ICON_MAP[iconKey] ?? Award

                return (
                  <div key={f.id ?? i} className="t-feature">
                    <div className="t-feature__icon">
                      <IconComponent size={22} />
                    </div>
                    <div className="t-feature__title">{f.title}</div>
                    <p className="t-feature__desc">{f.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="t-why__visual">
            {/* Main image */}
            <div className="t-why__img-main">
              {mainImgUrl ? (
                <Image
                  src={mainImgUrl}
                  alt={mainImgAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1d58b8, #0b2a5b)' }} />
              )}
            </div>

            {/* Sub image */}
            <div className="t-why__img-sub">
              {subImgUrl ? (
                <Image
                  src={subImgUrl}
                  alt={subImgAlt}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #ff9555, #ff7a2b)' }} />
              )}
            </div>

            {/* Badge */}
            <div className="t-why__badge">
              <div className="t-why__badge__icon">
                <Award size={18} />
              </div>
              <div>
                <div className="t-why__badge__n">{badgeNumber || '15+ Years'}</div>
                <div className="t-why__badge__l">{badgeLabel || 'Of Experience'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div style={{ marginTop: 88 }}>
          <div className="t-cta-banner">
            <div>
              <div className="t-eyebrow" style={{ color: 'var(--t-orange-400)' }}>
                Ready when you are
              </div>
              <h2>Start your adventure today</h2>
              <p>
                Ready to explore the world? Get in touch with our travel experts and
                let&apos;s plan your dream vacation together.
              </p>
            </div>
            <div className="t-cta-banner__actions">
              <Link href="/tour-packages" className="t-btn t-btn--primary">
                Book Now <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="t-btn t-btn--ghost-white">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs
