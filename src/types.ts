export interface ButtonProps {
  id: number;
  text: string;
  url: string;
  variant: string;
  withArrow: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface WhyChooseUsItemProps {
  id?: number;
  title: string;
  description: string;
}

type ComponentType = "blocks.hero-section" | "blocks.home-about" | "blocks.home-activities" | "blocks.home-destinations" | "blocks.why-choose-us";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block = HeroSectionProps | HomeAboutProps | HomeActivitiesProps | HomeDestinationsProps | WhyChooseUsProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
  title: string;
  subtitle: string;
  heroImages: ImageProps[];
  ctaPrimary?: ButtonProps;
  ctaSecondary?: ButtonProps;
}

export interface HomeAboutProps extends Base<"blocks.home-about"> {
  title: string;
  subtitle: string;
  aboutText: string;
  ctaAbout: ButtonProps;
  aboutImages: ImageProps[];
}

export interface HomeActivitiesProps extends Base<"blocks.home-activities"> {
  title: string;
  subtitle: string;
  description: string;
}

export interface HomeDestinationsProps extends Base<"blocks.home-destinations"> {
  title: string,
  subtitle: string,
}

export interface WhyChooseUsProps extends Base<"blocks.why-choose-us"> {
  title: string;
  subtitle: string;
  Images: ImageProps[];
  whyChooseUsItem: WhyChooseUsItemProps[];
}


