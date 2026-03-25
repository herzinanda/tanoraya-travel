import { StaticImageData } from 'next/image';

// Generic type for images
export type ImageType = {
  src: string | StaticImageData;
  alt: string;
};


export type NavMegaMenuDestination = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  tourCount?: number;
};

export type NavMegaMenuFeaturedTour = {
  id: string;
  title: string;
  slug: string;
  price?: number | null;
  imageUrl?: string | null;
};

export type NavMegaMenu = {
  topDestinations: NavMegaMenuDestination[];
  featuredTour: NavMegaMenuFeaturedTour | null;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  // This allows for nested dropdowns
  subMenu?: NavItem[];
  megaMenu?: NavMegaMenu;
};

export type SocialLink = {
  id: string;
  href: string;
  iconClass: string; // e.g., 'fab fa-facebook-f'
};

export type ContactInfo = {
  email: string;
  address: string;
};

export type LogoData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CtaButton = {
  href: string;
  label: string;
};