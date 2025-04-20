import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { cart } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  // Load cart from backend
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartData = await cart.getCart();
          setCartItems(cartData.items || []);
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error);
        }
      } else {
        setCartItems([]);
      }
    };

    loadCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (quantity <= 0) {
      toast.error('Quantidade inválida');
      return;
    }

    try {
      const cartData = await cart.getCart();
      await cart.addItem(cartData.id, product.id, quantity);
      
      // Atualiza o estado local
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });

      toast.success('Produto adicionado ao carrinho');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar ao carrinho');
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const cartData = await cart.getCart();
      await cart.removeItem(cartData.id, productId, 1);
      
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      toast.success('Produto removido do carrinho');
    } catch (error) {
      toast.error('Erro ao remover do carrinho');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const cartData = await cart.getCart();
      const currentItem = cartItems.find(item => item.product.id === productId);
      const quantityDiff = newQuantity - currentItem.quantity;

      if (quantityDiff > 0) {
        await cart.addItem(cartData.id, productId, quantityDiff);
      } else {
        await cart.removeItem(cartData.id, productId, -quantityDiff);
      }

      setCartItems(prev => prev.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }));
    } catch (error) {
      toast.error('Erro ao atualizar quantidade');
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho esvaziado');
  };

  const checkout = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    // Implementar checkout
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      isLoginModalOpen,
      setIsCartOpen,
      setIsLoginModalOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartCount,
      clearCart,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 