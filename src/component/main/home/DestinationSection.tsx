import Image from 'next/image'
import React from 'react'

const DestinationSection = () => {
  return (
    <>
        <section className="destination-section section-padding fix">
        <div className="container">
            <div className="section-title text-center">
                <span className="sub-title wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp"}}>
                    Best Recommended Places
                </span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    Discover the World's Treasures <br />
                    with Ravelo
                </h2>
            </div>
            <div className="swiper destination-slider">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="destination-card-items">
                            <div className="destination-thumb">
                                <Image src="/img/destinations/1.jpg" alt="" width={307} height={250} />
                                <div className="ratting">
                                    <i className="fa-solid fa-star"></i>
                                    <span>4.9</span>
                                </div>
                                <div className="heart">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                            </div>
                            <div className="destination-content">
                                <h4>
                                    <a href="tour-details.html">Ghorepani Poon Hill Trek</a>
                                </h4>
                                <span className="place"><i className="fa-solid fa-location-dot"></i> Bhutan, India,
                                    Pokhara</span>
                                <h5>$400.00<span>/Person</span></h5>
                                <div className="booking">
                                    <span><i className="fa-solid fa-clock"></i> 08 days</span>
                                    <a href="tour-details.html" className="theme-btn">Read More
                                        <Image src="/img/icon/theme-arrow.svg" alt="img" width={22} height={16}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="destination-card-items">
                            <div className="destination-thumb">
                                <Image src="/img/destinations/2.jpg" alt="img" width={307} height={250}/>
                                <div className="ratting">
                                    <i className="fa-solid fa-star"></i>
                                    <span>4.9</span>
                                </div>
                                <div className="heart">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                            </div>
                            <div className="destination-content">
                                <h4>
                                    <a href="tour-details.html">Langtang Valley Trekking</a>
                                </h4>
                                <span className="place"><i className="fa-solid fa-location-dot"></i> Bhutan, India, Tibet</span>
                                <h5>$600.00<span>/Person</span></h5>
                                <div className="booking">
                                    <span><i className="fa-solid fa-clock"></i> 10 days</span>
                                    <a href="tour-details.html" className="theme-btn">Read More
                                        <Image src="/img/icon/theme-arrow.svg" alt="img" width={22} height={16}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="destination-card-items">
                            <div className="destination-thumb">
                                <Image src="/img/destinations/3.jpg" alt="img" width={307} height={250}/>
                                <div className="ratting">
                                    <i className="fa-solid fa-star"></i>
                                    <span>4.9</span>
                                </div>
                                <div className="heart">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                            </div>
                            <div className="destination-content">
                                <h4>
                                    <a href="tour-details.html">Short Trek around Pokhara</a>
                                </h4>
                                <span className="place"><i className="fa-solid fa-location-dot"></i> Nepal, Pokhara,
                                    Tibet</span>
                                <h5>$300.00<span>/Person</span></h5>
                                <div className="booking">
                                    <span><i className="fa-solid fa-clock"></i> 07 days</span>
                                    <a href="tour-details.html" className="theme-btn">Read More
                                        <Image src="/img/icon/theme-arrow.svg" alt="img" width={22} height={16}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="destination-card-items">
                            <div className="destination-thumb">
                                <Image src="/img/destinations/4.jpg" alt="img" width={307} height={250}/>
                                <div className="ratting">
                                    <i className="fa-solid fa-star"></i>
                                    <span>4.9</span>
                                </div>
                                <div className="heart">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                            </div>
                            <div className="destination-content">
                                <h4>
                                    <a href="tour-details.html">Island Peak Climbing</a>
                                </h4>
                                <span className="place"><i className="fa-solid fa-location-dot"></i> Bhutan, India,
                                    Pokhara</span>
                                <h5>$200.00<span>/Person</span></h5>
                                <div className="booking">
                                    <span><i className="fa-solid fa-clock"></i> 03 days</span>
                                    <a href="tour-details.html" className="theme-btn">Read More
                                        <Image src="/img/icon/theme-arrow.svg" alt="img" width={22} height={16}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-dot4 mt-5">
                <div className="dot"></div>
            </div>
        </div>
    </section>
    </>
  )
}

export default DestinationSection