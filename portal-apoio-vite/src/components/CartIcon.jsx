import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getCartCount, setIsCartOpen } = useCart();

  return (
    <div 
      className="cart-icon position-relative d-inline-block cursor-pointer"
      onClick={() => setIsCartOpen(true)}
    >
      <FaShoppingCart size={24} color="white" />
      {getCartCount() > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {getCartCount()}
        </span>
      )}
    </div>
  );
};

export default CartIcon; 