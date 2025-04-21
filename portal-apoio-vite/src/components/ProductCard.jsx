import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Garantir que temos valores seguros
  const safeProduct = {
    id: product?.id || 0,
    name: product?.name || 'Produto sem nome',
    description: product?.description || 'Sem descrição disponível',
    price: Number(product?.price) || 0,
    stock: Number(product?.stock) || 0,
    image: product?.image || '/placeholder-image.jpg',
    average_rating: Number(product?.average_rating) || 0
  };

  const handleImageError = () => {
    setImgError(true);
    console.error(`Erro ao carregar imagem para o produto: ${safeProduct.name}`);
  };

  // Formatar preço sempre retornando string com 2 casas decimais
  const formatPrice = (price) => {
    return (Number(price) || 0).toFixed(2);
  };

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
            src={safeProduct.image}
            className="card-img-top"
            alt={safeProduct.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={handleImageError}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{safeProduct.name}</h5>
          <p className="card-text mb-0">R$ {formatPrice(safeProduct.price)}</p>
          <small className="text-muted">Estoque: {safeProduct.stock} unidades</small>
        </div>
      </div>

      {showModal && (
        <ProductDetailModal
          product={safeProduct}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard; 