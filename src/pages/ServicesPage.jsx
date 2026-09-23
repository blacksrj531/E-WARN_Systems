import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, GraduationCap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'it-solution',
    title: 'IT Solution',
    shortTitle: 'IT',
    icon: Code2,
    description: 'End-to-end software solutions tailored for modern enterprises. From cloud infrastructure to custom enterprise applications, we deliver robust, scalable, and secure IT systems that drive digital transformation.',
    features: ['Cloud Architecture', 'Enterprise Software', 'Cybersecurity', 'API Integration'],
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'product-development',
    title: 'Product Development',
    shortTitle: 'Product',
    icon: Cpu,
    description: 'Turning innovative ideas into market-ready IoT and embedded hardware products. Our engineering team handles everything from PCB design and firmware development to industrial prototyping and mass production.',
    features: ['PCB Design', 'Firmware Engineering', 'Rapid Prototyping', 'IoT Hardware'],
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'training',
    title: 'Training',
    shortTitle: 'Training',
    icon: GraduationCap,
    description: 'Empowering the next generation of engineers. We provide intensive, hands-on industrial training and workshops using our proprietary IoT kits to bridge the gap between academic learning and industry demands.',
    features: ['IoT Workshops', 'Embedded Systems', 'Corporate Training', 'Academic MoUs'],
    bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200'
  }
];

export const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle item (Product Development)
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-cyan-100 border border-cyan-200">
            <span className="text-sm font-bold text-cyan-700 tracking-wide uppercase">What We Do</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Choose a pillar to explore our specialized capabilities in software, hardware, and education.
          </p>
        </motion.div>

        {/* Expanding Cards Container */}
        <div className="flex flex-col lg:flex-row h-[75vh] min-h-[500px] lg:h-[600px] gap-4 w-full max-w-6xl mx-auto">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveIndex(index)}
                initial={{ borderRadius: '1.5rem' }}
                className={`relative overflow-hidden cursor-pointer group flex-shrink-0 origin-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive 
                    ? 'flex-[5] lg:flex-[3] shadow-2xl shadow-cyan-900/20 z-10' 
                    : 'flex-[1] shadow-md hover:shadow-xl opacity-80 hover:opacity-100 z-0'
                }`}
                style={{
                  borderRadius: isActive ? '2rem' : '1.5rem'
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.img 
                    layout
                    src={service.bgImage} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform origin-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Dynamic Gradient Overlays */}
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ${
                      isActive 
                        ? 'bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-100' 
                        : 'bg-slate-900/60 group-hover:bg-slate-900/40 opacity-100'
                    }`} 
                  />
                </div>

                {/* Shrunk Content (Icon & Vertical Text) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="absolute inset-0 flex flex-row lg:flex-col items-center justify-center lg:justify-end lg:pb-12 gap-4 lg:gap-8"
                    >
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Mobile Text (Horizontal) */}
                      <h3 className="lg:hidden text-white font-black text-xl tracking-widest uppercase">
                        {service.shortTitle}
                      </h3>

                      {/* Desktop Text (Vertical/Rotated) safely contained */}
                      <div className="hidden lg:flex items-center justify-center h-48 w-full relative">
                        <h3 className="text-white font-black text-2xl tracking-widest uppercase -rotate-90 absolute whitespace-nowrap">
                          {service.shortTitle}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Active Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.4 } }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end"
                    >
                      <div className="max-w-2xl">
                        <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/40 border border-cyan-400">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
                          {service.title}
                        </h2>
                        
                        <p className="text-slate-200 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-8 max-w-xl drop-shadow">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-cyan-50 font-bold text-sm sm:text-base">
                              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (service.id === 'it-solution') navigate('/services/it');
                            if (service.id === 'product-development') navigate('/services/product-development');
                          }}
                          className="inline-flex items-center gap-2 bg-white hover:bg-cyan-50 text-slate-900 font-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all shadow-xl hover:shadow-cyan-500/20 active:scale-95 group/btn"
                        >
                          Learn More 
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
