import React from 'react';
import Image from 'next/image';
import { TourInfoItem } from '@/types/tour-detail';

type TourInfoGridProps = {
  info: TourInfoItem[];
};

const TourInfoGrid = ({ info }: TourInfoGridProps) => {
  return (
    <div className="activities-box-wrap">
      {/* This groups items into rows of 4.
        We create an array of "rows", where each row is an array of "items".
      */}
      {Array.from({ length: Math.ceil(info.length / 4) }, (_, rowIndex) => (
        <div key={rowIndex} className={`activities-box-area ${rowIndex === 0 ? '' : 'mb-0'}`}>
          {info.slice(rowIndex * 4, (rowIndex + 1) * 4).map((item, itemIndex) => (
            <div key={item.id} className={`activities-box-item ${itemIndex === 1 ? 'style-2' : ''}`}>
              <div className="icon">
                <Image {...item.icon} width={32} height={32} />
              </div>
              <div className="content">
                <span>{item.label}</span>
                <h6>{item.value}</h6>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TourInfoGrid;