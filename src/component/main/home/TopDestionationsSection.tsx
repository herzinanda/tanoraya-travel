import Image from 'next/image'
import React from 'react'

const TopDestionationsSection = () => {
  return (
    <>
        <section className="top-destination-section section-padding fix">
        <div className="container">
            <div className="section-title text-center">
                <span className="sub-title wow fadeInUp">Top Destination</span>
                <h2 className="wow fadeInUp wow" data-wow-delay=".3s">
                    Most Popular Destinations
                </h2>
            </div>
            <div className="new-top-destination-wrapper">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/05.jpg" alt="img" width={308} height={285} />
                                    <a href="assets/img/destination/new/05.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/06.jpg" alt="img" width={308} height={285} />
                                    <a href="assets/img/destination/new/06.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/07.jpg" alt="img" width={307} height={600} />
                                    <a href="assets/img/destination/new/07.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/08.jpg" alt="img" width={308} height={360}/>
                                    <a href="assets/img/destination/new/08.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/09.jpg" alt="img" width={308} height={360}/>
                                    <a href="assets/img/destination/new/09.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/10.jpg" alt="img" width={307} height={360} />
                                    <a href="assets/img/destination/new/10.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
                                    </div>
                                </div>
                                <div className="new-top-desti-thumb">
                                    <Image src="/img/destination/new/11.jpg" alt="img" width={307} height={265} />
                                    <a href="assets/img/destination/new/11.jpg" className="icon img-popup2">
                                        <i className="fa-regular fa-plus"></i>
                                    </a>
                                    <div className="content">
                                        <h4><a href="destination-details.html">United Kingdom</a></h4>
                                        <p>174,688 Travelers</p>
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

export default TopDestionationsSection