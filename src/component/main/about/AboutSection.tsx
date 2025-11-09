import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AboutSection = () => {
  return (
    <>
        <section className="about-section section-padding fix">
        <div className="container">
            <div className="about-wrapper">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="about-left-image">
                            <Image src="/img/about/about-1.jpg" alt="img" className="wow img-custom-anim-left" width={307} height={365}/>
                            <div className="about-image-2">
                                <Image src="/img/about/about-2.jpg" alt="img" className="wow img-custom-anim-left" width={225} height={225}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="about-content">
                            <div className="section-title">
                                <span className="sub-title wow fadeInUp">
                                    We Care About Your Happiness
                                </span>
                                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                    We Are Your Gateway <br /> to Adventure
                                </h2>
                            </div>
                            <p className="mt-4 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                                At Express Travel, we believe in the transformative power of <br /> travel. As avid
                                explorers ourselves, we understand the desire <br /> to uncover new experiences, forge
                                meaningful connections, and create lasting memories.
                            </p>
                            <div className="about-button wow fadeInUp" data-wow-delay=".7s">
                                <Link href="about.html" className="theme-btn">Read More <Image
                                        src="/img/icon/white-arrow.svg" alt="img" width={22} height={16}/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="about-right-image">
                            <Image src="/img/about/about-3.jpg" alt="img" className="wow img-custom-anim-right" width={307} height={365}/>
                            <div className="about-image-2">
                                <Image src="/img/about/about-4.jpg" alt="img" className="wow img-custom-anim-right" width={225} height={225}/>
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

export default AboutSection