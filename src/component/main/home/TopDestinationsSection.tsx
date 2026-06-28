import { HomeDestinationsProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinations, getDestinationsByIds } from '@/data/loader'
import { readHomepageDestinationIds } from '@/data/homepage-selections'
import { StrapiImage } from './StrapiImage'

const FALLBACK_IMAGES = [
  '/img/destination/new/05.jpg',
  '/img/destination/new/06.jpg',
  '/img/destination/new/07.jpg',
  '/img/destination/new/08.jpg',
  '/img/destination/new/09.jpg',
  '/img/destination/new/10.jpg',
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(item: any, i: number) {
  return {
    id: item.documentId || item.id,
    title: item.title || '',
    destinationUrl: item.destinationUrl || '',
    tourCount: Array.isArray(item.tour_packages) ? item.tour_packages.length : 0,
    imgUrl: item.destinationImages?.url || null,
    imgAlt: item.destinationImages?.alternativeText || item.title || 'Destination',
    fallback: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
  }
}

const TopDestinationsSection = async ({
  title,
  subtitle,
}: Readonly<HomeDestinationsProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let destinations: any[] = []

  try {
    const selectedIds = await readHomepageDestinationIds()

    if (selectedIds.length > 0) {
      const res = await getDestinationsByIds(selectedIds)
      if (res?.data && Array.isArray(res.data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const byId = new Map(res.data.map((d: any) => [d.documentId, d]))
        destinations = selectedIds
          .map((id, i) => {
            const item = byId.get(id)
            return item ? normalize(item, i) : null
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter(Boolean) as any[]
      }
    } else {
      const res = await getDestinations()
      if (res?.data && Array.isArray(res.data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destinations = res.data.slice(0, 6).map((item: any, i: number) => normalize(item, i))
      }
    }
  } catch (err) {
    console.error('Failed to fetch destinations for TopDestinationsSection:', err)
  }

  // Pad to 6 if fewer returned
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
        <div className="dest-bento-grid">
          <div className="dest-bento-wide">
            <DestCard dest={d0} width={616} height={280} />
          </div>
          <div>
            <DestCard dest={d1} width={308} height={280} />
          </div>
          <div>
            <DestCard dest={d2} width={308} height={280} />
          </div>
          <div>
            <DestCard dest={d3} width={308} height={280} />
          </div>
          <div>
            <DestCard dest={d4} width={308} height={280} />
          </div>
          <div className="dest-bento-wide">
            <DestCard dest={d5} width={616} height={280} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopDestinationsSection
