import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { OurGuidesProps } from '@/types'
import { StrapiImage } from '@/component/main/home/StrapiImage'

const DELAY = ['.2s', '.4s', '.6s', '.8s']

const TeamSection = ({
  title,
  subtitle,
  GuideList,
}: Readonly<OurGuidesProps>) => {
  const guides = GuideList || []

  return (
    <section className="team-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">{subtitle}</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            {title}
          </h2>
        </div>
        <div className="row">
          {guides.map((guide, index) => {
            const displayName = guide.name || guide.username || 'Guide'
            return (
              <div
                key={guide.id ?? index}
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay={DELAY[index % DELAY.length]}
              >
                <div className="team-items">
                  <div className="team-image">
                    {guide.photo?.url ? (
                      <StrapiImage
                        src={guide.photo.url}
                        alt={guide.photo.alternativeText || displayName}
                        width={308}
                        height={350}
                      />
                    ) : (
                      <Image
                        src={`/img/team/${(index % 4) + 1}.jpg`}
                        alt={displayName}
                        width={308}
                        height={350}
                      />
                    )}
                    <div className="team-social">
                      <ul>
                        {guide.facebook && (
                          <li><Link href={guide.facebook}><i className="fa-brands fa-facebook-f"></i></Link></li>
                        )}
                        {guide.twitter && (
                          <li><Link href={guide.twitter}><i className="fa-brands fa-twitter"></i></Link></li>
                        )}
                        {guide.linkedin && (
                          <li><Link href={guide.linkedin}><i className="fa-brands fa-linkedin-in"></i></Link></li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h4>{displayName}</h4>
                    <p>{guide.role || 'Tourist Guide'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
