import Image from 'next/image'
import React from 'react'

const BrandPartners = () => {
  return (
    <> 
        <div className="brand-wrapper">
          <h4 className="brand-title wow fadeInUp" data-wow-delay=".3s">
            Our Trusted Partners
          </h4>
          <div className="swiper brand-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="brand-image">
                  <Image
                    src="/img/brand/1.png"
                    alt="brand-img"
                    width={154}
                    height={31}
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="brand-image">
                  <Image
                    src="/img/brand/1.png"
                    alt="brand-img"
                    width={154}
                    height={31}
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="brand-image">
                  <Image
                    src="/img/brand/1.png"
                    alt="brand-img"
                    width={154}
                    height={31}
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="brand-image">
                  <Image
                    src="/img/brand/1.png"
                    alt="brand-img"
                    width={154}
                    height={31}
                  />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="brand-image">
                  <Image
                    src="/img/brand/1.png"
                    alt="brand-img"
                    width={154}
                    height={31}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default BrandPartners