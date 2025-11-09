import Image from 'next/image'
import React from 'react'

const CTAbgSection2 = () => {
  return (
    <>
        <section className="cta-bg-section2 cta-padding bg-cover fix" style={{backgroundImage: "url(assets/img/cta/bg-2.png)"}}>
        <div className="container">
            <div className="row g-4 align-items-center">
                <div className="col-lg-6">
                    <div className="cta-wrapper2">
                        <div className="section-title ">
                            <span className="sub-title wow fadeInUp text-white">
                                Special Offer For You
                            </span>
                            <h2 className="wow fadeInUp text-white" data-wow-delay=".3s">
                                50% Offer For Online <br/>
                                1stApp Booking
                            </h2>
                            <p className="mt-3 mt-mb-0 text-white wow fadeInUp" data-wow-delay=".5s">
                                It is a long established fact that a reader will be distracted the <br />
                                readable content of a page when looking at layout.
                            </p>
                        </div>
                        <div className="cta-button">
                            <a href="contact.html">
                                <Image src="/img/icon/apple.png" alt="img" className="wow fadeInUp" width={182} height={60} />
                            </a>
                            <a href="contact.html">
                                <Image src="/img/icon/playstore.png" alt="img" className="wow fadeInUp" width={203} height={60}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="cta-thumb wow fadeInUp" data-wow-delay=".3s">
                        <Image src="/img/cta/thumb.png" alt="img" width={648} height={503} />
                        <div className="mask">
                            <Image src="/img/cta/mask.png" alt="" width={768} height={649} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default CTAbgSection2