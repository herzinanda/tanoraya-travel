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

// For downloadable itinerary file
export type ItineraryFile = {
  url: string;
  name: string;
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

/** One row in a group-pricing table: minPax–maxPax → pricePerPerson */
export type PriceTier = {
  minPax: number
  maxPax: number | null  // null = no upper limit
  pricePerPerson: number
}

export type TourVariant = {
  itinerary?: TourPlanItem[]
  tour_facilities?: TourInfoItem[]
}

export type TourDeparture = {
  id: string;
  departureDate: string;
  returnDate?: string;
  availableSeats: number;
  priceOverride?: number;
  /** Group pricing tiers — more pax = lower price per person */
  priceTiers?: PriceTier[]
  status: 'available' | 'limited' | 'sold_out';
  variant?: TourVariant
};

// The main Tour Package data type
export type TourPackageType = {
  id: string;
  title: string;
  locations: string;
  descriptionHtml: string;
  galleryImages: ImageType[];
  features: string[]; // For "Experience the Difference"
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  minGroupSize?: number;
  infoGrid: TourInfoItem[];
  tourPlan: TourPlanItem[];
  mapEmbedSrc: string;
  reviewSummary: TourReviewSummary;
  reviews: ReviewType[];
  price: number;
  tourCode?: string;
  itineraryFile?: ItineraryFile;
  departures: TourDeparture[];
  promoCard: {
    image: ImageType;
    titleHtml: string;
  };
  tourImageThumbnail?: ImageType;
};