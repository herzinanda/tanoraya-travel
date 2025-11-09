import Image from 'next/image'
import React from 'react'

const TestimonialSection = () => {
  return (
    <>
        <section className="testimonial-section section-padding fix">
        <div className="container">
            <div className="section-title-area">
                <div className="section-title">
                    <span className="sub-title wow fadeInUp">
                        Testimonial
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                        What Our Clients Say
                    </h2>
                </div>
                <div className="about-button wow fadeInUp" data-wow-delay=".7s">
                    <a href="contact.html" className="theme-btn">Read More
                        <Image src="/img/icon/white-arrow.svg" alt="img" width={22} height={16}/>
                    </a>
                </div>
            </div>
            <div className="swiper testimonial-slider">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="testimonial-main-item">
                            <div className="top-shape">
                                <Image src="/img/testimonial/shape1.png" alt="img" width={420} height={199}/>
                            </div>
                            <div className="testimonial-card-item">
                                <div className="polygon-shape">
                                    <Image src="/img/testimonial/shape2.png" alt="img" width={44} height={38}/>
                                </div>
                                <div className="testimonial-content">
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>
                                        "Incredible customer service attention to detail. Express Travel truly goes
                                        above and beyond to ensure their clients have a memorable experience. Can't wait
                                        to travel with them again!"
                                    </p>
                                    <div className="info-item">
                                        <div className="content">
                                            <h4>New York, NY</h4>
                                        </div>
                                        <div className="icon">
                                            <Image src="/img/icon/qoute.svg" alt="img" width={29} height={16}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="client-info-item">
                                <div className="client-image">
                                    <Image src="/img/testimonial/3.png" alt="img" width={60} height={60}/>
                                </div>
                                <div className="info-text">
                                    <h4>
                                        Benjamin Carter
                                    </h4>
                                    <span>
                                        Ceo & Owner
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="testimonial-main-item">
                            <div className="top-shape">
                                <Image src="/img/testimonial/shape1.png" alt="img" width={420} height={199}/>
                            </div>
                            <div className="testimonial-card-item">
                                <div className="polygon-shape">
                                    <Image src="/img/testimonial/shape2.png" alt="img" width={44} height={38}/>
                                </div>
                                <div className="testimonial-content">
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>
                                        "Incredible customer service attention to detail. Express Travel truly goes
                                        above and beyond to ensure their clients have a memorable experience. Can't wait
                                        to travel with them again!"
                                    </p>
                                    <div className="info-item">
                                        <div className="content">
                                            <h4>New York, NY</h4>
                                        </div>
                                        <div className="icon">
                                            <Image src="/img/icon/qoute.svg" alt="" width={29} height={16}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="client-info-item">
                                <div className="client-image">
                                    <Image src="/img/testimonial/4.png" alt="img" width={60} height={60}/>
                                </div>
                                <div className="info-text">
                                    <h4>Lucas Thompson</h4>
                                    <span>Ceo & Owner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="testimonial-main-item">
                            <div className="top-shape">
                                <Image src="/img/testimonial/shape1.png" alt="img" width={420} height={199}/>
                            </div>
                            <div className="testimonial-card-item">
                                <div className="polygon-shape">
                                    <Image src="/img/testimonial/shape2.png" alt="img" width={44} height={38}/>
                                </div>
                                <div className="testimonial-content">
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>
                                        "Incredible customer service attention to detail. Express Travel truly goes
                                        above and beyond to ensure their clients have a memorable experience. Can't wait
                                        to travel with them again!"
                                    </p>
                                    <div className="info-item">
                                        <div className="content">
                                            <h4>New York, NY</h4>
                                        </div>
                                        <div className="icon">
                                            <Image src="/img/icon/qoute.svg" alt="" width={29} height={16}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="client-info-item">
                                <div className="client-image">
                                    <Image src="/img/testimonial/5.png" alt="img" width={60} height={60}/>
                                </div>
                                <div className="info-text">
                                    <h4>Elena Gordon</h4>
                                    <span>Ceo & Owner</span>
                                </div>
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

export default TestimonialSection