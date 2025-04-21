import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, show, onHide }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Garantir valores seguros
  const safeProduct = {
    id: product?.id || 0,
    name: product?.name || 'Produto sem nome',
    description: product?.description || 'Sem descrição disponível',
    price: Number(product?.price) || 0,
    stock: Number(product?.stock) || 0,
    image: product?.image || '/placeholder-image.jpg',
    average_rating: Number(product?.average_rating) || 0
  };

  const handleAddToCart = () => {
    addToCart(safeProduct, quantity);
    onHide();
  };

  // Formatar preço sempre retornando string com 2 casas decimais
  const formatPrice = (price) => {
    return (Number(price) || 0).toFixed(2);
  };

  // Formatar avaliação sempre retornando string com 1 casa decimal
  const formatRating = (rating) => {
    return (Number(rating) || 0).toFixed(1);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{safeProduct.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img
              src={safeProduct.image}
              alt={safeProduct.name}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
                e.target.onerror = null;
              }}
            />
          </div>
          <div className="col-md-6">
            <h4>Descrição</h4>
            <p>{safeProduct.description}</p>
            <h4>Preço</h4>
            <p className="h5">R$ {formatPrice(safeProduct.price)}</p>
            <h4>Avaliação</h4>
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= safeProduct.average_rating ? "#ffc107" : "#e4e5e9"}
                  size={20}
                />
              ))}
              <span className="ms-2">({formatRating(safeProduct.average_rating)})</span>
            </div>
            <h4>Estoque</h4>
            <p>{safeProduct.stock} unidades</p>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={safeProduct.stock || 1}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={quantity > safeProduct.stock}
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