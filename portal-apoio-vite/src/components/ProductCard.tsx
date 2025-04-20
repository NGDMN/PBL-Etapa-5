import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {isOutOfStock && (
          <div className="out-of-stock-overlay">
            <span>Item fora de estoque</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        {!isOutOfStock && (
          <p className="price">R$ {product.price.toFixed(2)}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard; 