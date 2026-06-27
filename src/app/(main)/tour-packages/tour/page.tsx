import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Breadcrumbs from '@/component/main/shared/Breadcrumbs'
import { StrapiImage, getStrapiMedia } from '@/component/main/home/StrapiImage'
import { getTourPackages, getDestinations, getTourPage } from '@/data/loader'
import TourFilterSidebar from '@/component/main/tour-packages/TourFilterSidebar'
import TourSearchBar from '@/component/main/tour-packages/TourSearchBar'
import { mapTourCard, filterTourCards, formatPrice } from '@/utils/map-tour-card'

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

export async function generateMetadata(): Promise<Metadata> {
  const res = await getTourPage()
  const seo = res?.data?.seo

  return {
    title: seo?.meta_title || 'Tour Packages',
    description: seo?.meta_description || 'Browse all Tanoraya Travel tour packages — from Lake Toba adventures to ASEAN multi-country journeys.',
  }
}

export default async function TourListPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; minPrice?: string; maxPrice?: string; search?: string; duration?: string }>
}) {
  const { destination, minPrice, maxPrice, search, duration } = await searchParams
  const durationRange = duration ? DURATION_MAP[duration] : undefined

  const [toursRes, destinationsRes, tourPageRes] = await Promise.all([
    getTourPackages({
      destinationSlug: destination,
      search,
      minDays: durationRange?.min,
      maxDays: durationRange?.max,
      pageSize: 50,
    }),
    getDestinations(),
    getTourPage(),
  ])

  const tourPageData = tourPageRes?.data

  const allTours = toursRes?.data ? toursRes.data.map(mapTourCard) : []
  const tours = filterTourCards(allTours, {
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  })
  const destinations: ReturnType<typeof mapDestination>[] = destinationsRes?.data ? destinationsRes.data.map(mapDestination) : []

  const delays = ['.2s', '.5s', '.8s']

  return (
    <>
      <Breadcrumbs
        pageTitle={tourPageData?.tourTitle || 'Tour Packages'}
        bgImage={getStrapiMedia(tourPageData?.breadcrumbImage?.url) || '/img/breadcrumb/breadcrumb.jpg'}
      />

      <section className="tour-section section-padding fix">
        <div className="container">

          {/* Search Bar */}
          <Suspense fallback={null}>
            <TourSearchBar initialQuery={search ?? ''} />
          </Suspense>

          {/* Filter Bar — full width, above the card grid */}
          <Suspense fallback={<div style={{ height: 56 }} />}>
            <TourFilterSidebar destinations={destinations} horizontal />
          </Suspense>

          {/* Result count */}
          {(search || destination) && (
            <p className="mb-4" style={{ color: '#666' }}>
              {tours.length} package{tours.length !== 1 ? 's' : ''} found
              {search && <> for &ldquo;<strong>{search}</strong>&rdquo;</>}
              {destination && <> in <strong>{destination.replace(/-/g, ' ')}</strong></>}
            </p>
          )}

          {/* Tour cards — full width, 3 cols on desktop */}
          {tours.length === 0 ? (
            <div className="py-5 text-center">
              <p>No tour packages found{destination ? ` for this destination` : ''}.</p>
            </div>
          ) : (
            <div className="row g-4">
              {tours.map((tour, i) => (
                <div
                  key={tour.id}
                  className="col-xl-4 col-md-6 wow fadeInUp"
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
          )}

        </div>
      </section>
    </>
  )
}
