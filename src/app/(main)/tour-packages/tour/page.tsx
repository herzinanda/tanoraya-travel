import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import { StrapiImage } from '@/component/main/home/StrapiImage'
import { getTourPackages, getDestinations } from '@/data/loader'
import TourFilterSidebar from '@/component/main/tour-packages/TourFilterSidebar'
import TourSearchBar from '@/component/main/tour-packages/TourSearchBar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTourCard(item: any) {
  const thumb = item.tourImageThumbnail
  return {
    id: item.documentId || item.id,
    title: item.title || '',
    slug: item.slug || '',
    location: item.destination?.title || '',
    price: Number(item.Price) || 0,
    thumbUrl: thumb?.url || null,
    thumbAlt: thumb?.alternativeText || item.title || 'Tour',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDestination(item: any) {
  return {
    id: item.documentId || item.id,
    title: item.title || '',
    destinationUrl: item.destinationUrl || '',
  }
}

const DURATION_MAP: Record<string, { min?: number; max?: number }> = {
  '1-3': { min: 1, max: 3 },
  '4-7': { min: 4, max: 7 },
  '8+': { min: 8 },
}

export default async function TourListPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; minPrice?: string; maxPrice?: string; search?: string; duration?: string }>
}) {
  const { destination, minPrice, maxPrice, search, duration } = await searchParams
  const durationRange = duration ? DURATION_MAP[duration] : undefined

  const [toursRes, destinationsRes] = await Promise.all([
    getTourPackages({
      destinationSlug: destination,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      search,
      minDays: durationRange?.min,
      maxDays: durationRange?.max,
      pageSize: 50,
    }),
    getDestinations(),
  ])

  const tours: ReturnType<typeof mapTourCard>[] = toursRes?.data ? toursRes.data.map(mapTourCard) : []
  const destinations: ReturnType<typeof mapDestination>[] = destinationsRes?.data ? destinationsRes.data.map(mapDestination) : []

  const delays = ['.2s', '.5s', '.8s']

  return (
    <>
      <Breadcrumbs pageTitle="Tour Packages" bgImage="/img/breadcrumb/breadcrumb.jpg" />

      <section className="tour-section section-padding fix">
        <div className="container">

          {/* Search Bar */}
          <Suspense fallback={null}>
            <TourSearchBar initialQuery={search ?? ''} />
          </Suspense>

          <div className="row g-4">

            {/* Main Content */}
            <div className="col-lg-8">
              <div className="tour-wrapper">
                {/* Result count */}
                {(search || destination) && (
                  <p className="mb-4" style={{ color: '#666' }}>
                    {tours.length} package{tours.length !== 1 ? 's' : ''} found
                    {search && <> for &ldquo;<strong>{search}</strong>&rdquo;</>}
                    {destination && <> in <strong>{destination.replace(/-/g, ' ')}</strong></>}
                  </p>
                )}
                {tours.length === 0 ? (
                  <div className="py-5 text-center">
                    <p>No tour packages found{destination ? ` for this destination` : ''}.</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {tours.map((tour, i) => (
                      <div
                        key={tour.id}
                        className="col-md-6 wow fadeInUp"
                        data-wow-delay={delays[i % 3]}
                      >
                        <div className="destination-card-items style-2">
                          <div className="destination-thumb">
                            {tour.thumbUrl ? (
                              <StrapiImage
                                src={tour.thumbUrl}
                                alt={tour.thumbAlt}
                                width={500}
                                height={300}
                              />
                            ) : (
                              <Image
                                src="/img/destinations/1.jpg"
                                alt={tour.thumbAlt}
                                width={500}
                                height={300}
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
                            <h5>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                              }).format(tour.price)}
                              <span>/Person</span>
                            </h5>
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
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <Suspense fallback={<div className="main-sidebar mt-0" />}>
                <TourFilterSidebar destinations={destinations} />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
