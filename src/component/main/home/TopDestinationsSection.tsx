import { HomeDestinationsProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinations } from '@/data/loader'
import { StrapiImage } from './StrapiImage'

const FALLBACK_IMAGES = [
  '/img/destination/new/05.jpg',
  '/img/destination/new/06.jpg',
  '/img/destination/new/07.jpg',
  '/img/destination/new/08.jpg',
  '/img/destination/new/09.jpg',
  '/img/destination/new/10.jpg',
]

const TopDestinationsSection = async ({
  title,
  subtitle,
}: Readonly<HomeDestinationsProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let destinations: any[] = []

  try {
    const res = await getDestinations()
    if (res?.data && Array.isArray(res.data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destinations = res.data.slice(0, 6).map((item: any, i: number) => ({
        id: item.documentId || item.id,
        title: item.title || '',
        destinationUrl: item.destinationUrl || '',
        tourCount: Array.isArray(item.tour_packages) ? item.tour_packages.length : 0,
        imgUrl: item.destinationImages?.url || null,
        imgAlt: item.destinationImages?.alternativeText || item.title || 'Destination',
        fallback: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
      }))
    }
  } catch (err) {
    console.error('Failed to fetch destinations for TopDestinationsSection:', err)
  }

  // Pad with placeholders if fewer than 6 destinations
  while (destinations.length < 6) {
    const i = destinations.length
    destinations.push({
      id: `placeholder-${i}`,
      title: '',
      destinationUrl: '',
      tourCount: 0,
      imgUrl: null,
      imgAlt: 'Destination',
      fallback: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    })
  }

  const [d0, d1, d2, d3, d4, d5] = destinations

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DestCard = ({ dest, width, height }: { dest: any; width: number; height: number }) => (
    <div className="new-top-desti-thumb">
      {dest.imgUrl ? (
        <StrapiImage src={dest.imgUrl} alt={dest.imgAlt} width={width} height={height} />
      ) : (
        <Image src={dest.fallback} alt={dest.imgAlt} width={width} height={height} />
      )}
      {dest.title && (
        <div className="content">
          <h4>
            <Link href={`/tour-packages/tour?destination=${dest.destinationUrl}`}>
              {dest.title}
            </Link>
          </h4>
          {dest.tourCount > 0 && (
            <p>{dest.tourCount} Tour{dest.tourCount !== 1 ? 's' : ''}</p>
          )}
        </div>
      )}
    </div>
  )

  return (
    <section className="top-destination-section section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">{subtitle}</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            {title}
          </h2>
        </div>
        <div className="new-top-destination-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-6">
                  <DestCard dest={d0} width={308} height={285} />
                  <DestCard dest={d1} width={308} height={285} />
                </div>
                <div className="col-md-6">
                  <DestCard dest={d2} width={307} height={600} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-6">
                  <DestCard dest={d3} width={308} height={360} />
                  <DestCard dest={d4} width={308} height={360} />
                </div>
                <div className="col-md-6">
                  <DestCard dest={d5} width={307} height={360} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopDestinationsSection
