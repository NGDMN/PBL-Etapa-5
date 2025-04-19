import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useReview } from '../context/ReviewContext';
import Review from './Review';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { getProductReviews } = useReview();
  const reviews = getProductReviews(product.id);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">R$ {product.price.toFixed(2)}</p>
        
        {/* Rating display */}
        <div className="mb-2">
          <div className="d-flex align-items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < Math.round(averageRating) ? '#ffc107' : '#e4e5e9'}
                size={20}
              />
            ))}
            <span className="ms-2">
              ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        </div>

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
        </div>

        {/* Reviews section */}
        <Review 
          productId={product.id}
          reviews={reviews}
          onAddReview={(review) => {
            // This will be handled by the ReviewContext
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard; 