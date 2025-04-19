import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">Nenhuma avaliação ainda.</p>;
  }

  return (
    <div className="mt-4">
      <h4>Avaliações ({reviews.length})</h4>
      {reviews.map((review, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">{review.userName}</h5>
              <small className="text-muted">
                {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi bi-star${star <= review.rating ? '-fill' : ''}`}
                  style={{ color: star <= review.rating ? '#ffc107' : '#6c757d' }}
                />
              ))}
            </div>
            <p className="mb-0">{review.comment}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList; 