import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Animation state
  const [flyingItems, setFlyingItems] = useState([]);

  const addToCart = (product, quantity, event) => {
    const maxStock = typeof product.stock === 'number' ? product.stock : 999;
    if (maxStock <= 0) {
      alert(`Sorry, ${product.name} is currently out of stock.`);
      return false;
    }

    let itemExceeded = false;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const targetQty = existing.quantity + quantity;
        if (targetQty > maxStock) {
          itemExceeded = true;
          alert(`Cannot add more. You already have ${existing.quantity} in cart and only ${maxStock} are in stock.`);
          return prev.map(item => item.id === product.id ? { ...item, quantity: maxStock } : item);
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: targetQty } : item);
      }
      const initialQty = Math.min(quantity, maxStock);
      if (quantity > maxStock) {
        alert(`Only ${maxStock} available in stock. Added maximum available quantity to cart.`);
      }
      return [...prev, { ...product, quantity: initialQty }];
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
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const maxStock = typeof item.stock === 'number' ? item.stock : 999;
        if (newQuantity > maxStock) {
          alert(`Cannot increase quantity. Maximum available stock is ${maxStock}.`);
          return { ...item, quantity: maxStock };
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      flyingItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
