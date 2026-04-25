// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TourCard = {
  id: string
  title: string
  slug: string
  location: string
  price: number | null
  isFeatured: boolean
  hasUpcomingDepartures: boolean
  thumbUrl: string | null
  thumbAlt: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapTourCard(item: any): TourCard {
  const thumb = item.tourImageThumbnail
  const today = new Date(new Date().toDateString())

  // Get upcoming departures
  const departures = Array.isArray(item.tour_departures) ? item.tour_departures : []
  const upcoming = departures.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) =>
      new Date(d.departureDate) >= today && d.statusValue !== 'sold_out'
  )

  // Compute lowest price from upcoming departures
  const prices = upcoming
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => d.priceOverride)
    .filter((p: unknown): p is number => typeof p === 'number' && p > 0)
  const price = prices.length > 0 ? Math.min(...prices) : null

  return {
    id: item.documentId || item.id,
    title: item.title || '',
    slug: item.slug || '',
    location: item.destination?.title || '',
    price,
    isFeatured: !!item.isFeatured,
    hasUpcomingDepartures: upcoming.length > 0,
    thumbUrl: thumb?.url || null,
    thumbAlt: thumb?.alternativeText || item.title || 'Tour',
  }
}

/**
 * Filter tours: show only tours with upcoming departures OR featured tours.
 * Optionally filter by price range (departure-based).
 */
export function filterTourCards(
  tours: TourCard[],
  opts?: { minPrice?: number; maxPrice?: number }
): TourCard[] {
  return tours.filter((tour) => {
    // Must have upcoming departures OR be featured
    if (!tour.hasUpcomingDepartures && !tour.isFeatured) return false

    // Price filtering (only applies to tours with a price)
    if (opts?.minPrice !== undefined && (tour.price === null || tour.price < opts.minPrice)) return false
    if (opts?.maxPrice !== undefined && (tour.price === null || tour.price > opts.maxPrice)) return false

    return true
  })
}

const fmt = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatPrice(price: number): string {
  return fmt.format(price)
}
