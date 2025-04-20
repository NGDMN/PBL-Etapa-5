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

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <h4>Descrição</h4>
            <p>{product.description}</p>
            <h4>Preço</h4>
            <p className="h5">R$ {product.price.toFixed(2)}</p>
            <h4>Avaliação</h4>
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= product.average_rating ? "#ffc107" : "#e4e5e9"}
                  size={20}
                />
              ))}
              <span className="ms-2">({product.average_rating.toFixed(1)})</span>
            </div>
            <h4>Estoque</h4>
            <p>{product.stock} unidades</p>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={quantity > product.stock}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h4>Avaliações</h4>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{review.user.username}</h5>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          color={star <= review.rating ? "#ffc107" : "#e4e5e9"}
                          size={15}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="card-text">{review.comment}</p>
                  <small className="text-muted">
                    {new Date(review.created_at).toLocaleDateString()}
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