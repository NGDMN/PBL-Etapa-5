import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';
import { FaBox } from 'react-icons/fa';

const DEFAULT_IMAGE = 'https://placehold.co/600x400?text=Imagem+não+disponível';

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
    image: product?.image || DEFAULT_IMAGE,
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
            <div className="text-center">
              <FaBox size={48} className="text-secondary mb-2" />
              <p className="text-muted mb-0">Imagem não disponível</p>
            </div>
          </div>
        ) : (
          <img
            src={safeProduct.image}
            className="card-img-top"
            alt={safeProduct.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={handleImageError}
            loading="lazy"
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