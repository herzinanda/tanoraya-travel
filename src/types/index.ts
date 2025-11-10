export type NavItem = {
  id: string;
  label: string;
  href: string;
  // This allows for nested dropdowns
  subMenu?: NavItem[]; 
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