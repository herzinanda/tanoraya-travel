import Image from 'next/image'
import React from 'react'

const AchievementSection = () => {
  return (
    <>
        <section className="achievement-section section-padding fix pb-0">
        <div className="shape-top">
            <Image src="/img/shape/random-top.png" alt="img" />
        </div>
        <div className="shape-bottom">
            <Image src="/img/shape/random-bottom.png" alt="img" />
        </div>
        <div className="container">
            <div className="section-title-area">
                <div className="section-title mb-0">
                    <span className="sub-title wow fadeInUp text-white">
                        Achievement
                    </span>
                    <h2 className=" text-white wow fadeInUp" data-wow-delay=".3s">
                        Ready To Adventure And <br />
                        Enjoy Natural
                    </h2>
                </div>
                <div className="achievement-button wow fadeInUp" data-wow-delay=".7s">
                    <a href="tour-details.html" className="theme-btn">Read More
                        <Image src="/img/icon/white-arrow.svg" alt="img" />
                    </a>
                </div>
            </div>
            <div className="achievement-wrapper">
                <div className="row">
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="achievement-items">
                            <div className="content">
                                <div className="icon">
                                    <Image src="/img/icon/traveller.svg" alt="img" />
                                </div>
                                <h3 className="number">
                                    <span className="count">7684</span>
                                </h3>
                                <h5>Happy Traveller</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="achievement-items">
                            <div className="content">
                                <div className="icon">
                                    <Image src="/img/icon/complete.svg" alt="img" />
                                </div>
                                <h3 className="number"><span className="count">269</span>+</h3>
                                <h5>Tour Completed</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="achievement-items">
                            <div className="content">
                                <div className="icon">
                                    <Image src="/img/icon/reviews.svg" alt="img" />
                                </div>
                                <h3 className="number"><span className="count">99</span>%</h3>
                                <h5>Total Reviews</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                        <div className="achievement-items">
                            <div className="content">
                                <div className="icon">
                                    <Image src="/img/icon/award.svg" alt="img" />
                                </div>
                                <h3 className="number">
                                    <span className="count">2368</span>
                                </h3>
                                <h5>Awards & honors</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default AchievementSection