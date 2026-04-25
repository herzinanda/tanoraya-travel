import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HomeTestimonialsProps } from '@/types'
import { getStrapiMedia } from './StrapiImage'

const FALLBACK_TESTIMONIALS = [
  {
    name: 'Benjamin Carter',
    role: 'Ceo & Owner',
    location: 'New York, NY',
    comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
    avatar: '/img/testimonial/3.png',
    rating: 5,
  },
  {
    name: 'Lucas Thompson',
    role: 'Ceo & Owner',
    location: 'New York, NY',
    comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
    avatar: '/img/testimonial/4.png',
    rating: 5,
  },
  {
    name: 'Elena Gordon',
    role: 'Ceo & Owner',
    location: 'New York, NY',
    comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
    avatar: '/img/testimonial/5.png',
    rating: 5,
  },
]

const TestimonialSection = ({
  title,
  subtitle,
  button,
  testimonialItems,
}: Readonly<Partial<HomeTestimonialsProps>>) => {
  const items = testimonialItems && testimonialItems.length > 0
    ? testimonialItems.map((item) => ({
        name: item.name,
        role: item.role || '',
        location: item.location || '',
        comment: item.comment,
        avatar: item.avatar?.url ? getStrapiMedia(item.avatar.url) : '/img/testimonial/3.png',
        rating: item.rating ?? 5,
      }))
    : FALLBACK_TESTIMONIALS

  return (
    <>
      <section className="testimonial-section section-padding fix">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <span className="sub-title wow fadeInUp">
                {subtitle || 'Testimonial'}
              </span>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                {title || 'What Our Clients Say'}
              </h2>
            </div>
            <div className="about-button wow fadeInUp" data-wow-delay=".7s">
              <Link href={button?.url || '/contact'} className="theme-btn">
                {button?.text || 'Read More'}
                <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16} />
              </Link>
            </div>
          </div>
          <div className="swiper testimonial-slider">
            <div className="swiper-wrapper">
              {items.map((item, i) => (
                <div key={i} className="swiper-slide">
                  <div className="testimonial-main-item">
                    <div className="top-shape">
                      <Image src="/img/testimonial/shape1.png" alt="img" width={420} height={199} />
                    </div>
                    <div className="testimonial-card-item">
                      <div className="polygon-shape">
                        <Image src="/img/testimonial/shape2.png" alt="img" width={44} height={38} />
                      </div>
                      <div className="testimonial-content">
                        <div className="star">
                          {Array.from({ length: item.rating }, (_, j) => (
                            <i key={j} className="fas fa-star"></i>
                          ))}
                        </div>
                        <p>{item.comment}</p>
                        <div className="info-item">
                          <div className="content">
                            <h4>{item.location}</h4>
                          </div>
                          <div className="icon">
                            <Image src="/img/icon/qoute.svg" alt="img" width={29} height={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="client-info-item">
                      <div className="client-image">
                        <Image
                          src={item.avatar!}
                          alt={item.name}
                          width={60}
                          height={60}
                          unoptimized={item.avatar !== '/img/testimonial/3.png' && item.avatar !== '/img/testimonial/4.png' && item.avatar !== '/img/testimonial/5.png'}
                        />
                      </div>
                      <div className="info-text">
                        <h4>{item.name}</h4>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TestimonialSection
