import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
          <p>By: {review.user.username}</p>
          <p>Posted: {new Date(review.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
