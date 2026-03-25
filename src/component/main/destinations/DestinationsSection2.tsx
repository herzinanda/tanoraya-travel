import Link from 'next/link'
import { getDestinations } from '@/data/loader'
import { StrapiImage } from '@/component/main/home/StrapiImage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDestination(item: any) {
  const img = item.destinationImages ?? null

  return {
    id: item.documentId || item.id,
    title: item.title || '',
    destinationUrl: item.destinationUrl || '',
    tourCount: Array.isArray(item.tour_packages) ? item.tour_packages.length : 0,
    imgUrl: img?.url || null,
    imgAlt: img?.alternativeText || item.title || 'Destination',
  }
}

const DestinationsSection2 = async () => {
  let destinations: ReturnType<typeof mapDestination>[] = []

  try {
    const response = await getDestinations()
    if (response?.data && Array.isArray(response.data)) {
destinations = response.data.map(mapDestination)
    }
  } catch (error) {
    console.error('Failed to fetch destinations:', error)
  }

  return (
    <section className="destination-section2 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {destinations.map((dest, i) => (
            <div
              key={dest.id}
              className={`col-lg-4 col-md-6 wow fadeInUp`}
              data-wow-delay={`${((i % 3) + 1) * 0.2}s`}
            >
              <Link href={`/tour-packages/tour?destination=${dest.destinationUrl}`} className="destination-card-items2 mt-0">
                <div className="thumb">
                  {dest.imgUrl ? (
                    <StrapiImage
                      src={dest.imgUrl}
                      alt={dest.imgAlt}
                      width={420}
                      height={460}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/img/destinations/5.jpg"
                      alt={dest.imgAlt}
                      width={420}
                      height={460}
                    />
                  )}
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>{dest.title}</h3>
                    </div>
                    <span className="style-2">{dest.tourCount} Tour{dest.tourCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationsSection2
