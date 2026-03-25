import Button from "@/component/main/ui/Button";
import Image from "next/image";
import type { HomeAboutProps } from "@/types";
import { StrapiImage } from "./StrapiImage";

const AboutSection = ({
  title,
  subtitle,
  aboutText,
  ctaAbout,
  aboutImages,
}: Readonly<HomeAboutProps>) => {
  const images = aboutImages || [];

  return (
    <section className="about-section section-padding fix">
      <div className="container">
        <div className="about-wrapper">
          <div className="row g-4">
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="about-left-image">
                {images[0] && (
                  <StrapiImage
                    src={images[0].url}
                    alt={images[0].alternativeText || "About image 1"}
                    className="wow img-custom-anim-left"
                    width={306}
                    height={380}
                  />
                )}
                <div className="about-image-2">
                  {images[1] && (
                    <StrapiImage
                      src={images[1].url}
                      alt={images[1].alternativeText || "About image 2"}
                      className="wow img-custom-anim-left"
                      width={203}
                      height={203}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">{subtitle}</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    {title}
                  </h2>
                </div>
                <p className="mt-4 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                  {aboutText}
                </p>
                <div className="about-button wow fadeInUp" data-wow-delay=".7s">
                  <Button href="/about">Read More</Button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="about-right-image">
                {images[2] && (
                  <StrapiImage
                    src={images[2].url}
                    alt={images[2].alternativeText || "About image 1"}
                    className="wow img-custom-anim-left"
                    width={306}
                    height={380}
                  />
                )}
                <div className="about-image-2">
                  {images[3] && (
                    <StrapiImage
                      src={images[3].url}
                      alt={images[3].alternativeText || "About image 2"}
                      className="wow img-custom-anim-left"
                      width={203}
                      height={203}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
