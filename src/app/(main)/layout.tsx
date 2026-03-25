import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import Header from "@/component/main/layout/Header";
import Footer from "@/component/main/layout/Footer";
import SearchArea from "@/component/main/layout/SearchArea";
import OffcanvasMenu from "@/component/main/layout/OffcanvasMenu";
import FloatingWhatsApp from "@/component/main/shared/FloatingWhatsApp";
import PageTransition from "@/component/main/shared/PageTransition";

import {
  logo,
  contactInfo,
  socialLinks,
  navItems as baseNavItems,
  ctaButton,
} from "@/data/headerData";
import {
  getTopDestinationsForNav,
  getLatestFeaturedTourForNav,
  getLatestTourForNav,
  getMinDeparturePriceForTour,
} from "@/data/loader";
import { getStrapiMedia } from "@/component/main/home/StrapiImage";
import type { NavItem } from "@/types/index";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch nav mega-menu data in parallel (errors are silently swallowed so the
  // layout never breaks if Strapi is unavailable).
  const [destinationsRes, featuredTourRes] = await Promise.allSettled([
    getTopDestinationsForNav(),
    getLatestFeaturedTourForNav(),
  ]);

  const rawDestinations =
    destinationsRes.status === "fulfilled"
      ? (destinationsRes.value?.data ?? [])
      : [];

  // Sort destinations by tour package count (desc), take top 3
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topDestinations = [...rawDestinations]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .sort((a: any, b: any) => {
      const countA = a.tour_packages?.count ?? 0;
      const countB = b.tour_packages?.count ?? 0;
      return countB - countA;
    })
    .slice(0, 3)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((d: any) => ({
      id: d.documentId as string,
      title: d.title as string,
      slug: d.destinationUrl as string,
      imageUrl: getStrapiMedia(d.destinationImages?.url ?? null),
      tourCount: d.tour_packages?.count as number | undefined,
    }));

  // If isFeatured query returned nothing, fall back to the latest published tour
  let rawFeaturedTour =
    featuredTourRes.status === "fulfilled"
      ? (featuredTourRes.value?.data?.[0] ?? null)
      : null;

  if (!rawFeaturedTour) {
    const fallback = await getLatestTourForNav().catch(() => null);
    rawFeaturedTour = fallback?.data?.[0] ?? null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = rawFeaturedTour as any;
  let featuredTour = raw
    ? {
        id: raw.documentId as string,
        title: raw.title as string,
        slug: raw.slug as string,
        price: (raw.Price as number | null) ?? null,
        imageUrl: getStrapiMedia(raw.tourImageThumbnail?.url ?? null),
      }
    : null;

  // Replace price with lowest departure priceOverride if available
  if (featuredTour?.slug) {
    const depRes = await getMinDeparturePriceForTour(featuredTour.slug).catch(
      () => null
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prices: number[] = (depRes?.data ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => d.priceOverride)
      .filter((p: unknown): p is number => typeof p === "number" && p > 0);
    if (prices.length > 0) {
      featuredTour = { ...featuredTour, price: Math.min(...prices) };
    }
  }

  // Inject mega menu into the "tour-packages" nav item
  const navItems: NavItem[] = baseNavItems.map((item) => {
    if (item.id === "tour-packages") {
      return {
        ...item,
        subMenu: undefined,
        megaMenu: { topDestinations, featuredTour },
      };
    }
    return item;
  });

  return (
    <>
      {/* Template CSS */}
      <link rel="stylesheet" href="/css/all.min.css" />
      <link rel="stylesheet" href="/css/animate.css" />
      <link rel="stylesheet" href="/css/magnific-popup.css" />
      <link rel="stylesheet" href="/css/meanmenu.css" />
      <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
      <link rel="stylesheet" href="/css/nice-select.css" />
      <link rel="stylesheet" href="/css/flacticon.css" />
      <link rel="stylesheet" href="/css/main.css" />

      {/* Page Transition */}
      <PageTransition />
      {/* Mouse Cursor */}
      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>
      <OffcanvasMenu />
      <SearchArea />

      {/* Header */}
      <Header
        logo={logo}
        contactInfo={contactInfo}
        socials={socialLinks}
        navItems={navItems}
        ctaButton={ctaButton}
      />

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Template JS */}
      <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/viewport.jquery.js" strategy="beforeInteractive" />
      <Script
        src="/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/js/jquery.nice-select.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.waypoints.js" strategy="lazyOnload" />
      <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
      <Script src="/js/swiper-bundle.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.meanmenu.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="/js/wow.min.js" strategy="lazyOnload" />
      <Script src="/js/main.js" strategy="lazyOnload" />
    </>
  );
}
