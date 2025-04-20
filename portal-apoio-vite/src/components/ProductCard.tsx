import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Product, Review } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { getProductReviews, addReview } = useReview();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product);
      toast.success('Produto adicionado ao carrinho!');
    } catch (error) {
      toast.error('Erro ao adicionar produto ao carrinho');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData: { rating: number; comment: string }) => {
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
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">R$ {product.price.toFixed(2)}</p>
      
      <button 
        onClick={handleAddToCart} 
        disabled={loading}
        className={loading ? 'loading' : ''}
      >
        {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
      </button>

      <div className="reviews-section">
        <h4>Avaliações</h4>
        {loading ? (
          <p>Carregando avaliações...</p>
        ) : (
          <>
            {reviews.map(review => (
              <div key={review.id} className="review">
                <p>{review.comment}</p>
                <p>Nota: {review.rating}/5</p>
              </div>
            ))}
            <button onClick={loadReviews}>Recarregar Avaliações</button>
          </>
        )}
      </div>

      {user && (
        <div className="add-review">
          <h4>Adicionar Avaliação</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleAddReview({
              rating: Number(formData.get('rating')),
              comment: formData.get('comment') as string
            });
          }}>
            <input 
              type="number" 
              name="rating" 
              min="1" 
              max="5" 
              required 
              disabled={reviewLoading}
            />
            <textarea 
              name="comment" 
              required 
              disabled={reviewLoading}
            />
            <button type="submit" disabled={reviewLoading}>
              {reviewLoading ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductCard; 