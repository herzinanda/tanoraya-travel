"use client"; // Client component for the booking form's interactive elements

import Button from "@/component/main/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SearchDestination from "./SearchDestination";
import type { HeroSectionProps } from "@/types";
import { getStrapiMedia } from "./StrapiImage";

const HeroSection = ({
  title,
  subtitle,
  heroImages,
  ctaPrimary,
  ctaSecondary,
}: Readonly<HeroSectionProps>) => {

  const bgImage = heroImages && heroImages.length > 0 ? heroImages[0] : null;

  const imageUrl = bgImage ? getStrapiMedia(bgImage.url) : "";

  return (
    <section
      className="hero-section bg-cover"
      style={{ backgroundImage: imageUrl ? `url('${imageUrl}')` : undefined }}
    >
      <div className="shape float-bob-x">
        <Image
          src="/img/shape/plane-1.png"
          alt="shape"
          width={230}
          height={336}
        />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="hero-wrapper">
              <div className="section-title">
                <span className="sub-title wow fadeInUp">{subtitle}</span>
                <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                  {title}
                </h1>
              </div>
              <div className="hero-button wow fadeInUp" data-wow-delay=".7s">
                {ctaPrimary && (
                  <Button href={ctaPrimary.url}>{ctaPrimary.text}</Button>
                )}

                {ctaSecondary && (
                  <Button href={ctaSecondary.url} variant="style-2">
                    {ctaSecondary.text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <SearchDestination />
      </div>
    </section>
  );
};

export default HeroSection;
