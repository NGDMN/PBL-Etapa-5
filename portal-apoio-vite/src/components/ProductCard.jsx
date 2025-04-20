import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <>
      <div
        className="card h-100 cursor-pointer"
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        {imgError ? (
          <div 
            className="card-img-top d-flex align-items-center justify-content-center" 
            style={{ height: '200px', backgroundColor: '#f8f9fa' }}
          >
            <span className="text-muted">Imagem não disponível</span>
          </div>
        ) : (
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={handleImageError}
          />
        )}
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