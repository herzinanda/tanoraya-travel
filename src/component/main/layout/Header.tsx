"use client"; // Header is a client component due to interactive elements (menu, search)

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      {/* header-top */}
      <div className="header-top-section">
        <div className="container">
          <div className="header-top-wrapper bg-cover" style={{ backgroundImage: 'url(/img/header/1.jpg)' }}>
            <ul className="top-left">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:info-help@travo.com">info-help@travo.com</a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                258 Street Avenue, Berlin, Germany
              </li>
            </ul>
            <ul className="top-right">
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* header-main */}
      <div id="header-sticky" className="header-1">
        <div className="container">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="logo">
                <Link href="/" className="header-logo">
                  <Image src="/img/logo/black-logo.svg" alt="logo-img" width={140} height={35} />
                </Link>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li className="has-dropdown active menu-thumb">
                          <Link href="/">
                            Home
                            <i className="fa-solid fa-chevron-down"></i>
                          </Link>
                          <ul className="submenu has-homemenu">
                            <li>
                              {/* ... (omitted for brevity, paste your HTML dropdown here) ... */}
                            </li>
                          </ul>
                        </li>
                        <li className="has-dropdown active d-xl-none">
                            <Link href="/">Home</Link>
                            <ul className="submenu">
                                <li><Link href="/">Home 01</Link></li>
                                <li><Link href="/index-2">Home 02</Link></li>
                                <li><Link href="/index-3">Home 03</Link></li>
                            </ul>
                        </li>
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li>
                          <Link href="/destination-details">
                            Destinations
                            <i className="fa-solid fa-chevron-down"></i>
                          </Link>
                          <ul className="submenu">
                            <li><Link href="/destinations">All Destinations</Link></li>
                            <li><Link href="/destination-details">Destination Details</Link></li>
                          </ul>
                        </li>
                        <li className="has-dropdown">
                          <Link href="/news">
                            Pages
                            <i className="fa-solid fa-chevron-down"></i>
                          </Link>
                          <ul className="submenu">
                            {/* ... (omitted, paste your HTML dropdown here) ... */}
                          </ul>
                        </li>
                        <li>
                          <Link href="/news-details">
                            Blog
                            <i className="fa-solid fa-chevron-down"></i>
                          </Link>
                          <ul className="submenu">
                            <li><Link href="/news">Blog Grid</Link></li>
                            <li><Link href="/news-classic">Blog Classic</Link></li>
                            <li><Link href="/news-details">Blog Details</Link></li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <a href="#" className="search-trigger search-icon"><i className="fa-regular fa-magnifying-glass"></i></a>
                <div className="header__hamburger my-auto">
                  <div className="sidebar__toggle">
                    <Image src="/img/icon/bars.svg" alt="img" width={24} height={24} />
                  </div>
                </div>
                <Link href="/contact" className="theme-btn">
                  Request A Quote
                  <Image src="/img/icon/white-arrow.svg" alt="img" width={12} height={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;