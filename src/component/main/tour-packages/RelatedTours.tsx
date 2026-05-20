import Link from "next/link";
import Image from "next/image";
import { getTourPackages } from "@/data/loader";
import { mapTourCard, formatPrice, type TourCard } from "@/utils/map-tour-card";
import { StrapiImage } from "@/component/main/home/StrapiImage";

type Props = {
  currentSlug: string;
  destinationSlug?: string;
};

async function fetchRelated(currentSlug: string, destinationSlug?: string) {
  // 1. Try same-destination first
  if (destinationSlug) {
    const res = await getTourPackages({ destinationSlug, pageSize: 10 });
    const tours: TourCard[] = ((res?.data ?? []) as unknown[])
      .map(mapTourCard)
      .filter((t: TourCard) => t.slug !== currentSlug)
      .slice(0, 3);

    if (tours.length > 0) return tours;
  }

  // 2. Fall back to any published tours
  const res = await getTourPackages({ pageSize: 10 });

  const tours: TourCard[] = ((res?.data ?? []) as unknown[])
    .map(mapTourCard)
    .filter((t: TourCard) => t.slug !== currentSlug)
    .slice(0, 3);

  return tours;
}

export default async function RelatedTours({
  currentSlug,
  destinationSlug,
}: Props) {
  const tours = await fetchRelated(currentSlug, destinationSlug);

  if (tours.length === 0) return null;

  return (
    <section className="related-tours-section section-padding section-bg fix">
      <div className="container">
        {/* Section header */}
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">Explore More</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            You May Also Like
          </h2>
        </div>

        {/* Tour cards */}
        <div className="row g-4">
          {tours.map((tour, i) => (
            <div
              key={tour.id}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${(i + 1) * 0.2}s`}
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
                  {tour.isFeatured && (
                    <div className="dest-badge">
                      <i className="fa-solid fa-star" />
                      Featured
                    </div>
                  )}
                </div>

                <div className="destination-content">
                  <h4>
                    <Link href={`/tour-packages/${tour.slug}`}>
                      {tour.title}
                    </Link>
                  </h4>

                  {tour.location && (
                    <span className="place">
                      <i className="fa-solid fa-location-dot" /> {tour.location}
                    </span>
                  )}

                  {tour.price !== null ? (
                    <h5>
                      <span style={{ fontSize: "0.75em", fontWeight: 400 }}>
                        Start from{" "}
                      </span>
                      {formatPrice(tour.price)}
                      <span>/Person</span>
                    </h5>
                  ) : (
                    <h5 style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                      Contact us for pricing
                    </h5>
                  )}

                  <div className="booking">
                    <Link
                      href={`/tour-packages/${tour.slug}`}
                      className="theme-btn"
                    >
                      View Tour{" "}
                      <Image
                        src="/img/icon/theme-arrow.svg"
                        alt=""
                        width={22}
                        height={16}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
