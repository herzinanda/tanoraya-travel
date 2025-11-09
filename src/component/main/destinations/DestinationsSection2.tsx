import Image from "next/image";
import React from "react";

const DestinationsSection2 = () => {
  return (
    <>
      <section className="destination-section2 section-padding fix">
        <div className="container">
          <div className="section-title text-center">
            <span className="sub-title wow fadeInUp">
              We Care About Your Happiness
            </span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              We Are Your Gateway <br /> to Adventure
            </h2>
          </div>
          <div className="row g-4 section-padding">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/5.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">Thailand</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/6.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">Manhattan</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/7.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">Pearland</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/26.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">Maldives</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/9.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">Switzerland</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="destination-card-items2 mt-0">
                <div className="thumb">
                  <Image
                    src="/img/destinations/10.jpg"
                    alt=""
                    width={420}
                    height={460}
                  />
                  <div className="destination-content">
                    <div className="content">
                      <p>Travel To</p>
                      <h3>
                        <a href="destination-details.html">United Kingdom</a>
                      </h3>
                    </div>
                    <span className="style-2">1 Tour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationsSection2;
