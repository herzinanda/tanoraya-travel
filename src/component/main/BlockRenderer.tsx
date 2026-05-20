import { Fragment } from "react";
import type { Block } from "@/types";

import AboutSection from "./home/AboutSection";
import HeroSection from "./home/HeroSection";
import SearchDestination from "./home/SearchDestination";
import ServiceSection from "./home/ServiceSection";
import WhyChooseUs from "./home/WhyChooseUs";
import TopDestinationsSection from "./home/TopDestinationsSection";
import DestinationSection from "./home/DestinationSection";
import CTAbgSection from "./home/CTAbgSection";
import TestimonialSection from "./home/TestimonialSection";
import NewsSection from "./home/NewsSection";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return (
        <Fragment key={index}>
          <HeroSection {...block} />
          <section style={{ background: "#f4f6fa", padding: "40px 0 48px" }}>
            <div className="container">
              <SearchDestination />
            </div>
          </section>
        </Fragment>
      );
    case "blocks.home-about":
      return <AboutSection {...block} key={index} />;
    case "blocks.home-activities":
      return <ServiceSection {...block} key={index} />;
    case "blocks.home-destinations":
      return <TopDestinationsSection {...block} key={index} />;
    case "blocks.why-choose-us":
      return <WhyChooseUs {...block} key={index} />;
    case "blocks.home-best-recommended-place":
      return <DestinationSection {...block} key={index} />;
    case "blocks.home-cta":
      return <CTAbgSection {...block} key={index} />;
    case "blocks.home-testimonials":
      return <TestimonialSection {...block} key={index} />;
    case "blocks.home-blog":
      return <NewsSection {...block} key={index} />;
    default:
      return null;
  }
}

const BLOCK_ORDER: Record<string, number> = {
  "blocks.hero-section": 0,
  "blocks.home-about": 1,
  "blocks.home-best-recommended-place": 2,
  "blocks.home-activities": 3,
  "blocks.home-destinations": 4,
  "blocks.why-choose-us": 5,
  "blocks.home-cta": 6,
  "blocks.home-testimonials": 7,
  "blocks.home-blog": 8,
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  const sorted = [...blocks].sort((a, b) => {
    const aOrder = BLOCK_ORDER[a.__component ?? ""] ?? 99;
    const bOrder = BLOCK_ORDER[b.__component ?? ""] ?? 99;

    return aOrder - bOrder;
  });

  return sorted.map((block, index) => blockRenderer(block, index));
}
