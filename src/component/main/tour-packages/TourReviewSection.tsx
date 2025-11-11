"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import StarRating from '../ui/StarRating';
import { TourReviewSummary } from '@/types/tour-detail';
import { ReviewType } from '@/types/destination-detail';
import ReviewItem from '../destinations/ReviewItem';

type TourReviewSectionProps = {
  summary: TourReviewSummary;
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

const TourReviewSection = ({ summary, reviews }: TourReviewSectionProps) => {
  // State for the new review form
  const [serviceRating, setServiceRating] = useState(0);
  const [hotelRating, setHotelRating] = useState(0);
  const [placeRating, setPlaceRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [foodsRating, setFoodsRating] = useState(0);
  const [guidesRating, setGuidesRating] = useState(0);
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the review
  };

  return (
    <>
      {/* --- Review Summary --- */}
      <div className="activities-customer-reviews">
        <h3>Customer Reviews</h3>
        <div className="customer-items">
          <div className="row align-items-center g-4">
            <div className="col">
              <div className="box">
                <h1>{summary.averageRating.toFixed(1)}</h1>
                <p>({summary.reviewCount} Reviews)</p>
                <StarRating rating={Math.round(summary.averageRating)} />
              </div>
            </div>
            <div className="col">
              <div className="customer-rating-list">
                {summary.categories.map(category => (
                  <div className="customer-rating-item" key={category.id}>
                    <span>{category.label}</span>
                    <div className="progress">
                      <div 
                        className={`progress-bar ${category.id}-bar`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="stars">
                      <StarRating rating={5} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Review List --- */}
      <div className="activities-reviews-item">
        <h3>Clients Reviews</h3>
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* --- Add Review Form --- */}
      <div className="activities-form-item">
        <h3>Add Your Reviews</h3>
        <div className="form-content">
          <div className="row">
            {/* Star Rating Inputs */}
            <div className="col-md-4"><div className="star-item">
              <h5>Services</h5>
              <StarRatingInput rating={serviceRating} setRating={setServiceRating} />
            </div></div>
            <div className="col-md-4"><div className="star-item">
              <h5>Hotel</h5>
              <StarRatingInput rating={hotelRating} setRating={setHotelRating} />
            </div></div>
            <div className="col-md-4"><div className="star-item">
              <h5>Places</h5>
              <StarRatingInput rating={placeRating} setRating={setPlaceRating} />
            </div></div>
            <div className="col-md-4"><div className="star-item">
              <h5>Safety</h5>
              <StarRatingInput rating={safetyRating} setRating={setSafetyRating} />
            </div></div>
            <div className="col-md-4"><div className="star-item">
              <h5>Foods</h5>
              <StarRatingInput rating={foodsRating} setRating={setFoodsRating} />
            </div></div>
            <div className="col-md-4"><div className="star-item">
              <h5>Guides</h5>
              <StarRatingInput rating={guidesRating} setRating={setGuidesRating} />
            </div></div>
          </div>

          <form onSubmit={handleReviewSubmit} id="contact-form" method="post">
            <div className="row g-4">
              <div className="col-lg-6"><div className="form-clt">
                <input type="text" name="name" placeholder="Your Name" required />
              </div></div>
              <div className="col-lg-6"><div className="form-clt">
                <input type="text" name="phone" placeholder="Your Phone" />
              </div></div>
              <div className="col-lg-12"><div className="form-clt">
                <input type="email" name="email" placeholder="Your Email" required />
              </div></div>
              <div className="col-lg-12"><div className="form-clt">
                <textarea name="message" placeholder="Write Message" required></textarea>
              </div></div>
              <div className="col-lg-6"><button type="submit" className="theme-btn">
                Post Comment
                <Image src="/img/icon/white-arrow.svg" alt="arrow" width={12} height={12} />
              </button></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TourReviewSection;