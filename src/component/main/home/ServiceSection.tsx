import Image from "next/image";
import Link from "next/link";
import React from "react";
import BrandPartners from "./BrandPartners";

const ServiceSection = () => {
  return (
    <section className="service-section section-padding pb-0 section-bg fix">
      <div className="shape float-bob-y">
        <Image src="/img/shape/plane-2.png" alt="" width={144} height={350} />
      </div>
      <div className="container">
        <div className="service-wrapper">
          <div className="row g-4">
            <div className="col-xl-4">
              <div className="service-content">
                <div className="section-title">
                  <span className="sub-title wow fadeInUp">
                    Our Best Activities
                  </span>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    Explore Exceptional <br /> Travel Benefits
                  </h2>
                </div>
                <p className="wow fadeInUp" data-wow-delay=".5s">
                  Credibly harness client-centric opportunities with <br />{" "}
                  prospective bandwidth
                </p>
                <div className="service-button">
                  <div className="array-button">
                    <button className="array-prev">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="array-next">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="swiper service-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="service-box-item">
                      <div className="icon">
                        <Image
                          src="/img/icon/01.svg"
                          alt="img"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="content">
                        <h3>
                          <Link href="tour-details.html">Tent Camping</Link>
                        </h3>
                        <p>
                          Our personalized itinerarie meticulousl designed to
                          cater to your personalized itineraries are
                          meticulously.
                        </p>
                        <div className="link-btns">
                          <Link href="activities-details.html">
                            View Details
                            <Image
                              src="/img/icon/theme-arrow.svg"
                              alt="img"
                              width={22}
                              height={16}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="service-box-item">
                      <div className="icon">
                        <Image
                          src="/img/icon/02.svg"
                          alt="img"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="content">
                        <h3>
                          <Link href="tour-details.html">Tent Camping</Link>
                        </h3>
                        <p>
                          Our personalized itinerarie meticulousl designed to
                          cater to your personalized itineraries are
                          meticulously.
                        </p>
                        <div className="link-btns">
                          <Link href="activities-details.html">
                            View Details
                            <Image
                              src="/img/icon/theme-arrow.svg"
                              alt="img"
                              width={22}
                              height={16}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="service-box-item">
                      <div className="icon">
                        <Image
                          src="/img/icon/03.svg"
                          alt="img"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="content">
                        <h3>
                          <Link href="tour-details.html">Fishing & Boat</Link>
                        </h3>
                        <p>
                          Our personalized itinerarie meticulousl designed to
                          cater to your personalized itineraries are
                          meticulously.
                        </p>
                        <div className="link-btns">
                          <Link href="activities-details.html">
                            View Details
                            <Image
                              src="/img/icon/theme-arrow.svg"
                              alt="img"
                              width={22}
                              height={16}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BrandPartners />
        
        <div className="service-bottom">
          <div className="content">
            <div className="img">
              <Image
                src="/img/service/1.png"
                alt="img"
                width={180}
                height={60}
              />
            </div>
            <p>Partnering with you to transform your vision into reality.</p>
          </div>
          <div className="about-button wow fadeInUp" data-wow-delay=".7s">
            <Link href="contact.html" className="theme-btn">
              Contact Us Now
              <Image
                src="/img/icon/white-arrow.svg"
                alt="img"
                width={22}
                height={16}
              />
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ServiceSection;
