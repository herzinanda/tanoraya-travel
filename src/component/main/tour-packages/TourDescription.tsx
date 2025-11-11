import React from 'react';

type TourDescriptionProps = {
  title: string;
  locations: string;
  descriptionHtml: string;
};

const TourDescription = ({ title, locations, descriptionHtml }: TourDescriptionProps) => {
  return (
    <div className="content">
      <h6><i className="fa-solid fa-location-dot"></i> {locations}</h6>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
    </div>
  );
};

export default TourDescription;