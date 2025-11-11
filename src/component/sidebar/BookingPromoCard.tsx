import React from 'react';
import { ImageType } from '@/types';
import Image from 'next/image';

type BookingPromoCardProps = {
  image: ImageType;
  titleHtml: string;
};

const BookingPromoCard = ({ image, titleHtml }: BookingPromoCardProps) => {
  return (
    <div className="activities-thumb-card">
      <div className="thumb">
        <Image 
          {...image} 
          width={400} 
          height={300}
          className="w-100 h-auto"
        />
        <div className="content">
          <h3 dangerouslySetInnerHTML={{ __html: titleHtml }} />
        </div>
      </div>
    </div>
  );
};

export default BookingPromoCard;