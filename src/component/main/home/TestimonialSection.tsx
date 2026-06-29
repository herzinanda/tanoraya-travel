import Image from 'next/image'
import { HomeTestimonialsProps } from '@/types'
import { getStrapiMedia } from './StrapiImage'
import SwiperInit from '@/component/main/shared/SwiperInit'
import { getTestimonials } from '@/data/loader'

const FALLBACK_AVATARS = ['/img/testimonial/3.png', '/img/testimonial/4.png', '/img/testimonial/5.png']

const TestimonialSection = async ({
  title,
  subtitle,
}: Readonly<Partial<HomeTestimonialsProps>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reviews: any[] = []
  try {
    const res = await getTestimonials({ pageSize: 6 })
    if (res?.data) reviews = res.data
  } catch {}

  const items = reviews.length > 0
    ? reviews.map((r: any, i: number) => ({  // eslint-disable-line @typescript-eslint/no-explicit-any
        name: r.reviewerName ?? '',
        role: r.role ?? '',
        location: r.location ?? '',
        comment: r.comment ?? '',
        avatar: r.avatar?.url ? getStrapiMedia(r.avatar.url) : FALLBACK_AVATARS[i % FALLBACK_AVATARS.length],
        rating: r.rating_overall ?? 5,
        isStrapi: !!r.avatar?.url,
      }))
    : [
        {
          name: 'Benjamin Carter',
          role: 'CEO & Owner',
          location: 'New York, NY',
          comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
          avatar: '/img/testimonial/3.png',
          rating: 5,
          isStrapi: false,
        },
        {
          name: 'Lucas Thompson',
          role: 'CEO & Owner',
          location: 'New York, NY',
          comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
          avatar: '/img/testimonial/4.png',
          rating: 5,
          isStrapi: false,
        },
        {
          name: 'Elena Gordon',
          role: 'CEO & Owner',
          location: 'New York, NY',
          comment: '"Incredible customer service attention to detail. Express Travel truly goes above and beyond to ensure their clients have a memorable experience. Can\'t wait to travel with them again!"',
          avatar: '/img/testimonial/5.png',
          rating: 5,
          isStrapi: false,
        },
      ]

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
                          unoptimized={item.isStrapi}
                          style={{ objectFit: 'cover' }}
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
      <SwiperInit
        selector=".testimonial-slider"
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          767: { slidesPerView: 2 },
          1199: { slidesPerView: 3 },
        }}
      />
    </>
  )
}

export default TestimonialSection
