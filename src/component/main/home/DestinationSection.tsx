import Link from 'next/link'
import Image from 'next/image'
import { getTourPackages } from '@/data/loader'
import { StrapiImage } from '@/component/main/home/StrapiImage'
import SwiperInit from '@/component/main/shared/SwiperInit'
import { mapTourCard, filterTourCards, formatPrice } from '@/utils/map-tour-card'

const DestinationSection = async ({ title, subtitle }: { title?: string; subtitle?: string } = {}) => {
  let tours: ReturnType<typeof mapTourCard>[] = []

  try {
    const response = await getTourPackages({ pageSize: 12 })
    if (response?.data && Array.isArray(response.data)) {
      tours = filterTourCards(response.data.map(mapTourCard))
    }
  } catch (error) {
    console.error('Failed to fetch tour packages:', error)
  }

  return (
    <section className="destination-section section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">
            {subtitle || 'Best Recommended Places'}
          </span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s"
            dangerouslySetInnerHTML={{ __html: title || 'Discover the World&apos;s Treasures <br/>with Tanoraya' }}
          />
        </div>

        <div className="swiper destination-slider">
          <div className="swiper-wrapper">
            {tours.map((tour) => (
              <div key={tour.id} className="swiper-slide">
                <div className="destination-card-items">
                  <div className="destination-thumb">
                    {tour.thumbUrl ? (
                      <StrapiImage
                        src={tour.thumbUrl}
                        alt={tour.thumbAlt}
                        width={307}
                        height={250}
                      />
                    ) : (
                      <Image
                        src="/img/destinations/1.jpg"
                        alt={tour.thumbAlt}
                        width={307}
                        height={250}
                      />
                    )}
                    <div className="heart">
                      <i className="fa-solid fa-heart"></i>
                    </div>
                  </div>
                  <div className="destination-content">
                    <h4>
                      <Link href={`/tour-packages/${tour.slug}`}>{tour.title}</Link>
                    </h4>
                    {tour.location && (
                      <span className="place">
                        <i className="fa-solid fa-location-dot"></i> {tour.location}
                      </span>
                    )}
                    {tour.price !== null ? (
                      <h5>
                        <span style={{ fontSize: '0.75em', fontWeight: 400 }}>Start from </span>
                        {formatPrice(tour.price)}
                        <span>/Person</span>
                      </h5>
                    ) : (
                      <h5 style={{ fontSize: '0.85rem', color: '#999' }}>
                        Belum ada jadwal tersedia
                      </h5>
                    )}
                    <div className="booking">
                      <Link href={`/tour-packages/${tour.slug}`} className="theme-btn">
                        Read More{' '}
                        <Image src="/img/icon/theme-arrow.svg" alt="arrow" width={22} height={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="swiper-dot4 mt-5">
          <div className="dot"></div>
        </div>

        <div className="text-center mt-5">
          <Link href="/tour-packages/tour" className="theme-btn">
            Show All Packages <i className="fa-sharp fa-regular fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <SwiperInit
        selector=".destination-slider"
        slidesPerView={4}
        spaceBetween={24}
        paginationEl=".swiper-dot4 .dot"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      />
    </section>
  )
}

export default DestinationSection
