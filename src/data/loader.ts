import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const BASE_URL = getStrapiURL();

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            heroImages: {
              fields: ["url", "alternativeText"],
            },
            ctaPrimary: true,
            ctaSecondary: true,
          },
        },
        "blocks.home-about": {
          populate: {
            aboutImages: {
              fields: ["url", "alternativeText"],
            },
            ctaAbout: true,
          },
        },
        "blocks.home-activities": {
          populate: "*"
        },
        "blocks.home-destinations": {
          populate: "*"
        },
        "blocks.why-choose-us": {
          populate: {
            Images: {
              fields: ["url", "alternativeText"],
            },
            whyChooseUsItem: true,
          },
        },
        "blocks.home-best-recommended-place": {
          populate: "*"
        },
        "blocks.home-cta": {
          populate: {
            ctaButton: true,
            bgImage: {
              fields: ["url", "alternativeText"],
            },
          }
        },
        "blocks.home-testimonials": {
          populate: {
            button: true,
          }
        },
        "blocks.home-blog": {
          populate: "*"
        },
      },
    },
  },
});

export async function getHomePage() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  return fetchAPI(url.href, { method: "GET" });
}

export async function getDestinations() {
  const query = qs.stringify({
    populate: "*",
    status: "published",
  });

  const path = `/api/destinations?${query}`;
  const url = new URL(path, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getDestinationsByIds(documentIds: string[]) {
  if (!documentIds.length) return null;
  const query = qs.stringify({
    populate: {
      destinationImages: { fields: ["url", "alternativeText"] },
      tour_packages: { count: true },
    },
    filters: { documentId: { $in: documentIds } },
    fields: ["documentId", "title", "destinationUrl"],
    status: "published",
    pagination: { pageSize: documentIds.length },
  });
  const url = new URL(`/api/destinations?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getTourPackages({
  destinationSlug,
  search,
  minDays,
  maxDays,
  pageSize = 8,
}: {
  destinationSlug?: string;
  search?: string;
  minDays?: number;
  maxDays?: number;
  pageSize?: number;
} = {}) {
  const filters: Record<string, unknown> = {};
  if (destinationSlug) {
    filters.destination = { destinationUrl: { $eq: destinationSlug } };
  }
  if (search?.trim()) {
    filters.title = { $containsi: search.trim() };
  }
  if (minDays !== undefined || maxDays !== undefined) {
    filters.duration = {
      ...(minDays !== undefined && { $gte: minDays }),
      ...(maxDays !== undefined && { $lte: maxDays }),
    };
  }

  const query = qs.stringify({
    populate: {
      tourImageThumbnail: {
        fields: ["url", "alternativeText"],
      },
      destination: {
        fields: ["title", "destinationUrl"],
      },
      tour_departures: {
        fields: ["departureDate", "priceOverride", "statusValue", "availableSeats"],
      },
    },
    fields: ["documentId", "title", "slug", "isFeatured"],
    status: "published",
    ...(Object.keys(filters).length > 0 && { filters }),
    pagination: { pageSize },
  });

  const path = `/api/tour-packages?${query}`;
  const url = new URL(path, BASE_URL);
  return fetchAPI(url.href, { method: "GET" });
}

export async function getArticles({
  page = 1,
  pageSize = 9,
}: { page?: number; pageSize?: number } = {}) {
  const query = qs.stringify({
    populate: {
      coverImage: { fields: ["url", "alternativeText"] },
    },
    fields: ["documentId", "title", "slug", "excerpt", "author", "category", "readTime", "publishedAt"],
    sort: "publishedAt:DESC",
    status: "published",
    pagination: { page, pageSize },
  });

  const url = new URL(`/api/blog-posts?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET" });
}

export async function getRelatedArticles(category: string, excludeSlug: string) {
  const query = qs.stringify({
    filters: {
      category: { $eq: category },
      slug: { $ne: excludeSlug },
    },
    populate: {
      coverImage: { fields: ["url", "alternativeText"] },
    },
    fields: ["documentId", "title", "slug", "publishedAt", "readTime"],
    sort: "publishedAt:DESC",
    status: "published",
    pagination: { pageSize: 4 },
  });

  const url = new URL(`/api/blog-posts?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET" });
}

export async function getArticleBySlug(slug: string) {
  const query = qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      coverImage: { fields: ["url", "alternativeText"] },
    },
    status: "published",
  });

  const url = new URL(`/api/blog-posts?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET" });
}

export async function getActivities() {
  const query = qs.stringify({
    populate: {
      activityIcon: { fields: ["url", "alternativeText"] },
    },
    status: "published",
  });

  const path = `/api/activities?${query}`;
  const url = new URL(path, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getFAQs() {
  const query = qs.stringify({
    fields: ['question', 'answer', 'category', 'order'],
    filters: { isActive: { $eq: true } },
    sort: ['order:asc', 'createdAt:asc'],
    status: 'published',
    pagination: { pageSize: 100 },
  });
  const url = new URL(`/api/faqs?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: 'GET', next: { revalidate: 3600 } });
}

export async function getPrivacyPolicy() {
  const query = qs.stringify({ fields: ['content', 'lastUpdated'] });
  const url = new URL(`/api/privacy-policy?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: 'GET', next: { revalidate: 3600 } });
}

export async function getTermsOfUse() {
  const query = qs.stringify({ fields: ['content', 'lastUpdated'] });
  const url = new URL(`/api/terms-of-use?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: 'GET', next: { revalidate: 3600 } });
}

export async function getActivePromo() {
  const query = qs.stringify({
    populate: {
      image: { fields: ['url', 'alternativeText'] },
    },
    fields: ['title', 'subtitle', 'description', 'badge', 'ctaLabel', 'ctaUrl', 'isActive', 'expiresAt'],
    status: 'published',
  });
  const url = new URL(`/api/promo-popup?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: 'GET', next: { revalidate: 300 } });
}

export async function getTourBySlug(slug: string) {
  const query = qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: '*',
    status: 'published',
  })

  const path = `/api/tour-packages?${query}`
  const url = new URL(path, BASE_URL)
  return fetchAPI(url.href, { method: 'GET' })
}

export async function getTopDestinationsForNav() {
  const query = qs.stringify({
    populate: {
      destinationImages: { fields: ["url"] },
      tour_packages: { count: true },
    },
    fields: ["title", "destinationUrl"],
    status: "published",
    pagination: { pageSize: 50 },
  });
  const url = new URL(`/api/destinations?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getLatestFeaturedTourForNav() {
  const query = qs.stringify({
    populate: {
      tourImageThumbnail: { fields: ["url"] },
    },
    fields: ["title", "slug", "Price"],
    filters: { isFeatured: { $eq: true } },
    sort: "publishedAt:DESC",
    status: "published",
    pagination: { pageSize: 1 },
  });
  const url = new URL(`/api/tour-packages?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getMinDeparturePriceForTour(tourSlug: string) {
  const query = qs.stringify({
    filters: { tour_package: { slug: { $eq: tourSlug } } },
    fields: ["priceOverride"],
    pagination: { pageSize: 100 },
  });
  const url = new URL(`/api/tour-departures?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getLatestTourForNav() {
  const query = qs.stringify({
    populate: {
      tourImageThumbnail: { fields: ["url"] },
    },
    fields: ["title", "slug", "Price"],
    sort: "publishedAt:DESC",
    status: "published",
    pagination: { pageSize: 1 },
  });
  const url = new URL(`/api/tour-packages?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getAboutPage() {
  const query = qs.stringify({
    populate: {
      blocks: {
        on: {
          "blocks.about-hero": {
            populate: {
              aboutImages: { fields: ["url", "alternativeText"] },
              ctaAbout: true,
            },
          },
          "blocks.achievement": {
            populate: {
              achievementItems: true,
              achievementCTAButton: true,
            },
          },
          "blocks.why-choose-us": {
            populate: {
              Images: { fields: ["url", "alternativeText"] },
              whyChooseUsItem: true,
            },
          },
          "blocks.home-testimonials": {
            populate: {
              testimonialItems: {
                populate: {
                  avatar: { fields: ["url", "alternativeText"] },
                },
              },
              button: true,
            },
          },
        },
      },
    },
  });
  const url = new URL(`/api/about-page?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getDestinationPage() {
  const query = qs.stringify({
    populate: {
      heroBgImage: { fields: ["url", "alternativeText"] },
    },
  });

  const url = new URL(`/api/destination-page?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getBlogPage() {
  const query = qs.stringify({
    populate: {
      breadcrumbImage: { fields: ["url", "alternativeText"] },
    },
  });

  const url = new URL(`/api/blog-page?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getTourPage() {
  const query = qs.stringify({
    populate: {
      breadcrumbImage: { fields: ["url", "alternativeText"] },
      seo: {
        populate: {
          meta_image: { fields: ["url", "alternativeText"] },
        },
      },
    },
  });

  const url = new URL(`/api/tour-page?${query}`, BASE_URL);
  return fetchAPI(url.href, { method: "GET", next: { revalidate: 3600 } });
}

export async function getTourDepartures(tourSlug: string) {
  const query = qs.stringify({
    filters: {
      tour_package: { slug: { $eq: tourSlug } },
    },
    populate: {
      variant: {
        populate: {
          itinerary: { populate: '*' },
          tour_facilities: true,
        },
      },
    },
    pagination: { pageSize: 50 },
  })

  const path = `/api/tour-departures?${query}`
  const url = new URL(path, BASE_URL)
  return fetchAPI(url.href, { method: 'GET' })
}
