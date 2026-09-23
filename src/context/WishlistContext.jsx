import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  // In a real app, this would be fetched from a database based on the user.
  // For the prototype, we use localStorage keyed by the user's email if logged in.
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const saved = localStorage.getItem(`ewarn_wishlist_${user.email}`);
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      }
    } else {
      setWishlistItems([]); // clear if logged out
    }
  }, [isAuthenticated, user]);

  // Save wishlist whenever it changes (if authenticated)
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

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
