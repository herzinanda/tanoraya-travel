"use client"; // This remains a client component for interactivity

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import NavigationMenu from "./NavigationMenu"; // Import our new component
import { ContactInfo, CtaButton, LogoData, NavItem, SocialLink } from "@/types/index";

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
          <div className="header-top-wrapper">
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
                    style={{ height: '30px', width: 'auto' }}
                  />
                </Link>
              </div>

              <div className="header-right d-flex justify-content-end align-items-center">
                {/* Desktop nav — hidden below xl (1200px), matching MeanMenu's meanScreenWidth: 1199 */}
                <div className="mean__menu-wrapper d-none d-xl-block">
                  <div className="main-menu">
                    <NavigationMenu items={navItems} />
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

                {/* Hamburger — shown below xl, opens the offcanvas (jQuery .sidebar__toggle handler in main.js) */}
                <div className="header__hamburger d-xl-none my-auto">
                  <div className="sidebar__toggle" role="button" aria-label="Open menu">
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;