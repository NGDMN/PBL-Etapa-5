import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount,
    checkout
  } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});

  const handleRemoveFromCart = async (productId) => {
    try {
      setUpdatingItems(prev => ({ ...prev, [productId]: true }));
      await removeFromCart(productId);
      toast.success('Produto removido do carrinho');
    } catch (error) {
      toast.error('Erro ao remover produto do carrinho');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdatingItems(prev => ({ ...prev, [productId]: true }));
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      toast.error('Erro ao atualizar quantidade');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para finalizar a compra');
      return;
    }

    try {
      setLoading(true);
      await checkout();
      toast.success('Compra finalizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao finalizar compra');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione produtos para começar a comprar</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Seu Carrinho ({getCartCount()} itens)</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.image} alt={item.product.name} />
            <div className="item-details">
              <h3>{item.product.name}</h3>
              <p>R$ {item.product.price.toFixed(2)}</p>
              
              <div className="quantity-control">
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  disabled={updatingItems[item.product.id]}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  disabled={updatingItems[item.product.id]}
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveFromCart(item.product.id)}
                disabled={updatingItems[item.product.id]}
                className="remove-button"
              >
                {updatingItems[item.product.id] ? '...' : 'Remover'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: R$ {getCartTotal().toFixed(2)}</h3>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="checkout-button"
        >
          {loading ? 'Finalizando...' : 'Finalizar Compra'}
        </button>
      </div>
    </div>
  );
};

export default Cart; 