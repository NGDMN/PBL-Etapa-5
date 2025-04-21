import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, show, onHide }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onHide();
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return '0.00';
  };

  const formatRating = (rating) => {
    if (typeof rating === 'number') {
      return rating.toFixed(1);
    }
    return '0.0';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product?.name || 'Produto sem nome'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img
              src={product?.image || '/placeholder-image.jpg'}
              alt={product?.name || 'Produto'}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <h4>Descrição</h4>
            <p>{product?.description || 'Sem descrição disponível'}</p>
            <h4>Preço</h4>
            <p className="h5">R$ {formatPrice(product?.price)}</p>
            <h4>Avaliação</h4>
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= (product?.average_rating || 0) ? "#ffc107" : "#e4e5e9"}
                  size={20}
                />
              ))}
              <span className="ms-2">({formatRating(product?.average_rating)})</span>
            </div>
            <h4>Estoque</h4>
            <p>{product?.stock || 0} unidades</p>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product?.stock || 1}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={quantity > (product?.stock || 0)}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h4>Avaliações</h4>
          {product?.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{review.user?.username || 'Usuário'}</h5>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          color={star <= (review.rating || 0) ? "#ffc107" : "#e4e5e9"}
                          size={15}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="card-text">{review.comment || 'Sem comentário'}</p>
                  <small className="text-muted">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Data não disponível'}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma avaliação disponível.</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailModal; 