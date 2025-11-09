import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TeamSection = () => {
  return (
    <>
        <section className="team-section fix section-padding">
        <div className="container">
            <div className="section-title text-center">
                <span className="sub-title wow fadeInUp">
                    Meet with Guide
                </span>
                <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    Travel Specialist
                </h2>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                    <div className="team-items">
                        <div className="team-image">
                            <Image src="/img/team/1.jpg" alt="img" width={308} height={350} />
                            <div className="team-social">
                                <ul>
                                    <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="team-content">
                            <h4><Link href="team-details.html">Michel Smith</Link></h4>
                            <p>Tourist Guide</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                    <div className="team-items">
                        <div className="team-image">
                            <Image src="/img/team/2.jpg" alt="img" width={308} height={350} />
                            <div className="team-social">
                                <ul>
                                    <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="team-content">
                            <h4><Link href="team-details.html">Leslie Alexander</Link></h4>
                            <p>Tourist Guide</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                    <div className="team-items">
                        <div className="team-image">
                            <Image src="/img/team/3.jpg" alt="img" width={308} height={350} />
                            <div className="team-social">
                                <ul>
                                    <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="team-content">
                            <h4><Link href="team-details.html">JR Shawon</Link></h4>
                            <p>Tourist Guide</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                    <div className="team-items">
                        <div className="team-image">
                            <Image src="/img/team/4.jpg" alt="img" width={308} height={350} />
                            <div className="team-social">
                                <ul>
                                    <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="team-content">
                            <h4><Link href="team-details.html">Smith Kong</Link></h4>
                            <p>Tourist Guide</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default TeamSection