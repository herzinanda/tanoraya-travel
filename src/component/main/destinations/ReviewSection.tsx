"use client"; // This component contains the form, so it's a client component

import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import Image from 'next/image';
import { ReviewType } from '@/types/destination-detail';

type ReviewSectionProps = {
  reviews: ReviewType[];
};

// A sub-component for the interactive star rating
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          key={index}
          className={`fa-solid fa-star-sharp ${index <= rating ? 'active' : ''}`}
          data-index={index}
          onClick={() => setRating(index)}
        />
      ))}
    </div>
  );
};


const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  // State for the new review form
  const [serviceRating, setServiceRating] = useState(0);
  const [hotelRating, setHotelRating] = useState(0);
  const [placeRating, setPlaceRating] = useState(0);
  // ... other form states (name, email, etc.)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the review
  };

  return (
    <>
      {/* --- Client Reviews List --- */}
      <div className="destination-reviews-item">
        <h3>Clients Reviews</h3>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* --- Add Review Form --- */}
      <div className="destination-form-item">
        <h3>Add Your Reviews</h3>
        <div className="form-content">
          <div className="row">
            {/* Star Rating Inputs */}
            <div className="col-md-4">
              <div className="star-item">
                <h5>Services</h5>
                <StarRatingInput rating={serviceRating} setRating={setServiceRating} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="star-item">
                <h5>Hotel</h5>
                <StarRatingInput rating={hotelRating} setRating={setHotelRating} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="star-item">
                <h5>Places</h5>
                <StarRatingInput rating={placeRating} setRating={setPlaceRating} />
              </div>
            </div>
            {/* ... other star ratings ... */}
          </div>

          <form onSubmit={handleReviewSubmit} id="contact-form" method="post">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="form-clt">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-clt">
                  <input type="text" name="phone" placeholder="Your Phone" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-clt">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-clt">
                  <textarea name="message" placeholder="Write Message" required></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <button type="submit" className="theme-btn">
                  Post Comment
                  <Image src="/img/icon/white-arrow.svg" alt="arrow" width={12} height={12} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;