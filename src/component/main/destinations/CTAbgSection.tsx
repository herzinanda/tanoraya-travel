import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTAbgSection = () => {
  return (
    <>
        <section className="cta-bg-section bg-cover fix" style={{ backgroundImage: 'url(/img/cta/bg.jpg)' }}>
        <div className="container">
            <div className="row">
                <div className="cta-wrapper text-center">
                    <div className="section-title ">
                        <span className="sub-title wow fadeInUp">
                            Explore The World
                        </span>
                        <h2>
                            Step into Adventure, Bask <br />
                            in Natural Glory
                        </h2>
                    </div>
                    <div className="cta-button wow fadeInUp" data-wow-delay=".7s">
                        <Link href="contact.html" className="theme-btn">Check Availability <Image
                                src="assets/img/icon/white-arrow.svg" alt="img" width={22} height={16} /></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default CTAbgSection