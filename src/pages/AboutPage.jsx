import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, GraduationCap, CheckCircle, Zap, Download, ExternalLink, Package, ShieldCheck, CheckCircle2, ArrowRight, Quote, Mail } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '../components/common/ContactModal';

export const AboutPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Hero Section */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617] pt-24 pb-12">
        <style>{`
          @keyframes slide-grid {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-40px, -40px, 0); }
          }
          @keyframes orb-pulse {
            0%, 100% { opacity: 0.3; transform: translate3d(-50%, -50%, 0) scale(1); }
            50% { opacity: 0.6; transform: translate3d(-50%, -50%, 0) scale(1.05); }
          }
          @keyframes orb-pulse-alt {
            0%, 100% { opacity: 0.1; transform: translate3d(0, 0, 0) scale(1); }
            50% { opacity: 0.4; transform: translate3d(0, 0, 0) scale(1.1); }
          }
          .gpu-grid {
            animation: slide-grid 4s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
          }
          .gpu-orb-1 {
            animation: orb-pulse 8s ease-in-out infinite;
            will-change: opacity, transform;
            backface-visibility: hidden;
          }
          .gpu-orb-2 {
            animation: orb-pulse-alt 12s ease-in-out infinite;
            will-change: opacity, transform;
            backface-visibility: hidden;
          }
        `}</style>

        {/* Pure CSS GPU-Accelerated Grid */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="gpu-grid absolute -top-10 -left-10 w-[calc(100%+80px)] h-[calc(100%+80px)] opacity-20" 
            style={{ 
              backgroundImage: 'radial-gradient(#22d3ee 1.5px, transparent 1.5px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>
        
        {/* Pure CSS GPU-Accelerated Glowing Orbs */}
        <div 
          className="gpu-orb-1 absolute top-1/2 left-1/2 w-[800px] h-[800px] pointer-events-none z-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 60%)' }}
        />
        <div 
          className="gpu-orb-2 absolute top-1/4 right-1/4 w-[600px] h-[600px] pointer-events-none z-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(30,58,138,0.2) 0%, transparent 60%)' }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center text-center mt-12 md:mt-0 pb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-[64px] font-black text-white tracking-tight mb-8 leading-tight drop-shadow-2xl"
          >
            EWARN Hands-on Laboratory Ecosystem
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 font-bold px-6 py-3.5 rounded-full text-sm md:text-lg mb-12 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            Developed by Professors of IISc Bangalore, IIT Patna and NIT Rourkela
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-lg md:text-2xl mb-16 font-medium"
          >
            Selling by <span className="text-white font-black tracking-wide">Ewarn System</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 w-full"
          >
            {[
              { icon: Star, text: "Empowering Innovation", color: "text-yellow-400" },
              { icon: GraduationCap, text: "Building Future Skills", color: "text-emerald-400" },
              { icon: CheckCircle, text: "Driving Research Excellence", color: "text-blue-400" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 px-6 py-4 rounded-full shadow-lg cursor-default group hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm md:text-[15px] font-bold text-slate-100">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Superb Tech Divider (Optimized/Static to prevent mobile flickering) */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 z-10 pointer-events-none translate-y-[1px]">
          <div 
            className="absolute bottom-0 left-0 w-full h-full bg-cyan-400"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-full bg-[#020617]"
            style={{ clipPath: "polygon(0 100%, 100% 10%, 100% 100%)" }}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-full bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 20%, 100% 100%)" }}
          />
        </div>
      </div>

      {/* Our Ecosystem Section */}
      <div className="bg-white py-16 md:py-24 px-6 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="w-8 h-8 text-cyan-500 fill-cyan-500/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Our Ecosystem
            </h2>
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              This brochure offers an in-depth look at the <span className="text-cyan-600 font-bold">EWARN Hands-on Laboratory Ecosystem</span>, designed to empower innovation, skill development, and research excellence. It presents detailed module descriptions, technical specifications, and competitive bulk order pricing, along with an exclusive partner pricing section for our authorized marketing and distribution associates.
            </p>
            <p>
              Each kit is a complete, ready-to-use solution, fully supported with comprehensive documentation, step-by-step manuals, verified source codes, and guided experiments ensuring a seamless learning and implementation experience. With EWARN, institutions and partners can bring cutting-edge technology directly into their classrooms and labs, accelerating both education and innovation.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-10">
            <a 
              href="/EWARN_IoT_Brochure.pdf" 
              download="EWARN_IoT_Brochure.pdf"
              className="!bg-cyan-500 hover:!bg-cyan-400 !text-slate-900 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-cyan-500/20 group cursor-pointer"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Download Product Brochure
            </a>
            <a 
              href="https://platform.iotews.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="!bg-slate-900 hover:!bg-black !text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-slate-900/20 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Access IoT Platform
            </a>
          </motion.div>
        </motion.div>
      </div>
      {/* Future of Learning Section */}
      <div className="bg-slate-50 py-24 px-6 border-t border-gray-100 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Step Into The <span className="text-cyan-600">Future of Learning</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              A complete, ready-to-use solution designed for colleges, universities, and research institutions. Developed with a focus on emerging technologies like <span className="font-bold text-cyan-700">IoT, 5G/6G, AI/ML, and smart sensing</span>, our ecosystem brings industry-grade tools and knowledge directly into the classroom.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: What's Inside */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Package className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">What's Inside</h3>
              </div>

              <ul className="space-y-6">
                {[
                  { title: "Cutting-edge Modules:", desc: "Detailed descriptions, specifications, and real-world use cases" },
                  { title: "Flexible Pricing:", desc: "Competitive bulk order rates & exclusive partner pricing for authorized distributors" },
                  { title: "All-in-One Learning Kit:", desc: "Documentation, step-by-step manuals, verified source codes, and guided experiments" },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed"><strong className="text-slate-900">{item.title}</strong> {item.desc}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: Why Choose EWARN */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-cyan-900/20 border border-slate-800 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/30 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black text-white">Why Choose EWARN</h3>
              </div>

              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed">Aligns with <strong className="text-white">AICTE-recommended curricula</strong></p>
                </li>
                
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-slate-300 leading-relaxed w-full">
                    <p className="mb-3">Supports multiple communication protocols:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Wi-Fi", "Bluetooth", "LoRa", "GSM", "GPRS", "FSO"].map(proto => (
                        <span key={proto} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-cyan-100">{proto}</span>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed">Accelerates <strong className="text-white">full-stack product development</strong> in both hardware and software</p>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Innovators Quote Section */}
      <div className="bg-white py-24 md:py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Decorative floating sparks */}
        <motion.div 
          animate={{ y: [-15, 15, -15], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 md:left-1/4 opacity-20 pointer-events-none"
        >
          <Star className="w-10 h-10 text-cyan-500 fill-cyan-500" />
        </motion.div>
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [0, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 md:right-1/4 opacity-20 pointer-events-none"
        >
          <Star className="w-8 h-8 text-cyan-500 fill-cyan-500" />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-block mb-6"
          >
            <Quote className="w-16 h-16 md:w-20 md:h-20 text-cyan-100 mx-auto rotate-180" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.2] md:leading-[1.2] tracking-tight italic"
          >
            With EWARN, you don't just teach technology, <br className="hidden md:block" />
            <span className="text-cyan-600 not-italic inline-block mt-2 relative">
              you create innovators.
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-cyan-200/50 -z-10 rounded-full skew-x-12"></span>
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Partner CTA Section */}
      <div className="relative py-24 md:py-32 px-6 bg-[#020617] overflow-hidden border-t border-slate-800">
        {/* Background GPU-safe Glow */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-full max-w-4xl h-full absolute"
            style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(8,145,178,0.2) 0%, transparent 70%)' }} 
          />
          {/* Subtle Grid overlay for texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ 
              backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
              backgroundSize: '30px 30px' 
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6"
          >
            Partner with us today
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-cyan-100/70 mb-12 font-medium max-w-2xl mx-auto"
          >
            Bring cutting-edge tech education to your institution or distribution network
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/products"
              className="w-full sm:w-auto !bg-white hover:!bg-cyan-50 !text-slate-900 font-black px-8 py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:-translate-y-1 group"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 !text-cyan-600 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button 
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-auto border-2 border-cyan-500/30 hover:border-cyan-400 !bg-cyan-950/20 hover:!bg-cyan-900/40 !text-white font-bold px-8 py-4.5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-none hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:-translate-y-1 group"
            >
              <Mail className="w-5 h-5 !text-cyan-400 group-hover:scale-110 transition-transform" />
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};
