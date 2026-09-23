import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

export const ContactModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request for the flawless experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] relative z-10 overflow-y-auto overflow-x-hidden flex flex-col md:flex-row"
          >
            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:hidden p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column - Get in Touch */}
            <div className="bg-slate-50 p-6 sm:p-8 md:p-12 w-full md:w-5/12 border-b md:border-b-0 md:border-r border-slate-200 relative overflow-hidden shrink-0">
              {/* Subtle background decoration */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
              
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-10 relative z-10">Get in Touch</h3>
              
              <div className="space-y-6 md:space-y-8 relative z-10">
                <div className="flex gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Email</p>
                    <a href="mailto:contact@ewarnsystem.com" className="text-[15px] text-slate-600 hover:text-cyan-600 transition-colors">contact@ewarnsystem.com</a>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Phone</p>
                    <p className="text-[15px] text-slate-600">7537837107</p>
                    <p className="text-[15px] text-slate-600">7437985137</p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Address</p>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                      FTBI, TIIR Building National Institute of<br/>
                      Technology Rourkela,<br/>
                      Sundargarh, Orissa, India, Pin-769008
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Hours</p>
                    <p className="text-[15px] text-slate-600">Mon-Fri: 9AM - 6PM</p>
                    <p className="text-[15px] text-slate-600">Sat-Sun: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-6 sm:p-8 md:p-12 w-full md:w-7/12 relative bg-white shrink-0">
              {/* Desktop Close Button */}
              <button 
                onClick={onClose}
                className="hidden md:flex absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 md:p-8 text-center md:rounded-r-[2rem]"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                    >
                      <Send className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Message Sent!</h4>
                    <p className="text-slate-500 text-base md:text-lg">Thank you for reaching out. We will connect with you soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 pb-4 md:pb-0">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Your name"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-slate-700 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-slate-700 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="How can we help?"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none text-slate-700 placeholder-slate-400"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full !bg-cyan-500 hover:!bg-cyan-400 !text-slate-900 font-bold py-4 md:py-5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 disabled:opacity-70 mt-2 text-lg"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </button>
              </form>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
