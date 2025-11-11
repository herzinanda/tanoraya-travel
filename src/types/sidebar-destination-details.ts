import { ImageType } from './index';

// Type for a single recent tour (in the sidebar)
export type RecentTourType = {
  id: string;
  title: string;
  href: string;
  image: ImageType;
  rating: number;
};

// Data for the entire sidebar
export type SidebarDataType = {
  recentTours: RecentTourType[];
};