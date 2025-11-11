import React from 'react';
import Image from 'next/image';
import { ReviewType } from '@/types/destination-detail';
import StarRating from '../ui/StarRating';

type ReviewItemProps = {
  review: ReviewType;
  isReply?: boolean; // To style nested replies
};

const ReviewItem = ({ review, isReply = false }: ReviewItemProps) => {
  return (
    <div className={`comment-item ${isReply ? 'style-2' : ''}`}>
      <div className="thumb">
        <Image 
          {...review.avatar} 
          width={100} 
          height={100} 
          className="rounded-circle" 
        />
      </div>
      <div className="content">
        <div className="head">
          <div className="left">
            <StarRating rating={review.rating} />
            <h4>{review.author}</h4>
          </div>
          <div className="right">
            <h6>
              <Image 
                src="/img/icon/36.svg" 
                alt="reply" 
                width={16} 
                height={16} 
              />
              Reply
            </h6>
          </div>
        </div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;