import Image from "next/image";
import React from "react";

const TeamSection = () => {
  return (
    <>
      <section className="team-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <span className="sub-title wow fadeInUp">Meet with Guide</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Travel Specialist
            </h2>
          </div>
          <div className="row">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div className="team-items">
                <div className="team-image">
                  <Image src="/img/team/1.jpg" alt="img" />
                  <div className="team-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h4>
                    <a href="team-details.html">Michel Smith</a>
                  </h4>
                  <p>Tourist Guide</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div className="team-items">
                <div className="team-image">
                  <Image src="/img/team/2.jpg" alt="img" />
                  <div className="team-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h4>
                    <a href="team-details.html">Leslie Alexander</a>
                  </h4>
                  <p>Tourist Guide</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div className="team-items">
                <div className="team-image">
                  <Image src="/img/team/3.jpg" alt="img" />
                  <div className="team-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h4>
                    <a href="team-details.html">JR Shawon</a>
                  </h4>
                  <p>Tourist Guide</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay=".8s"
            >
              <div className="team-items">
                <div className="team-image">
                  <Image src="/img/team/4.jpg" alt="img" />
                  <div className="team-social">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-content">
                  <h4>
                    <a href="team-details.html">Smith Kong</a>
                  </h4>
                  <p>Tourist Guide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
