import { ImageType } from './index';

// Type for a single review
export type ReviewType = {
  id: string;
  author: string;
  avatar: ImageType;
  rating: number; // e.g., 4 or 5
  comment: string;
};

// The main data type for the destination
export type DestinationType = {
  id: string;
  title: string;
  mainImage: ImageType;
  descriptionHtml: string; // Use string to allow <br> or <p> tags
  galleryImages: ImageType[];
  mapEmbedSrc: string;
  reviews: ReviewType[];
};