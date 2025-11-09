"use client"; // Client component for the booking form's interactive elements

import Button from '@/component/main/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="hero-bottom">
          <div className="booking-list-area section-bg">
            <div className="booking-list style-2">
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
                <h6>Location</h6>
              </div>
              <div className="form">
                <select>
                  <option>Where are you going?</option>
                  <option value="london">london</option>
                  <option value="Munich">Munich</option>
                  <option value="Berlin">Berlin</option>
                  <option value="Maldives">Maldives</option>
                </select>
              </div>
            </div>
            <div className="booking-list">
              <div className="icon">
                <i className="fa-light fa-calendar-days"></i>
                <h6>Check in</h6>
              </div>
              <div className="form">
                <div className="box">
                  <input type="date" id="calendar" name="Add Date" />
                </div>
              </div>
            </div>
            <div className="booking-list">
              <div className="icon">
                <i className="fa-light fa-calendar-days"></i>
                <h6>Check Out</h6>
              </div>
              <div className="form">
                <div className="box">
                  <input type="date" id="calendar2" name="Add Date" />
                </div>
              </div>
            </div>
            <div className="booking-list">
              <div className="form">
                <select>
                  <option>Guests</option>
                  <option value="london">01</option>
                  <option value="Munich">02</option>
                  <option value="Berlin">03</option>
                  <option value="Maldives">04</option>
                </select>
              </div>
            </div>
            <button className="theme-btn" type="submit">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;