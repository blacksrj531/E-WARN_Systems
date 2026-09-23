import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export const FlyToCart = () => {
  const { flyingItems } = useCart();
  const [targetCoords, setTargetCoords] = useState({ x: window.innerWidth - 50, y: 30 });

  useEffect(() => {
    const updateTarget = () => {
      const cartIcon = document.getElementById('navbar-cart-icon');
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        setTargetCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };
    
    updateTarget();
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget);
    
    // Also poll slightly in case the navbar is animating down
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
        {flyingItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ 
              x: item.x - 12, 
              y: item.y - 12, 
              scale: 1, 
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
            className="absolute w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.8)] z-[100]"
          >
            +{item.qty}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
