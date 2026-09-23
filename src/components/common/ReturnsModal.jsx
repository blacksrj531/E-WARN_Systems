import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCcw, Info } from 'lucide-react';

export const ReturnsModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] relative z-10 overflow-y-auto overflow-x-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between z-20">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0">
                  <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Returns Policy</h2>
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
              
              {/* 30-Day Return Policy */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">30-Day Return Policy</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-5">
                  We offer a hassle-free <span className="font-bold text-cyan-700">30-day return policy</span>. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange.
                </p>
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start shadow-sm">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base font-medium text-cyan-900 leading-relaxed">
                    Items must be unused, in original packaging, and in the same condition as received.
                  </p>
                </div>
              </section>

              {/* How to Return an Item */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">How to Return an Item</h3>
                <ul className="space-y-3 sm:space-y-4 pl-1 sm:pl-2">
                  {[
                    "Log into your account and go to Orders",
                    "Select the order containing the item you want to return",
                    "Click \"Request Return\" and follow the prompts",
                    "Print the prepaid return label",
                    "Pack the item securely and attach the label",
                    "Drop off at any authorized shipping location"
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-3 sm:gap-4 items-start">
                      <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-[0.6rem] bg-slate-100 text-slate-900 font-bold text-sm shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Refund Processing */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">Refund Processing</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                  Once we receive your return, we'll inspect the item and process your refund within <span className="font-bold text-cyan-700">5-7 business days</span>. Refunds will be issued to the original payment method.
                </p>
              </section>

              {/* Non-Returnable Items */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">Non-Returnable Items</h3>
                <ul className="space-y-3 sm:space-y-4 pl-1 sm:pl-2">
                  {[
                    "Gift cards",
                    "Final sale items",
                    "Opened software or digital products",
                    "Personal care items"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 sm:gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Exchanges */}
              <section>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">Exchanges</h3>
                <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                  If you need a different size or color, we recommend returning the item for a refund and placing a new order to ensure availability.
                </p>
              </section>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
