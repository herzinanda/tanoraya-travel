import React from 'react';
import Image from 'next/image';
import { DestinationType } from '@/types/destination-detail';

type DestinationContentProps = {
  destination: DestinationType;
};

const DestinationContent = ({ destination }: DestinationContentProps) => {
  return (
    <>
      {/* --- Main Blog Item --- */}
      <div className="destionation-blog-item">
        <div className="thumb">
          <Image 
            {...destination.mainImage} 
            width={800} 
            height={500} 
            className="w-100 h-auto" 
            priority // Load the main image first
          />
        </div>
        <div className="content">
          <h2>{destination.title}</h2>
          {/* Render description HTML */}
          <div dangerouslySetInnerHTML={{ __html: destination.descriptionHtml }} />
        </div>
      </div>

      {/* --- Gallery --- */}
      <div className="destination-blog-item2">
        <div className="row g-4">
          {destination.galleryImages.map((image, index) => (
            <div className="col-md-6" key={index}>
              <div className="thumb">
                <Image 
                  {...image} 
                  width={400} 
                  height={300} 
                  className="w-100 h-auto" 
                />
              </div>
            </div>
          ))}
        </div>
        {/* You could also add the extra text paragraph here if it's dynamic */}
      </div>

      {/* --- Map --- */}
      <div className="destination-map-area">
        <h3>View in Map</h3>
        <div className="google-map">
          <iframe
            src={destination.mapEmbedSrc}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default DestinationContent;