import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, ChevronDown, Mail } from 'lucide-react';
import { useState } from 'react';

// Static FAQ Data tailored for EWARN
const staticFaqs = [
  {
    question: "What types of products do you offer?",
    answer: "We specialize in a wide range of electronics, sensors, development boards, and hardware modules. Our focus is on providing high-quality components for IoT, embedded systems, and tech education."
  },
  {
    question: "How long does shipping usually take?",
    answer: "Orders are typically processed within 1-2 business days. Standard shipping takes 5-7 business days, while express options can deliver within 2-3 business days. You will receive a tracking link once your order is dispatched."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a hassle-free 30-day return policy. Items must be unused, in their original packaging, and in the same condition as received. You can initiate a return directly from your Orders page."
  },
  {
    question: "Do you offer technical support for modules?",
    answer: "Yes! We provide basic technical support for the hardware we sell. For complex project integrations, we recommend checking our ecosystem resources and documentation at platform.iotews.com."
  },
  {
    question: "Do you ship internationally?",
    answer: "We currently ship to select international destinations including the US, Canada, and parts of Europe. Shipping costs and timelines vary by region and will be calculated automatically at checkout."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also view tracking information by logging into your account and visiting the Orders page."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay."
  },
  {
    question: "How can I cancel my order?",
    answer: "You can cancel your order within 1 hour of placing it by contacting customer support. Once the order is processed, you'll need to return it following our standard return process."
  },
  {
    question: "Are the products genuine?",
    answer: "Yes, all products sold on eWARN System are 100% authentic and come with manufacturer warranties where applicable."
  },
  {
    question: "How do I use a promo code?",
    answer: "Enter your promo code during checkout in the 'Discount Code' field before completing your purchase. The discount will be applied to your order total."
  },
  {
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact us immediately with photos. We'll arrange a replacement or full refund at no cost to you."
  },
  {
    question: "How do I change my shipping address?",
    answer: "If your order hasn't shipped yet, contact us immediately to update the address. Once shipped, please contact the carrier directly to redirect the package."
  }
];

export const FAQModal = ({ isOpen, onClose, onContactClick }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            className="bg-white rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] w-full max-w-3xl max-h-[90vh] relative z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area - Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
              <div className="space-y-4">
                {staticFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`border ${openIndex === idx ? 'border-cyan-300 shadow-md shadow-cyan-500/10' : 'border-slate-200'} rounded-2xl overflow-hidden transition-all bg-slate-50 hover:border-cyan-300`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-lg font-black text-slate-900 tracking-tight pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-cyan-600 shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Still have questions? Section */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">Still have questions?</h3>
                <p className="text-slate-600 font-medium mb-6">Our customer support team is here to help!</p>
                <button 
                  onClick={onContactClick}
                  className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
