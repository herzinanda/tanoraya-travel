// data/headerData.ts
import { NavItem, SocialLink, ContactInfo, LogoData, CtaButton } from "@/types/index";

export const logo: LogoData = {
  src: "/img/logo/tanoraya-logo-new.png",
  alt: "Tanoraya Tour & Travel",
  width: 200,
  height: 50,
};

export const contactInfo: ContactInfo = {
  email: "info@tanoraya.com",
  address: "Jl. Sisingamangaraja No. 12, Medan Kota, Sumatera Utara, Indonesia",
};

export const socialLinks: SocialLink[] = [
  { id: "fb", href: "#", iconClass: "fab fa-facebook-f" },
  { id: "tw", href: "#", iconClass: "fab fa-twitter" },
  { id: "li", href: "#", iconClass: "fab fa-linkedin-in" },
  { id: "in", href: "#", iconClass: "fab fa-instagram" },
];

export const ctaButton: CtaButton = {
  href: "/request-a-quote",
  label: "Request A Quote",
};

// This now drives your entire navigation
export const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "tour-packages",
    label: "Tour Packages",
    href: "/tour-packages",
    subMenu: [
      {
        id: "tour-packages-all",
        label: "All Tour Packages",
        href: "/tour-packages",
      },
      {
        id: "tp-sumatera-utara",
        label: "Sumatera Utara",
        href: "/tour-packages/sumatera-utara",
      },
      { id: "tp-asean", label: "ASEAN", href: "/tour-packages/asean" },
      { id: "tp-malaysia", label: "Malaysia", href: "/tour-packages/malaysia" },
      {
        id: "tp-singapore",
        label: "Singapore",
        href: "/tour-packages/singapore",
      },
    ],
  },
  {
    id: "travel-blog",
    label: "Travel Blog",
    href: "/articles",
  },
  {
    id: "about",
    label: "About Us",
    href: "/about",
  },
  //   {
  //     id: "dest",
  //     label: "Destinations",
  //     href: "/destination-details",
  //     subMenu: [
  //       { id: "destAll", label: "All Destinations", href: "/destinations" },
  //       { id: "destDetails", label: "Destination Details", href: "/destination-details" },
  //     ],
  //   },
  //   {
  //     id: "pages",
  //     label: "Pages",
  //     href: "/news", // Fallback link
  //     subMenu: [
  //       { id: "tour", label: "Our Tour", href: "/tour" },
  //       { id: "tourDetails", label: "Tour Details", href: "/tour-details" },
  //       { id: "team", label: "Our Team", href: "/team" },
  //       { id: "faq", label: "Our Faq", href: "/faq" },
  //       { id: "404", label: "404", href: "/404" },
  //     ],
  //   },
  //   {
  //     id: "blog",
  //     label: "Blog",
  //     href: "/news-details", // Fallback link
  //     subMenu: [
  //       { id: "blogGrid", label: "Blog Grid", href: "/news" },
  //       { id: "blogClassic", label: "Blog Classic", href: "/news-classic" },
  //       { id: "blogDetails", label: "Blog Details", href: "/news-details" },
  //     ],
  //   },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact",
  },
];
