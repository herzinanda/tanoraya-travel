"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { submitReview } from '@/app/actions/review';
import { TourReviewSummary } from '@/types/tour-detail';
import { ReviewType } from '@/types/destination-detail';

type Props = {
  summary: TourReviewSummary;
  reviews: ReviewType[];
  tourSlug: string;
};

const StarInput = ({ label, rating, setRating }: { label: string; rating: number; setRating: (r: number) => void }) => (
  <div className="star-item">
    <h5>{label}</h5>
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`fa-solid fa-star-sharp ${i <= rating ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => setRating(i)}
        />
      ))}
    </div>
  </div>
);

const StarDisplay = ({ rating }: { rating: number }) => (
  <span className="star-rating">
    {[1, 2, 3, 4, 5].map((i) => (
      <i key={i} className={`fa-solid fa-star-sharp ${i <= Math.round(rating) ? 'active' : ''}`} />
    ))}
  </span>
);

const TourReviewSection = ({ summary, reviews, tourSlug }: Props) => {
  const [ratings, setRatings] = useState({ overall: 0, safety: 0, food: 0, guide: 0, places: 0 });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const setRatingKey = (key: keyof typeof ratings) => (val: number) =>
    setRatings((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ratings.overall === 0) { setError('Please select an overall rating.'); return; }
    setLoading(true);
    setError('');
    try {
      await submitReview({
        reviewerName: name,
        reviewerEmail: email,
        tourSlug,
        rating_overall: ratings.overall,
        rating_safety: ratings.safety,
        rating_food: ratings.food,
        rating_guide: ratings.guide,
        rating_places: ratings.places,
        comment,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Review Summary */}
      {summary.reviewCount > 0 && (
        <div className="activities-customer-reviews">
          <h3>Customer Reviews</h3>
          <div className="customer-items">
            <div className="row align-items-center g-4">
              <div className="col">
                <div className="box">
                  <h1>{summary.averageRating.toFixed(1)}</h1>
                  <p>({summary.reviewCount} Reviews)</p>
                  <StarDisplay rating={summary.averageRating} />
                </div>
              </div>
              {summary.categories.length > 0 && (
                <div className="col">
                  <div className="customer-rating-list">
                    {summary.categories.map((cat) => (
                      <div className="customer-rating-item" key={cat.id}>
                        <span>{cat.label}</span>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: `${cat.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review List */}
      {reviews.length > 0 && (
        <div className="activities-reviews-item">
          <h3>Client Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="blog-single-comment d-flex gap-4 pt-4 pb-4">
              <div className="content">
                <h5>{(review as any).reviewerName ?? review.name}</h5>
                <StarDisplay rating={(review as any).rating_overall ?? review.rating ?? 0} />
                <p className="mt-2">{(review as any).comment ?? review.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviews.length === 0 && summary.reviewCount === 0 && (
        <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
          Be the first to review this tour!
        </p>
      )}

      {/* Review Form */}
      <div className="activities-form-item">
        <h3>Add Your Review</h3>
        {submitted ? (
          <div style={{ padding: 20, background: '#f0faf0', borderRadius: 8, color: '#27ae60' }}>
            <i className="fa-solid fa-circle-check me-2" />
            Thank you! Your review is pending approval and will appear once approved.
          </div>
        ) : (
          <div className="form-content">
            <div className="row mb-4">
              {[
                { key: 'overall', label: 'Overall' },
                { key: 'safety', label: 'Safety' },
                { key: 'food', label: 'Food' },
                { key: 'guide', label: 'Guide' },
                { key: 'places', label: 'Places' },
              ].map(({ key, label }) => (
                <div key={key} className="col-md-4 mb-3">
                  <StarInput
                    label={label}
                    rating={ratings[key as keyof typeof ratings]}
                    setRating={setRatingKey(key as keyof typeof ratings)}
                  />
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input type="text" placeholder="Your Name *" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input type="email" placeholder="Your Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-clt">
                    <textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} required />
                  </div>
                </div>
                {error && (
                  <div className="col-12">
                    <div style={{ color: '#e74c3c', fontSize: 13, padding: '8px 12px', background: '#fdf0f0', borderRadius: 6 }}>
                      {error}
                    </div>
                  </div>
                )}
                <div className="col-lg-6">
                  <button type="submit" className="theme-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Post Review'}
                    {!loading && <Image src="/img/icon/white-arrow.svg" alt="arrow" width={12} height={12} />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default TourReviewSection;
