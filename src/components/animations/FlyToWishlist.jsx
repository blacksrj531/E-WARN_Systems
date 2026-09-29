import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';

export const FlyToWishlist = () => {
  const { flyingWishlistItems } = useWishlist();
  const [targetCoords, setTargetCoords] = useState({ x: window.innerWidth - 100, y: 30 });

  useEffect(() => {
    const updateTarget = () => {
      const wishlistIcon = document.getElementById('navbar-wishlist-icon');
      if (wishlistIcon) {
        const rect = wishlistIcon.getBoundingClientRect();
        setTargetCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };
    
    updateTarget();
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget);
    
    const interval = setInterval(updateTarget, 100);
    return () => {
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {flyingWishlistItems?.map(item => (
          <motion.div
            key={item.id}
            initial={{ 
              x: item.x - 12, 
              y: item.y - 12, 
              scale: 1.5, 
              opacity: 1 
            }}
            animate={{ 
              x: targetCoords.x - 12, 
              y: targetCoords.y - 12, 
              scale: 0.2,
              opacity: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              x: { duration: 0.8, ease: "linear" },
              y: { duration: 0.8, ease: "easeIn" },
              scale: { duration: 0.8 },
              opacity: { duration: 0.8 }
            }}
            className="absolute w-8 h-8 flex items-center justify-center text-rose-500 font-bold text-2xl drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] z-[100]"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
