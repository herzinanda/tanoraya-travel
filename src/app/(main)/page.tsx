import Image from "next/image";
import HeroSection from "../../component/main/home/HeroSection";
import AboutSection from "../../component/main/home/AboutSection";
import PreLoader from "../../component/main/layout/PreLoader";
import OffcanvasMenu from "@/component/main/layout/OffcanvasMenu";
import SearchArea from "@/component/main/layout/SearchArea";
import ServiceSection from "@/component/main/home/ServiceSection";
import WhyChooseUs from "@/component/main/home/WhyChooseUs";
import DestinationSection from "@/component/main/home/DestinationSection";
import AchievementSection from "@/component/main/home/AchievementSection";
import TeamSection from "@/component/main/home/TeamSection";
import CTAbgSection from "@/component/main/home/CTAbgSection";
import TestimonialSection from "@/component/main/home/TestimonialSection";
import CTAbgSection2 from "@/component/main/home/CTAbgSection2";
import NewsSection from "@/component/main/home/NewsSection";
import TopDestionationsSection from "@/component/main/home/TopDestionationsSection";

export default function Home() {
  return (
    <>
      {/* <PreLoader /> */}
      {/* Mouse Cursor (Optional, JS-heavy) */}
      <div className="mouse-cursor cursor-outer"></div>
      <div className="mouse-cursor cursor-inner"></div>
      <OffcanvasMenu />
      <SearchArea />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <TopDestionationsSection />
      <WhyChooseUs />
      <DestinationSection />
      {/* <AchievementSection />
      <TeamSection /> */}
      <CTAbgSection />
      <TestimonialSection />
      <CTAbgSection2 />
      <NewsSection />
    </>
  );
}
