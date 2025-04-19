import React, { useState } from 'react';
import { Form, Button, Rating } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação');
      return;
    }
    onSubmit({
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
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group className="mb-3">
        <Form.Label>Avaliação</Form.Label>
        <div className="d-flex align-items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="link"
              className="p-0 me-1"
              onClick={() => setRating(star)}
            >
              <i
                className={`bi bi-star${star <= rating ? '-fill' : ''}`}
                style={{ fontSize: '1.5rem', color: star <= rating ? '#ffc107' : '#6c757d' }}
              />
            </Button>
          ))}
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Comentário</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário sobre o produto..."
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar Avaliação
      </Button>
    </Form>
  );
};

export default ReviewForm; 