import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getStrapiMedia } from '@/component/main/home/StrapiImage'

interface CTAbgSectionProps {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  bgImageUrl?: string | null
}

const CTAbgSection = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  bgImageUrl,
}: Readonly<CTAbgSectionProps>) => {
  const bgUrl = bgImageUrl ? getStrapiMedia(bgImageUrl) : '/img/cta/bg.jpg'

  return (
    <section className="cta-bg-section bg-cover fix" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="container">
        <div className="row">
          <div className="cta-wrapper text-center">
            <div className="section-title">
              <span className="sub-title wow fadeInUp">
                {subtitle || 'Explore The World'}
              </span>
              <h2
                className="wow fadeInUp"
                data-wow-delay=".3s"
                dangerouslySetInnerHTML={{
                  __html: (title || 'Step into Adventure, Bask\nin Natural Glory').replace(/\n/g, '<br/>'),
                }}
              />
              {description && (
                <p className="mt-3 text-white wow fadeInUp" data-wow-delay=".5s">
                  {description}
                </p>
              )}
            </div>
            <div className="cta-button wow fadeInUp" data-wow-delay=".7s">
              <Link href={buttonUrl || '/contact'} className="theme-btn">
                {buttonText || 'Check Availability'}{' '}
                <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAbgSection
