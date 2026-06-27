import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OffcanvasMenu = () => {
  return (
    <>
        <div className="fix-area">
        <div className="offcanvas__info">
            <div className="offcanvas__wrapper">
                <div className="offcanvas__content">
                    <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                        <div className="offcanvas__logo">
                            <Link href="/">
                                <Image src="/img/logo/tanoraya-horizontal.png" alt="Tanoraya Tour & Travel" width={160} height={40} style={{ height: '30px', width: 'auto' }}/>
                            </Link>
                        </div>
                        <div className="offcanvas__close">
                            <button>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <p className="text d-none d-xl-block">
                        Your trusted travel partner for unforgettable journeys across Indonesia and Southeast Asia.
                    </p>
                    <div className="mobile-menu fix mb-3"></div>
                    <div className="offcanvas__contact">
                        <h4>Contact Info</h4>
                        <ul>
                            <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon">
                                    <i className="fal fa-map-marker-alt"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                    <a target="_blank" href="#">Jl. Sisingamangaraja No. 12, Medan, Sumatera Utara</a>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                    <i className="fal fa-envelope"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                    <a href="mailto:info@tanoraya.com">info@tanoraya.com</a>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                    <i className="fal fa-clock"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                    <a target="_blank" href="#">Mon – Fri, 09am – 05pm</a>
                                </div>
                            </li>
                            <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                    <i className="far fa-phone"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                    <a href="tel:+6281166666666">+62 811 6666 666</a>
                                </div>
                            </li>
                        </ul>
                        <div className="header-button mt-4">
                            <Link href="/request-a-quote" className="theme-btn">Request A Quote <i
                                    className="fa-sharp fa-regular fa-arrow-right"></i></Link>
                        </div>
                        <div className="social-icon d-flex align-items-center">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="offcanvas__overlay"></div>
    </>
  )
}

export default OffcanvasMenu