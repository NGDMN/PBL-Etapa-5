import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartModal = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    checkout
  } = useCart();

  const formatPrice = (price) => {
    // Converte para número e verifica se é válido
    const numericPrice = Number(price);
    if (!isNaN(numericPrice) && isFinite(numericPrice)) {
      return numericPrice.toFixed(2);
    }
    return '0.00';
  };

  if (cartItems.length === 0) {
    return (
      <Modal show={isCartOpen} onHide={() => setIsCartOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carrinho de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Seu carrinho está vazio</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={isCartOpen} onHide={() => setIsCartOpen(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Carrinho de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>R$ {formatPrice(item.price)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td>R$ {formatPrice(item.price * item.quantity)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4>Total: R$ {formatPrice(getCartTotal())}</h4>
          <button className="btn btn-success" onClick={checkout}>
            Finalizar Compra
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal; 