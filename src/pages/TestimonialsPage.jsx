import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';

const ParallaxCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Exaggerated 3D rotation based on mouse position
  const rotateX = useTransform(y, [-200, 200], [25, -25]);
  const rotateY = useTransform(x, [-200, 200], [-25, 25]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Generate crazy enter animations
  const randomY = index % 2 === 0 ? -150 : 150;
  const randomRotate = index % 2 === 0 ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: randomY, rotateZ: randomRotate, scale: 0.3 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        type: "spring", 
        bounce: 0.6,
        delay: index * 0.15 
      }}
      style={{ perspective: 1200 }}
      className="relative group z-10 hover:z-50"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(8,112,184,0.15)] cursor-crosshair relative"
      >
        {/* Floating Quote Icon */}
        <motion.div 
          style={{ transform: "translateZ(100px)" }}
          className="absolute -top-6 -left-6 w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 z-30 transform -rotate-12 group-hover:rotate-12 transition-transform duration-500"
        >
          <Quote className="w-7 h-7 text-white fill-current" />
        </motion.div>

        {/* 3D Image Container */}
        <div 
          style={{ transform: "translateZ(50px)" }} 
          className="overflow-hidden rounded-[2rem] relative bg-slate-900"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60 mix-blend-multiply" />
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-72 sm:h-80 object-cover transform transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-3" 
          />
        </div>
        
        {/* Popped-out Text Card */}
        <div 
          style={{ transform: "translateZ(90px)" }} 
          className="relative z-20 -mt-16 bg-white/95 backdrop-blur-xl mx-4 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 transition-all duration-500 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-white"
        >
          <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-3 text-slate-900 group-hover:text-white transition-colors duration-500">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 group-hover:text-cyan-50 transition-colors duration-500">
            {item.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TestimonialsPage = () => {
  const testimonials = [
    {
      image: "/testimonials/4.jpg",
      title: "Partnership with NIT Rourkela",
      text: "Formalizing our strategic Memorandum of Understanding with the National Institute of Technology, Rourkela to drive advanced IoT research and Make in India initiatives."
    },
    {
      image: "/testimonials/3.jpg",
      title: "Capital Engineering College",
      text: "Bridging the gap between academia and industry. Our collaboration with Capital Engineering College empowers the next generation of engineers with real-world IoT skills."
    },
    {
      image: "/testimonials/1.jpg",
      title: "Global University Alliance",
      text: "Expanding our educational ecosystem through a strategic alliance with Global University, Bhubaneswar. Together, we are building state-of-the-art embedded system labs."
    },
    {
      image: "/testimonials/2.jpg",
      title: "Industrial Training & Workshops",
      text: "Empowering professionals and students through intensive hands-on workshops with our EWS All-in-One Arduino Mega IoT Grove Kits."
    }
  ];

  return (
    <div className="pt-32 pb-32 bg-[#020617] min-h-screen relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Crazy Floating Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.5, 1] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-indigo-500/10 to-cyan-400/10 blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Unrealistic Bouncing Header */}
        <motion.div 
          initial={{ opacity: 0, y: -100, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", bounce: 0.7, duration: 1.5 }}
          className="text-center max-w-4xl mx-auto mb-24"
          style={{ perspective: 1000 }}
        >
          <motion.h1 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Innovators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            From premier national institutes to leading engineering colleges, EWARN System is the trusted partner for next-generation IoT education and research.
          </motion.p>
        </motion.div>

        {/* The Grid of Crazy 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((item, index) => (
            <ParallaxCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
};
