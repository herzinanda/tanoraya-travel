import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { AchievementProps } from '@/types'

const STATIC_ICONS = [
  '/img/icon/traveller.svg',
  '/img/icon/complete.svg',
  '/img/icon/reviews.svg',
  '/img/icon/award.svg',
]

const AchievementSection = ({
  title,
  subtitle,
  achievementCTAButton,
  achievementItems,
}: Readonly<AchievementProps>) => {
  return (
    <section className="achievement-section section-padding fix pb-0">
      <div className="shape-top">
        <Image src="/img/shape/random-top.png" alt="img" width={1920} height={24} />
      </div>
      <div className="shape-bottom">
        <Image src="/img/shape/random-bottom.png" alt="img" width={1920} height={22} />
      </div>
      <div className="container">
        <div className="section-title-area">
          <div className="section-title mb-0">
            <span className="sub-title wow fadeInUp text-white">{subtitle}</span>
            <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
              {title}
            </h2>
          </div>
          {achievementCTAButton?.text && (
            <div className="achievement-button wow fadeInUp" data-wow-delay=".7s">
              <Link href={achievementCTAButton.url || '#'} className="theme-btn">
                {achievementCTAButton.text}
                {achievementCTAButton.withArrow && (
                  <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16} />
                )}
              </Link>
            </div>
          )}
        </div>
        {achievementItems && achievementItems.length > 0 && (
          <div className="achievement-wrapper">
            <div className="row">
              {achievementItems.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay={`${(index + 1) * 0.2}s`}
                >
                  <div className="achievement-items">
                    <div className="content">
                      <div className="icon">
                        <Image
                          src={STATIC_ICONS[index % STATIC_ICONS.length]}
                          alt="icon"
                          width={40}
                          height={40}
                        />
                      </div>
                      <h3 className="number">
                        <span className="count">{item.count}</span>
                        {item.suffix || ''}
                      </h3>
                      <h5>{item.label}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AchievementSection
