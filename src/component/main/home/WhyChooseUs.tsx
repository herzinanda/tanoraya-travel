import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhyChooseUs = () => {
  return (
    <>
        <section className="choose-us-section section-padding fix section-bg">
        <div className="left-shape float-bob-x">
            <Image src="/img/shape/plane-3.png" alt="img" width={370} height={205} />
        </div>
        <div className="dot-shape">
            <Image src="/img/shape/dot-1.png" alt="img" width={133} height={177} />
        </div>
        <div className="right-shape">
            <Image src="/img/choose-us/shape1.png" alt="img" width={743} height={1080} />
        </div>
        <div className="container">
            <div className="choose-us-wrapper">
                <div className="row g-4">
                    <div className="col-xl-7 col-lg-6">
                        <div className="chose-us-image">
                            <Image src="/img/choose-us/choose-1.jpg" alt="img" className="wow img-custom-anim-left" width={420} height={450} />
                            <div className="chose-us-image2">
                                <Image src="/img/choose-us/choose-2.jpg" alt="" width={225} height={320}/>
                            </div>
                            <div className="chose-us-image3">
                                <Image src="/img/choose-us/choose-3.jpg" alt="" width={338} height={320}/>
                                <Link href="https://www.youtube.com/watch?v=LhRXf-yEQqA"
                                    className="video-btn ripple video-popup">
                                    <i className="fas fa-play"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="choose-us-content">
                            <div className="section-title mb-0">
                                <span className="sub-title wow fadeInUp">
                                    Why Choose Us
                                </span>
                                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                    Get The Best Travel Experience
                                </h2>
                            </div>
                            <div className="choose-us-area">
                                <div className="line-image">
                                    <Image src="/img/shape/line-shape.png" alt="" width={2} height={192} />
                                </div>
                                <div className="choose-us-items wow fadeInUp" data-wow-delay=".2s">
                                    <h3 className="number">01</h3>
                                    <div className="content">
                                        <h4>Enjoy a trip that fits your lifestyle.</h4>
                                        <p>Holisticly optimize proactive strategic theme areas rather than effective
                                            manufactured products create.
                                        </p>
                                    </div>
                                </div>
                                <div className="choose-us-items wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="number">02</h3>
                                    <div className="content">
                                        <h4>Travel With More Confidence</h4>
                                        <p>Holisticly optimize proactive strategic theme areas rather than effective
                                            manufactured products create.
                                        </p>
                                    </div>
                                </div>
                                <div className="choose-us-items wow fadeInUp mb-0" data-wow-delay=".5s">
                                    <h3 className="number">03</h3>
                                    <div className="content">
                                        <h4>See What you really Get form us</h4>
                                        <p>Holisticly optimize proactive strategic theme areas rather than effective
                                            manufactured products create.
                                        </p>
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
  )
}

export default WhyChooseUs