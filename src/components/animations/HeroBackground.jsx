import { motion } from 'framer-motion';

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* 1. Subtle Circuit Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* 2. Animated Electronic Waves / Data Streams */}
      <div className="absolute inset-0">
        {/* Horizontal Stream 1 */}
        <motion.div
          className="absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Horizontal Stream 2 */}
        <motion.div
          className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20"
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        {/* Vertical Stream 1 */}
        <motion.div
          className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-20"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        {/* Vertical Stream 2 */}
        <motion.div
          className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      {/* 3. Floating Glassmorphic Microchips / Modules */}
      <motion.div 
        className="absolute top-[15%] left-[10%] w-32 h-32 rounded-3xl border border-gray-100 bg-white/40 backdrop-blur-sm shadow-xl flex items-center justify-center opacity-80"
        animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner Chip Core */}
        <div className="w-16 h-16 rounded-xl border border-blue-100 bg-blue-50/50 flex items-center justify-center relative">
          <div className="w-8 h-8 rounded-md bg-blue-100/80" />
          {/* Circuit nodes around the core */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-24 h-24 rounded-2xl border border-gray-100 bg-white/40 backdrop-blur-sm shadow-xl flex items-center justify-center opacity-70"
        animate={{ y: [0, 20, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
         <div className="w-12 h-12 rounded-lg border border-purple-100 bg-purple-50/50 flex items-center justify-center relative">
          <div className="w-4 h-4 rounded-sm bg-purple-200/80" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
        </div>
      </motion.div>

      {/* 4. Abstract Glowing Data Nodes */}
      <motion.div 
        className="absolute top-1/2 left-[20%] w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_20px_4px_rgba(96,165,250,0.5)]"
        animate={{ scale: [1, 2.5, 1], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[40%] right-[30%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_20px_4px_rgba(192,132,252,0.5)]"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-[35%] left-[35%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_3px_rgba(96,165,250,0.4)]"
        animate={{ scale: [1, 2, 1], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
};
