import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RecentTourType } from '@/types/sidebar-destination-details';
import SidebarWidget from '../main/ui/SidebarWidget';
import StarRating from '../main/ui/StarRating';

type RecentToursWidgetProps = {
  tours: RecentTourType[];
};

const RecentToursWidget = ({ tours }: RecentToursWidgetProps) => {
  return (
    <SidebarWidget title="Recent Tours">
      {tours.map((tour, index) => (
        <div 
          key={tour.id} 
          className={`recent-widget-item ${index === tours.length - 1 ? 'mb-0' : ''}`}
        >
          <div className="thumb">
            <Image {...tour.image} width={100} height={100} />
          </div>
          <div className="content">
            <StarRating rating={tour.rating} />
            <h6>
              <Link href={tour.href}>{tour.title}</Link>
            </h6>
          </div>
        </div>
      ))}
    </SidebarWidget>
  );
};

export default RecentToursWidget;