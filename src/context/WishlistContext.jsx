import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [flyingWishlistItems, setFlyingWishlistItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const saved = localStorage.getItem(`ewarn_wishlist_${user.email}`);
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      }
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem(`ewarn_wishlist_${user.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated, user]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product, event) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      
      // Add and animate if adding
      if (event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const newId = Date.now() + Math.random();
        setFlyingWishlistItems(f => [...f, { id: newId, x: startX, y: startY }]);
        setTimeout(() => {
          setFlyingWishlistItems(f => f.filter(item => item.id !== newId));
        }, 1000);
      }
      
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      flyingWishlistItems
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
