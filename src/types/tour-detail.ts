import { ReviewType } from './destination-detail';
import { ImageType } from './index';

// For the "Accommodation", "Language", etc. grid
export type TourInfoItem = {
  id: string;
  icon: ImageType;
  label: string;
  value: string;
};

// For the "Tour Plan" accordion
export type TourPlanItem = {
  id: string;
  title: string;
  descriptionHtml: string;
  image: ImageType;
};

// For the "Customer Reviews" progress bars
export type TourReviewCategory = {
  id: string;
  label: string;
  percentage: number; // e.g., 90 for 90%
};

// For the aggregate review summary
export type TourReviewSummary = {
  averageRating: number;
  reviewCount: number;
  categories: TourReviewCategory[];
};

// The main Tour Package data type
export type TourPackageType = {
  id: string;
  title: string;
  locations: string;
  descriptionHtml: string;
  galleryImages: ImageType[];
  features: string[]; // For "Experience the Difference"
  infoGrid: TourInfoItem[];
  tourPlan: TourPlanItem[];
  mapEmbedSrc: string;
  reviewSummary: TourReviewSummary;
  reviews: ReviewType[];
  price: number;
  promoCard: {
    image: ImageType;
    titleHtml: string;
  };
};