import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
      </div>
    </div>
  );
};

export default ProductCard; 