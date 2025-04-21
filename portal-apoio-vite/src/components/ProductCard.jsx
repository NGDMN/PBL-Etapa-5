import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
    console.error(`Erro ao carregar imagem para o produto: ${product?.name}`);
  };

  // Se o produto não existir, não renderiza nada
  if (!product) {
    console.warn('Tentativa de renderizar ProductCard sem dados de produto');
    return null;
  }

  const formatPrice = (price) => {
    // Converte para número e verifica se é válido
    const numericPrice = Number(price);
    if (!isNaN(numericPrice) && isFinite(numericPrice)) {
      return numericPrice.toFixed(2);
    }
    return '0.00';
  };

  // Placeholders para valores faltantes
  const productName = product.name || 'Produto sem nome';
  const productImage = product.image || '/placeholder-image.jpg';
  const productPrice = formatPrice(product.price);
  const productStock = product.stock || 0;

  return (
    <>
      <div
        className="card h-100 shadow-sm"
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        {imgError ? (
          <div 
            className="card-img-top d-flex align-items-center justify-content-center bg-light" 
            style={{ height: '200px' }}
          >
            <span className="text-muted">Imagem não disponível</span>
          </div>
        ) : (
          <img
            src={productImage}
            className="card-img-top"
            alt={productName}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={handleImageError}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <p className="card-text mb-0">R$ {productPrice}</p>
          <small className="text-muted">Estoque: {productStock} unidades</small>
        </div>
      </div>

      {showModal && (
        <ProductDetailModal
          product={product}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard; 