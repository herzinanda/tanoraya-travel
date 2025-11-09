import Image from "next/image";
import React from "react";

const NewsSection = () => {
  return (
    <>
      <section className="news-section section-padding fix">
        <div className="container">
          <div className="section-title text-center">
            <span className="sub-title wow fadeInUp">News & Updates</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Our Latest News & Articles
            </h2>
          </div>
          <div className="row">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="news-items">
                <div className="news-image">
                  <Image src="/img/news/1.jpg" alt="img" width={420} height={450}/>
                  <div className="news-content">
                    <h4>
                      <a href="news-details.html">
                        Enrich Your Mind Envision Your Future Education for
                        Success
                      </a>
                    </h4>
                    <div className="author-items">
                      <div className="author-img">
                        <Image src="/img/news/4.png" alt="img" width={40} height={40}/>
                      </div>
                      <div className="author-info">
                        <h6>Benjamin Carter</h6>
                        <span>September 6, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="news-items">
                <div className="news-image">
                  <Image src="/img/news/2.jpg" alt="img" width={420} height={450}/>
                  <div className="news-content">
                    <h4>
                      <a href="news-details.html">
                        The Joys of Solo Travel: Embracing Independence and
                        Discovery
                      </a>
                    </h4>
                    <div className="author-items">
                      <div className="author-img">
                        <Image src="/img/news/5.png" alt="img" width={40} height={40}/>
                      </div>
                      <div className="author-info">
                        <h6>Benjamin Carter</h6>
                        <span>September 6, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="news-items">
                <div className="news-image">
                  <Image src="/img/news/3.jpg" alt="img" width={420} height={450}/>
                  <div className="news-content">
                    <h4>
                      <a href="news-details.html">
                        A Taste of Paradise: Exploring the Stunning Beaches of
                        Brazil
                      </a>
                    </h4>
                    <div className="author-items">
                      <div className="author-img">
                        <Image src="/img/news/6.png" alt="img" width={40} height={40}/>
                      </div>
                      <div className="author-info">
                        <h6>Benjamin Carter</h6>
                        <span>September 6, 2024</span>
                      </div>
                    </div>
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

export default NewsSection;
