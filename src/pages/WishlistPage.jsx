import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, HeartCrack } from 'lucide-react';
import { motion } from 'framer-motion';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/wishlist');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; // Avoid flicker before redirect

  const handleMoveToCart = (product, e) => {
    // Add to cart with animation
    addToCart(product, 1, e);
    // Remove from wishlist
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-black text-ewarn-dark tracking-tight mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <HeartCrack className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Explore our inventory and save your favorite components for later.</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-ewarn-dark text-white font-bold py-3 px-8 rounded-full shadow hover:bg-slate-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative group"
              >
                {/* Remove from wishlist button */}
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                  title="Remove from Wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* Image */}
                <div 
                  className="relative aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 
                    className="text-sm font-bold text-slate-900 leading-tight mb-4 cursor-pointer hover:text-cyan-600 transition-colors line-clamp-2"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto flex flex-col gap-3">
                    <span className="text-lg font-black text-slate-900">{product.price}</span>
                    <button 
                      onClick={(e) => handleMoveToCart(product, e)}
                      className="w-full bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white border border-cyan-100 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
