import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TextReveal } from '../animations/TextReveal';
import { ArrowRight, Cpu, Activity, Terminal, Wifi, Crosshair, Search } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveX = mousePosition.x * 40; 
  const moveY = mousePosition.y * 40;

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <div ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#020617] pt-20 selection:bg-cyan-500/30">
      
      {/* 1. Hardware/Schematic Blueprint Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '120px 120px' }}
      />

      {/* 2. Scanner Sweep Animation */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_20px_4px_rgba(34,211,238,0.4)] z-0 pointer-events-none"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />

      {/* 3. HUD Telemetry Widgets (Parallax) */}
      <motion.div 
        animate={{ x: moveX * -2, y: moveY * -2 }}
        transition={{ type: "spring", stiffness: 40 }}
        className="hidden lg:flex absolute top-[25%] left-[8%] flex-col gap-2 z-10 font-mono"
      >
        <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-widest border border-cyan-900/50 bg-cyan-950/40 p-2 backdrop-blur-md">
          <Terminal className="w-4 h-4" /> SYS.STATUS // ONLINE
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs tracking-widest border border-slate-800/50 bg-slate-900/40 p-2 backdrop-blur-md">
          <Activity className="w-4 h-4" /> VOLTAGE // 3.3V - 5.0V
        </div>
        
        {/* Animated mini-waveform SVG */}
        <div className="h-8 w-full border border-cyan-900/50 bg-cyan-950/20 mt-1 flex items-center px-1 overflow-hidden">
          <motion.svg width="200" height="20" className="opacity-70">
            <motion.path
              d="M 0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10"
              stroke="#22d3ee" strokeWidth="1.5" fill="none"
              animate={{ x: [-60, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.svg>
        </div>
      </motion.div>

      <motion.div 
        animate={{ x: moveX * 2, y: moveY * 2 }}
        transition={{ type: "spring", stiffness: 40 }}
        className="hidden lg:flex absolute bottom-[30%] right-[8%] flex-col gap-2 z-10 font-mono items-end"
      >
        <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-widest border border-cyan-900/50 bg-cyan-950/40 p-2 backdrop-blur-md">
          DATA.LINK // ESTABLISHED <Wifi className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs tracking-widest border border-slate-800/50 bg-slate-900/40 p-2 backdrop-blur-md">
          LATENCY // 4ms <Crosshair className="w-4 h-4" />
        </div>
        {/* Hex decor */}
        <div className="grid grid-cols-4 gap-1 mt-2">
          {[...Array(16)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ opacity: [0.2, 0.8, 0.2] }} 
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-2 bg-cyan-500/40"
            />
          ))}
        </div>
      </motion.div>

      {/* 4. Main Content: Hardware / Schematic Panel */}
      <motion.div 
        animate={{ x: moveX * -0.5, y: moveY * -0.5 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center max-w-5xl"
      >
        <div className="relative bg-slate-950/80 backdrop-blur-xl border border-cyan-900/40 p-10 md:p-20 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col items-center w-full">
          
          {/* Tech Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

          {/* Crosshairs on edges */}
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-[1px] bg-cyan-500/50" />
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-[1px] bg-cyan-500/50" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-cyan-500/50" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-cyan-500/50" />

          <TextReveal 
            text="Engineer the next generation." 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8 text-balance drop-shadow-2xl uppercase"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-mono"
          >
            &gt; Discover premium microprocessors, precise sensors, and professional-grade accessories. Build your next masterpiece with EWARN.
          </motion.p>

          {/* Smart Search Box - Moved Below Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 w-full max-w-lg relative z-[60]"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input 
                type="text"
                placeholder="SEARCH INVENTORY // ESP32, Sensors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 px-12 py-4 font-mono text-sm placeholder:text-cyan-700 focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] uppercase"
              />
            </div>
            
            <AnimatePresence>
              {isSearchFocused && searchTerm.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-cyan-500/30 shadow-2xl overflow-hidden z-50 text-left"
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex items-center gap-4 p-3 border-b border-cyan-900/30 hover:bg-cyan-950 cursor-pointer transition-colors"
                      >
                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-1 shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-sm mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-cyan-300 font-mono">{product.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{product.category} • {product.price}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500 font-mono text-sm">
                      NO MATCHING HARDWARE FOUND
                    </div>
                  )}
                  <div 
                    onClick={() => navigate(`/products?search=${searchTerm}`)}
                    className="p-3 bg-cyan-950 hover:bg-cyan-900 text-center text-xs text-cyan-400 cursor-pointer font-mono border-t border-cyan-500/50"
                  >
                    VIEW ALL RESULTS
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center font-mono w-full relative z-10"
          >
            <button onClick={() => navigate('/products')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-5 font-bold transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.4)] w-full sm:w-auto">
              INITIATE_CART <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/products')} className="bg-slate-950 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 px-10 py-5 font-bold transition-colors flex items-center justify-center gap-2 hover:bg-cyan-900/50 w-full sm:w-auto">
              <Cpu className="w-5 h-5" /> EXPLORE_LAB
            </button>
          </motion.div>
        </div>
      </motion.div>
      
    </div>
  );
};
