import { Metadata } from 'next';
import TourBookingForm from '@/component/sidebar/TourBookingForm';
import WhyBookWithUs from '@/component/sidebar/WhyBookWithUs';
import { TourPackageType, TourDeparture } from '@/types/tour-detail';
import Breadcrumbs from '@/component/main/shared/Breadcrumbs';
import TourImageSlider from '@/component/main/tour-packages/TourImageSlider';
import TourFeatures from '@/component/main/tour-packages/TourFeatures';
import TourInfoGrid from '@/component/main/tour-packages/TourInfoGrid';
import TourPlanAccordion from '@/component/main/tour-packages/TourPlanAccordion';
import TourInclusionsExclusions from '@/component/main/tour-packages/TourInclusionsExclusions';
import TourDepartureTabs from '@/component/main/tour-packages/TourDepartureTabs';
import { getTourBySlug, getTourDepartures, getTourPackages } from '@/data/loader';
import { getStrapiURL } from '@/utils/get-strapi-url';
import { TourPageProvider } from '@/component/main/tour-packages/TourPageContext';
import { getLowestTierPrice } from '@/utils/price-tiers';

// Helper to get full image URL
function getImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return new URL(url, getStrapiURL()).href;
}

// Map Strapi Data to Frontend Type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStrapiToTour(data: any): TourPackageType {
  // 1. Gallery Images (prefer galleryImages field, fall back to tourGalleries)
  const gallery = data.galleryImages || data.tourGalleries || [];
  const mappedGallery = Array.isArray(gallery)
    ? gallery
      .map((img: any) => ({
        src: getImageUrl(img.url),
        alt: img.alternativeText || 'Gallery Image',
      }))
      .filter((img) => img.src) // Filter out missing images
    : [];

  // 2. Promo Image
  const promoUrl = getImageUrl(data.promoCard?.image?.url);
  const promoImage = promoUrl
    ? {
      src: promoUrl,
      alt: data.promoCard.image.alternativeText || 'Promo'
    }
    : { src: '/img/activities/16.jpg', alt: 'Promo Placeholder' }; // Provide a valid fallback or handle in component

  // 3. Features
  const features = Array.isArray(data.tour_benefit)
    ? data.tour_benefit.map((b: any) => b.tour_benefit_item)
    : [];

  // 4. Info Grid
  const infoGrid = Array.isArray(data.tour_facilities)
    ? data.tour_facilities.map((item: any, index: number) => ({
      id: item.id?.toString() || `facility-${index}`,
      icon: { src: '/img/icon/27.svg', alt: item.type_of_facilities },
      label: item.type_of_facilities,
      value: item.tour_facilities_text,
    }))
    : [];

  // 5. Tour Plan
  const tourPlan = Array.isArray(data.itinerary)
    ? data.itinerary.map((item: any, index: number) => ({
      id: item.id?.toString() || `plan-${index}`,
      title: item.title,
      descriptionHtml: item.itinerary_description,
      image: getImageUrl(item.itinerary_image?.url)
        ? { src: getImageUrl(item.itinerary_image.url), alt: item.title }
        : undefined,
    }))
    : [];

  // 6. Reviews
  const reviews: any[] = [];

  // 7. Departures — populated separately via getTourDepartures
  const departures: TourDeparture[] = [];

  return {
    id: data.slug || data.documentId || 'unknown',
    title: data.title,
    locations: data.destination?.title || 'Unknown Location',
    descriptionHtml: data.tour_description || '',
    galleryImages: mappedGallery as { src: string; alt: string }[],
    features: features,
    highlights: Array.isArray(data.highlights) ? data.highlights as string[] : [],
    inclusions: Array.isArray(data.inclusions) ? data.inclusions as string[] : [],
    exclusions: Array.isArray(data.exclusions) ? data.exclusions as string[] : [],
    minGroupSize: data.minGroupSize ? Number(data.minGroupSize) : undefined,
    infoGrid: infoGrid,
    tourPlan: tourPlan,
    mapEmbedSrc: data.mapEmbedSrc || '',
    reviewSummary: {
      averageRating: 0,
      reviewCount: 0,
      categories: [],
    },
    reviews: reviews,
    price: 0,
    tourCode: data.tourCode || '',
    itineraryFile: data.itinerary_file?.url
      ? {
        url: getImageUrl(data.itinerary_file.url)!,
        name: data.itinerary_file.name || 'Itinerary.pdf',
      }
      : undefined,
    departures,
    promoCard: {
      image: promoImage,
      titleHtml: data.promoCard?.titleHtml || 'Book Now',
    },
    tourImageThumbnail: data.tourImageThumbnail?.url
      ? {
        src: getImageUrl(data.tourImageThumbnail.url)!,
        alt: data.tourImageThumbnail.alternativeText || 'Breadcrumb',
      }
      : undefined,
  };
}

export async function generateStaticParams() {
  try {
    const res = await getTourPackages({ pageSize: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (res?.data ?? []).map((t: any) => ({ 'tour-details': t.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'tour-details': string }>
}): Promise<Metadata> {
  const { 'tour-details': slug } = await params
  try {
    const res = await getTourBySlug(slug)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = res?.data?.[0] as any
    if (!data) return {}
    const thumbUrl = data.tourImageThumbnail?.url
    const imgUrl = thumbUrl
      ? thumbUrl.startsWith('http') ? thumbUrl : new URL(thumbUrl, getStrapiURL()).href
      : undefined
    return {
      title: data.title,
      description: data.tour_description
        ? String(data.tour_description).replace(/<[^>]+>/g, '').slice(0, 160)
        : undefined,
      openGraph: {
        title: data.title,
        description: data.tour_description
          ? String(data.tour_description).replace(/<[^>]+>/g, '').slice(0, 160)
          : undefined,
        images: imgUrl ? [{ url: imgUrl }] : [],
        type: 'website',
      },
    }
  } catch {
    return {}
  }
}

// The Page Component (Server Component)
export default async function TourDetailsPage({ params }: { params: Promise<{ 'tour-details': string }> }) {

  const { 'tour-details': slug } = await params;

  // 1. Fetch tour + departures in parallel
  let tour: TourPackageType | null = null;

  try {
    const [tourRes, depRes] = await Promise.allSettled([
      getTourBySlug(slug),
      getTourDepartures(slug),
    ]);

    const tourData = tourRes.status === 'fulfilled' ? tourRes.value?.data?.[0] : null;
    if (!tourData) throw new Error('Tour not found');

    tour = mapStrapiToTour(tourData);

    // Merge departures + compute lowest departure price
    if (depRes.status === 'fulfilled' && Array.isArray(depRes.value?.data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tour.departures = depRes.value.data.map((d: any) => ({
        id: d.documentId || d.id,
        departureDate: d.departureDate,
        returnDate: d.returnDate ?? undefined,
        availableSeats: Number(d.availableSeats) || 0,
        priceOverride: d.priceOverride ? Number(d.priceOverride) : undefined,
        priceTiers: Array.isArray(d.priceTiers) && d.priceTiers.length > 0 ? d.priceTiers : undefined,
        status: d.statusValue ?? d.status ?? 'available',
        variant: d.variant ? {
          itinerary: Array.isArray(d.variant.itinerary)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? d.variant.itinerary.map((item: any, index: number) => ({
                id: item.id?.toString() || `vi-${index}`,
                title: item.title,
                descriptionHtml: item.itinerary_description ?? '',
                image: item.itinerary_image?.url
                  ? { src: getImageUrl(item.itinerary_image.url), alt: item.title }
                  : undefined,
              }))
            : undefined,
          tour_facilities: Array.isArray(d.variant.tour_facilities)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? d.variant.tour_facilities.map((item: any, index: number) => ({
                id: item.id?.toString() || `vf-${index}`,
                icon: { src: '/img/icon/27.svg', alt: item.type_of_facilities },
                label: item.type_of_facilities,
                value: item.tour_facilities_text,
              }))
            : undefined,
        } : undefined,
      }));

      // Compute lowest "Start from" price across all departures.
      // For tiers: use lowest tier price; otherwise fall back to priceOverride.
      const startFromCandidates = tour.departures
        .map((d) => {
          if (d.priceTiers && d.priceTiers.length > 0)
            return getLowestTierPrice(d.priceTiers, d.priceOverride ?? 0)
          return d.priceOverride ?? 0
        })
        .filter((p) => p > 0)
      if (startFromCandidates.length > 0) {
        tour.price = Math.min(...startFromCandidates)
      }
    }
  } catch (error) {
    console.error("Error fetching tour data:", error);
  }

  if (!tour) {
    return (
      <div className="container section-padding">
        <h2>Tour Package Not Found</h2>
        <p>Sorry, we couldn't find the tour package you're looking for.</p>
      </div>
    );
  }

  const firstUpcoming = tour.departures
    .filter((d) => new Date(d.departureDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())[0] ?? null

  return (
    <TourPageProvider initial={firstUpcoming}>
      <Breadcrumbs
        pageTitle={tour.title}
        bgImage={(tour.tourImageThumbnail?.src as string) || "/img/breadcrumb/breadcrumb.jpg"}
      />

      <section className="tour-section section-padding fix">
        <div className="container">

          {/* ── Hero: Slider (left) + Title Info + Availability (right) ── */}
          <div className="row g-4 align-items-start mb-5">

            {/* Slider */}
            <div className="col-lg-7">
              <TourImageSlider images={tour.galleryImages} />
            </div>

            {/* Title Info + Departure Availability */}
            <div className="col-lg-5">
              <div className="tour-hero-info">
                <h6 className="tour-hero-location">
                  <i className="fa-solid fa-location-dot"></i> {tour.locations}
                </h6>
                <h2 className="tour-hero-title">{tour.title}</h2>

                <div className="tour-hero-meta">
                  {tour.price > 0 ? (
                    <span>
                      <i className="fa-solid fa-tag"></i>
                      Start from&nbsp;<strong>IDR {tour.price.toLocaleString('id-ID')}</strong>/Person
                    </span>
                  ) : (
                    <span style={{ color: '#999' }}>
                      Belum ada jadwal tersedia
                    </span>
                  )}
                  {tour.minGroupSize && (
                    <span>
                      <i className="fa-solid fa-users"></i>
                      Min group:&nbsp;<strong>{tour.minGroupSize} pax</strong>
                    </span>
                  )}
                </div>

                <div
                  className="tour-hero-desc"
                  dangerouslySetInnerHTML={{ __html: tour.descriptionHtml }}
                />

                <a href="#departure-dates" className="theme-btn mt-3">
                  Check Availability&nbsp;<i className="fa-solid fa-calendar-check"></i>
                </a>
              </div>

            </div>
          </div>

          {/* ── Full-width Departure Availability ── */}
          <div className="row mb-4" id="departure-dates">
            <div className="col-12">
              <TourDepartureTabs departures={tour.departures} basePrice={tour.price} />
            </div>
          </div>

          {/* ── Main Content + Sidebar ── */}
          <div className="row g-4">

            {/* Main content */}
            <div className="col-lg-8">
              <div className="activities-details-content">
                {tour.highlights.length > 0 && (
                  <TourFeatures
                    features={tour.highlights}
                    heading="Tour Highlights"
                  />
                )}
                <TourFeatures features={tour.features} />
                <TourInfoGrid info={tour.infoGrid} />
                <TourPlanAccordion plan={tour.tourPlan} />
                {tour.itineraryFile && (
                  <div className="mt-4 mb-4">
                    <a
                      href={tour.itineraryFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="theme-btn"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fa-solid fa-file-pdf"></i>
                      Download Itinerary
                    </a>
                  </div>
                )}
                <TourInclusionsExclusions
                  inclusions={tour.inclusions}
                  exclusions={tour.exclusions}
                />
                {tour.mapEmbedSrc && (
                  <div className="map-area">
                    <h3>View in Map</h3>
                    <div className="google-map">
                      <iframe
                        src={tour.mapEmbedSrc}
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="main-bar" id="book-this-tour">
                <TourBookingForm basePrice={tour.price} departures={tour.departures} tourTitle={tour.title} tourCode={tour.tourCode} />
                <WhyBookWithUs />
              </div>
            </div>

          </div>
        </div>
      </section>
    </TourPageProvider>
  );
}