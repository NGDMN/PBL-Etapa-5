import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="card h-100 cursor-pointer"
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">R$ {product.price.toFixed(2)}</p>
        </div>
      </div>

      <ProductDetailModal
        product={product}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default ProductCard; 