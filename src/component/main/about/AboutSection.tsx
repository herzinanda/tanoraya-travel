import Link from 'next/link'
import React from 'react'
import type { AboutHeroProps } from '@/types'
import { StrapiImage } from '@/component/main/home/StrapiImage'
import Image from 'next/image'

const AboutSection = ({
  title,
  subtitle,
  aboutText,
  ctaAbout,
  aboutImages,
}: Readonly<AboutHeroProps>) => {
  const images = aboutImages || []

  return (
    <section className="about-section section-padding fix">
      <div className="container">
        <div className="about-wrapper">
          <div className="row g-4">
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="about-left-image">
                {images[0] ? (
                  <StrapiImage
                    src={images[0].url}
                    alt={images[0].alternativeText || 'About image'}
                    className="wow img-custom-anim-left"
                    width={307}
                    height={365}
                  />
                ) : (
                  <Image src="/img/about/about-1.jpg" alt="img" className="wow img-custom-anim-left" width={307} height={365} />
                )}
                <div className="about-image-2">
                  {images[1] ? (
                    <StrapiImage
                      src={images[1].url}
                      alt={images[1].alternativeText || 'About image'}
                      className="wow img-custom-anim-left"
                      width={225}
                      height={225}
                    />
                  ) : (
                    <Image src="/img/about/about-2.jpg" alt="img" className="wow img-custom-anim-left" width={225} height={225} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">{subtitle}</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    {title}
                  </h2>
                </div>
                <p className="mt-4 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                  {aboutText}
                </p>
                {ctaAbout?.text && (
                  <div className="about-button wow fadeInUp" data-wow-delay=".7s">
                    <Link href={ctaAbout.url || '#'} className="theme-btn">
                      {ctaAbout.text}
                      {ctaAbout.withArrow && (
                        <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16} />
                      )}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="about-right-image">
                {images[2] ? (
                  <StrapiImage
                    src={images[2].url}
                    alt={images[2].alternativeText || 'About image'}
                    className="wow img-custom-anim-right"
                    width={307}
                    height={365}
                  />
                ) : (
                  <Image src="/img/about/about-3.jpg" alt="img" className="wow img-custom-anim-right" width={307} height={365} />
                )}
                <div className="about-image-2">
                  {images[3] ? (
                    <StrapiImage
                      src={images[3].url}
                      alt={images[3].alternativeText || 'About image'}
                      className="wow img-custom-anim-right"
                      width={225}
                      height={225}
                    />
                  ) : (
                    <Image src="/img/about/about-4.jpg" alt="img" className="wow img-custom-anim-right" width={225} height={225} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
