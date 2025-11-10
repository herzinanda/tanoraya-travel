"use client"; // This remains a client component for interactivity

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NavItem, SocialLink, ContactInfo, LogoData, CtaButton } from "@/types";
import NavigationMenu from "./NavigationMenu"; // Import our new component

// Define the props our Header will accept
type HeaderProps = {
  logo: LogoData;
  contactInfo: ContactInfo;
  socials: SocialLink[];
  navItems: NavItem[];
  ctaButton: CtaButton;
};

const Header = ({
  logo,
  contactInfo,
  socials,
  navItems,
  ctaButton,
}: HeaderProps) => {
  
  // --- Client-Side Logic ---

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header-sticky");
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- JSX ---
  
  return (
    <>
      {/* header-top */}
      <div className="header-top-section">
        <div className="container">
          <div
            className="header-top-wrapper bg-cover"
            style={{ backgroundImage: "url(/img/header/1.jpg)" }}
          >
            {/* Dynamic Contact Info */}
            <ul className="top-left">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                {contactInfo.address}
              </li>
            </ul>
            
            {/* Dynamic Socials */}
            <ul className="top-right">
              {socials.map((social) => (
                <li key={social.id}>
                  <a href={social.href}>
                    <i className={social.iconClass}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* header-main */}
      <div id="header-sticky" className="header-1">
        <div className="container">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              {/* Dynamic Logo */}
              <div className="logo">
                <Link href="/" className="header-logo">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </Link>
              </div>

              <div className="">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    {/* Dynamic Navigation */}
                    <NavigationMenu items={navItems} />
                  </div>
                </div>
              </div>

              <div className="header-right d-flex justify-content-end align-items-center">
                

                <a href="#" className="search-trigger search-icon">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </a>

                {/* Mobile Menu Toggle */}
                <div className="header__hamburger my-auto">
                  <div 
                    className="sidebar__toggle" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Image
                      src="/img/icon/bars.svg"
                      alt="menu toggle"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>

                {/* Dynamic CTA Button */}
                <Link href={ctaButton.href} className="theme-btn">
                  {ctaButton.label}
                  <Image
                    src="/img/icon/white-arrow.svg"
                    alt="arrow icon"
                    width={12}
                    height={12}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You would also need to build the mobile menu/sidebar component 
        that toggles based on the `isMobileMenuOpen` state.
      */}
    </>
  );
};

export default Header;