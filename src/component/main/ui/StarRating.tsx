import React from 'react';

type StarRatingProps = {
  rating: number; // The rating value (e.g., 4.5)
  maxRating?: number; // Maximum rating (e.g., 5)
};

/**
 * A simple component to display a read-only star rating.
 */
const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  return (
    <div className="star">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        // This simple version just fills stars up to the rating
        // For a real app, you might want half-stars
        return (
          <i
            key={starValue}
            className={`fa-solid fa-star ${
              starValue <= rating ? 'filled' : ''
            }`}
          ></i>
        );
      })}
    </div>
  );
};

export default StarRating;