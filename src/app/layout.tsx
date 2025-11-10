import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Dancing_Script, Manrope } from "next/font/google";
import "./(main)/globals.css";
import Script from "next/script";
import Header from "@/component/main/layout/Header";
import Footer from "@/component/main/layout/Footer";
import SearchArea from "@/component/main/layout/SearchArea";
import OffcanvasMenu from "@/component/main/layout/OffcanvasMenu";

import {
  logo,
  contactInfo,
  socialLinks,
  navItems,
  ctaButton,
} from "@/data/headerData";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tanoraya Travel",
  description:
    "Explore the world with Tanoraya Travel - Your gateway to unforgettable journeys and adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/img/favicon.svg" />

        {/* Template CSS */}
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/meanmenu.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/flacticon.css" />
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body className={`${manrope.variable} ${dancingScript.variable}`}>
        {/* Preloader */}

        {/* <PreLoader /> */}
        {/* Mouse Cursor (Optional, JS-heavy) */}
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
        {/* main.js is last as it depends on the others */}
        <Script src="/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
