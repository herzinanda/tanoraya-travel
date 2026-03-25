import type { Block } from "@/types";

import AboutSection from "./home/AboutSection";
import HeroSection from "./home/HeroSection";
import ServiceSection from "./home/ServiceSection";
import WhyChooseUs from "./home/WhyChooseUs";
import TopDestinationsSection from "./home/TopDestinationsSection";

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
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}