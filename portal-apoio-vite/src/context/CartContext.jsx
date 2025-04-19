import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { user } = useAuth();

  // Get cart key based on user authentication
  const getCartKey = () => {
    return user ? `cart_${user.id}` : 'cart_guest';
  };

  // Get purchased items key based on user authentication
  const getPurchasedItemsKey = () => {
    return user ? `purchased_${user.id}` : null;
  };

  // Load cart from localStorage
  useEffect(() => {
    const cartKey = getCartKey();
    const purchasedKey = getPurchasedItemsKey();
    const savedCart = localStorage.getItem(cartKey);
    const savedPurchased = purchasedKey ? localStorage.getItem(purchasedKey) : null;
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }

    if (savedPurchased) {
      setPurchasedItems(JSON.parse(savedPurchased));
    } else {
      setPurchasedItems([]);
    }
  }, [user]);

  // Save cart to localStorage
  useEffect(() => {
    const cartKey = getCartKey();
    const purchasedKey = getPurchasedItemsKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    if (purchasedKey) {
      localStorage.setItem(purchasedKey, JSON.stringify(purchasedItems));
    }
  }, [cartItems, purchasedItems, user]);

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
    // Add items to purchased items
    setPurchasedItems(prev => [...prev, ...cartItems]);
    clearCart();
    toast.success('Compra realizada com sucesso!');
  };

  const hasPurchasedItem = (productId) => {
    return purchasedItems.some(item => item.id === productId);
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
      checkout,
      hasPurchasedItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 