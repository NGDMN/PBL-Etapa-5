import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Review = ({ productId, reviews, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(null);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para deixar uma avaliação');
      return;
    }
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }
    onAddReview({
      productId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toISOString()
    });
    setRating(0);
    setComment('');
  };

  return (
    <div className="mt-4">
      <h5>Avaliações</h5>
      {reviews.length === 0 ? (
        <p>Nenhuma avaliação ainda</p>
      ) : (
        <div className="mb-4">
          {reviews.map((review, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">{review.userName}</h6>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </div>
                <div className="mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                      size={20}
                    />
                  ))}
                </div>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sua Avaliação</label>
          <div className="d-flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={30}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(i + 1)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comentário</label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar Avaliação
        </button>
      </form>
    </div>
  );
};

export default Review; 