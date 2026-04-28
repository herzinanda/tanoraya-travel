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
  iconName?: string;
}

type ComponentType =
  | "blocks.hero-section"
  | "blocks.home-about"
  | "blocks.home-activities"
  | "blocks.home-destinations"
  | "blocks.why-choose-us"
  | "blocks.home-best-recommended-place"
  | "blocks.home-cta"
  | "blocks.home-testimonials"
  | "blocks.home-blog"
  | "blocks.about-hero"
  | "blocks.achievement"
  | "blocks.our-guides";

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

export type Block =
  | HeroSectionProps
  | HomeAboutProps
  | HomeActivitiesProps
  | HomeDestinationsProps
  | WhyChooseUsProps
  | HomeBestRecommendedProps
  | HomeCtaProps
  | HomeTestimonialsProps
  | HomeBlogProps;

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
  description?: string;
  Images: ImageProps[];
  videoUrl?: string;
  badgeNumber?: string;
  badgeLabel?: string;
  whyChooseUsItem: WhyChooseUsItemProps[];
}

export interface HomeCtaProps extends Base<"blocks.home-cta"> {
  title: string;
  subtitle: string;
  description?: string;
  ctaButton?: ButtonProps;
  bgImage?: ImageProps;
}

export interface TestimonialItemProps {
  id?: number;
  name: string;
  role?: string;
  location?: string;
  rating?: number;
  comment: string;
  avatar?: ImageProps;
}

export interface HomeTestimonialsProps extends Base<"blocks.home-testimonials"> {
  title?: string;
  subtitle?: string;
  button?: ButtonProps;
  testimonialItems?: TestimonialItemProps[];
}

export interface HomeBestRecommendedProps extends Base<"blocks.home-best-recommended-place"> {
  title?: string;
  subtitle?: string;
}

export interface HomeBlogProps extends Base<"blocks.home-blog"> {
  title?: string;
  subtitle?: string;
}

// About page block types
export interface AboutHeroProps extends Base<"blocks.about-hero"> {
  title: string;
  subtitle: string;
  aboutText: string;
  ctaAbout?: ButtonProps;
  aboutImages: ImageProps[];
}

export interface AchievementItemProps {
  id?: number;
  count: number;
  suffix?: string;
  label: string;
}

export interface AchievementProps extends Base<"blocks.achievement"> {
  title: string;
  subtitle: string;
  achievementCTAButton?: ButtonProps;
  achievementItems: AchievementItemProps[];
}

export interface GuideProps {
  id?: number;
  documentId?: string;
  username?: string;
  name?: string;
  role?: string;
  photo?: ImageProps;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface OurGuidesProps extends Base<"blocks.our-guides"> {
  title: string;
  subtitle: string;
  GuideList: GuideProps[];
}
