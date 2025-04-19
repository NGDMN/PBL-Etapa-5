import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useReview } from '../context/ReviewContext';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const { addToCart, hasPurchasedItem } = useCart();
  const { getProductReviews, addReview, getAverageRating } = useReview();
  const reviews = getProductReviews(product.id);
  const averageRating = getAverageRating(product.id);

  const handleReviewSubmit = (review) => {
    addReview(review);
  };

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>R$ {product.price.toFixed(2)}</Card.Text>
          {averageRating > 0 && (
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi bi-star${star <= averageRating ? '-fill' : ''}`}
                  style={{ color: star <= averageRating ? '#ffc107' : '#6c757d' }}
                />
              ))}
              <small className="text-muted ms-2">
                ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
              </small>
            </div>
          )}
          <div className="mt-auto">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
              />
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product, quantity)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
            <small className="text-muted">Estoque: {product.stock}</small>
            <div className="mt-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowReviews(true)}
              >
                Ver Avaliações
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showReviews} onHide={() => setShowReviews(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Avaliações - {product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewsList reviews={reviews} />
          {hasPurchasedItem(product.id) && (
            <ReviewForm
              productId={product.id}
              onSubmit={handleReviewSubmit}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCard; 