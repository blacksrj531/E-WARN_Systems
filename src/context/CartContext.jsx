import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Animation state
  const [flyingItems, setFlyingItems] = useState([]);

  const addToCart = (product, quantity, event) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });

    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;
      
      const newId = Date.now() + Math.random();
      setFlyingItems(prev => [...prev, { id: newId, x: startX, y: startY, qty: quantity }]);
      
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== newId));
      }, 1000);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      flyingItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
