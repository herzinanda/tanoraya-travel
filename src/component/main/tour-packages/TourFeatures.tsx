import React from 'react';
import Image from 'next/image';

type TourFeaturesProps = {
  features: string[];
  heading?: string;
};

const TourFeatures = ({ features, heading = "Experience the Difference" }: TourFeaturesProps) => {
  // Split features into two columns
  const midPoint = Math.ceil(features.length / 2);
  const column1 = features.slice(0, midPoint);
  const column2 = features.slice(midPoint);

  return (
    <div className="activities-list-item">
      <h3>{heading}</h3>
      <div className="activities-item">
        <ul className="activities-list">
          {column1.map((feature, index) => (
            <li key={index}>
              <Image src="/img/icon/26.svg" alt="feature icon" width={18} height={18} />
              {feature}
            </li>
          ))}
        </ul>
        <ul className="activities-list">
          {column2.map((feature, index) => (
            <li key={index}>
              <Image src="/img/icon/26.svg" alt="feature icon" width={18} height={18} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourFeatures;