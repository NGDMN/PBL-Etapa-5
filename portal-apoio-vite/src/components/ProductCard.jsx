import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Review from './Review';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { getProductReviews, addReview } = useReview();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product, quantity);
      toast.success('Produto adicionado ao carrinho!');
    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    if (!user) {
      toast.error('Você precisa estar logado para avaliar produtos');
      return;
    }

    try {
      setReviewLoading(true);
      await addReview(product.id, reviewData);
      toast.success('Avaliação adicionada com sucesso!');
      // Recarrega as avaliações
      const updatedReviews = await getProductReviews(product.id);
      setReviews(updatedReviews);
    } catch (error) {
      toast.error('Erro ao adicionar avaliação');
    } finally {
      setReviewLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setLoading(true);
      const productReviews = await getProductReviews(product.id);
      setReviews(productReviews);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    } finally {
      setLoading(false);
    }
  };

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
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
            </button>
          </div>
          <small className="text-muted">Estoque: {product.stock}</small>
        </div>

        {/* Reviews section */}
        <Review 
          productId={product.id}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </div>
    </div>
  );
};

export default ProductCard; 