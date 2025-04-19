import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  // Get cart key based on user authentication
  const getCartKey = () => {
    return user ? `cart_${user.id}` : 'cart_guest';
  };

  // Load cart from localStorage
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }
  }, [user]); // Reload cart when user changes

  // Save cart to localStorage
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, user]);

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (quantity <= 0) {
      toast.error('Quantidade inválida');
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        // Verificar estoque
        if (existingItem.quantity + quantity > product.stock) {
          toast.error('Quantidade excede o estoque disponível');
          return prev;
        }
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success('Produto adicionado ao carrinho');
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Produto removido do carrinho');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        if (newQuantity > item.stock) {
          toast.error('Quantidade excede o estoque disponível');
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
    // Processo de checkout
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