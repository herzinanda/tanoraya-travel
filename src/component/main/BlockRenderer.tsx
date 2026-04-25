import type { Block } from "@/types";

import AboutSection from "./home/AboutSection";
import HeroSection from "./home/HeroSection";
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
      return <HeroSection {...block} key={index} />;
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

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
