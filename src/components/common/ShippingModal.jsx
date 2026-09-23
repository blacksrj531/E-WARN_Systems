import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck } from 'lucide-react';

export const ShippingModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] w-full max-w-2xl max-h-[90vh] relative z-10 overflow-y-auto overflow-x-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between z-20">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Shipping Info</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-8 sm:space-y-10">
              
              {/* Shipping Options */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Shipping Options
                </h3>
                <div className="space-y-6">
                  <div className="pl-5 border-l-[4px] border-cyan-400 relative">
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Standard Shipping (5-7 business days)</p>
                    <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">Free on orders over ₹50, otherwise ₹10</p>
                  </div>
                  <div className="pl-5 border-l-[4px] border-cyan-500 relative">
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Express Shipping (2-3 business days)</p>
                    <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">₹20</p>
                  </div>
                  <div className="pl-5 border-l-[4px] border-cyan-600 relative">
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Next Day Delivery</p>
                    <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">₹35 (Order before 2 PM for next day delivery)</p>
                  </div>
                </div>
              </section>

              {/* Processing Time */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">Processing Time</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                  Orders are typically processed within <span className="font-bold text-cyan-700">1-2 business days</span>. You will receive a confirmation email once your order ships with tracking information.
                </p>
              </section>

              {/* International Shipping */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">International Shipping</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                  We currently ship to the US, Canada, and select countries in Europe. International shipping costs vary by destination and will be calculated at checkout. Please allow <span className="font-bold text-cyan-700">7-14 business days</span> for international deliveries.
                </p>
              </section>

              {/* Order Tracking */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">Order Tracking</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                  Once your order ships, you'll receive a tracking number via email. You can also track your orders by visiting the Orders page in your account.
                </p>
              </section>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
