"use client"; // Client component for the booking form's interactive elements

import Button from '@/component/main/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import SearchDestination from './SearchDestination';

const HeroSection = () => {
  return (
    <section className="hero-section bg-cover" style={{ backgroundImage: 'url(/img/hero/bg.jpg)' }}>
      <div className="shape float-bob-x">
        <Image src="/img/shape/plane-1.png" alt="shape" width={230} height={336} />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="hero-wrapper">
              <div className="section-title">
                <span className="sub-title wow fadeInUp">
                  Experience Unmatched Delight With Us.
                </span>
                <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
                  Where Exceptional <br /> Memories Begin
                </h1>
              </div>
              <div className="hero-button wow fadeInUp" data-wow-delay=".7s">
                <Button href="/contact">Let&apos;s Get Started</Button>
                <Button href="/tour-details" variant="style-2">Discover More</Button>
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