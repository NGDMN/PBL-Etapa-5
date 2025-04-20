import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useReview } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Product, Review } from '../types';
import { products } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { getProductReviews, addReview } = useReview();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await products.getById(Number(id));
        setProduct(response);
        const productReviews = await getProductReviews(Number(id));
        setReviews(productReviews);
      } catch (error) {
        toast.error('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductReviews]);

  const handleAddToCart = async () => {
    if (!product) return;

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

  const handleAddReview = async (reviewData: { rating: number; comment: string }) => {
    if (!user) {
      toast.error('Você precisa estar logado para avaliar produtos');
      return;
    }

    try {
      setReviewLoading(true);
      await addReview(Number(id), reviewData);
      toast.success('Avaliação adicionada com sucesso!');
      const updatedReviews = await getProductReviews(Number(id));
      setReviews(updatedReviews);
    } catch (error) {
      toast.error('Erro ao adicionar avaliação');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading || !product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-main">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <p className="price">R$ {product.price.toFixed(2)}</p>
          <p className="stock">Estoque: {product.stock} unidades</p>
          
          {product.stock > 0 && (
            <div className="add-to-cart">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>
              <button 
                onClick={handleAddToCart} 
                disabled={loading}
                className={loading ? 'loading' : ''}
              >
                {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Avaliações</h2>
        {reviews.map(review => (
          <div key={review.id} className="review">
            <p>{review.comment}</p>
            <p>Nota: {review.rating}/5</p>
          </div>
        ))}

        {user && (
          <div className="add-review">
            <h3>Adicionar Avaliação</h3>
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
    </div>
  );
};

export default ProductDetail; 