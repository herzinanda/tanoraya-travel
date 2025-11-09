import Image from "next/image";
import HeroSection from "../../component/main/home/HeroSection";
import AboutSection from "../../component/main/home/AboutSection";
import ServiceSection from "@/component/main/home/ServiceSection";
import WhyChooseUs from "@/component/main/home/WhyChooseUs";
import DestinationSection from "@/component/main/home/DestinationSection";
import CTAbgSection from "@/component/main/home/CTAbgSection";
import TestimonialSection from "@/component/main/home/TestimonialSection";
import CTAbgSection2 from "@/component/main/home/CTAbgSection2";
import NewsSection from "@/component/main/home/NewsSection";
import TopDestionationsSection from "@/component/main/home/TopDestionationsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <TopDestionationsSection />
      <WhyChooseUs />
      <DestinationSection />
      <CTAbgSection />
      <TestimonialSection />
      <CTAbgSection2 />
      <NewsSection />
    </>
  );
}
