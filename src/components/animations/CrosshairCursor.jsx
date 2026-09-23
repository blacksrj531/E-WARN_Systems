import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CrosshairCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
    >
      <div className={`relative w-8 h-8 transition-transform duration-200 ${isHovering ? 'scale-125 rotate-45' : 'scale-100 rotate-0'}`}>
        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 w-[10px] h-[2px] bg-cyan-400 -translate-y-1/2 shadow-[0_0_5px_cyan]" />
        <div className="absolute top-1/2 right-0 w-[10px] h-[2px] bg-cyan-400 -translate-y-1/2 shadow-[0_0_5px_cyan]" />
        <div className="absolute left-1/2 top-0 w-[2px] h-[10px] bg-cyan-400 -translate-x-1/2 shadow-[0_0_5px_cyan]" />
        <div className="absolute left-1/2 bottom-0 w-[2px] h-[10px] bg-cyan-400 -translate-x-1/2 shadow-[0_0_5px_cyan]" />
        
        {/* Center dot */}
        <div className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${isHovering ? 'bg-white' : 'bg-cyan-400 shadow-[0_0_5px_cyan]'}`} />
      </div>
    </motion.div>
  );
};
