import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { useMemo } from 'react';

export const CookieModal = ({ isOpen, onClose }) => {
  // Generate the current date dynamically for the policy
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

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
            className="bg-white rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] w-full max-w-4xl max-h-[90vh] relative z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Cookie Policy</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area - Scrollable */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white custom-scrollbar">
              
              <div className="max-w-3xl mx-auto space-y-8">
                
                <p className="text-sm font-bold text-cyan-600 uppercase tracking-wider mb-8">
                  Last updated: {currentDate}
                </p>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">1. What This Policy Covers</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    This Cookie Policy explains how EWARN SYSTEM PRIVATE LIMITED uses cookies and similar technologies (such as browser local storage) on iotews.com and platform.iotews.com. It should be read alongside our <span className="text-cyan-600 font-bold">Privacy Policy</span>.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">2. We Primarily Use Local Storage, Not Cookies</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Unlike many websites, we don't rely on traditional cookies to keep you signed in. Instead, after you log in, your session token and cart data are stored in your browser's local storage, which stays on your device and is only sent to our servers when your browser makes a request to our API. This never leaves your device to any third party.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">3. Cookies Set by Third-Party Content We Embed</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    Some pages embed third-party content that may set its own cookies, over which we have no direct control. These are governed by the respective third party's own policy:
                  </p>
                  
                  {/* Table styling for the provided data */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="p-4 sm:p-5 font-black text-slate-900 tracking-tight w-1/4">Source</th>
                          <th className="p-4 sm:p-5 font-black text-slate-900 tracking-tight w-1/4">Where used</th>
                          <th className="p-4 sm:p-5 font-black text-slate-900 tracking-tight w-1/2">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 sm:p-5 text-slate-900 font-bold align-top">Razorpay <span className="text-slate-400 font-medium block text-sm">(checkout.razorpay.com)</span></td>
                          <td className="p-4 sm:p-5 text-slate-600 font-medium align-top">Payment checkout widget</td>
                          <td className="p-4 sm:p-5 text-slate-600 font-medium align-top leading-relaxed">Fraud prevention and to process your payment when you choose Razorpay at checkout. See Razorpay's own privacy policy.</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 sm:p-5 text-slate-900 font-bold align-top">YouTube / Google <span className="text-slate-400 font-medium block text-sm">(youtube.com)</span></td>
                          <td className="p-4 sm:p-5 text-slate-600 font-medium align-top">Embedded video player</td>
                          <td className="p-4 sm:p-5 text-slate-600 font-medium align-top leading-relaxed">Loaded on our Video page when you view embedded YouTube content. See Google's cookie policy.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">4. We Do Not Use Advertising or Tracking Cookies</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We do not currently use third-party analytics, advertising, or cross-site tracking cookies (such as Google Analytics or ad-network pixels). If this changes in the future, we will update this Cookie Policy accordingly.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">5. Managing Cookies and Local Storage</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Most browsers let you block or delete cookies and clear local storage through their settings. Note that clearing local storage for this site will sign you out and clear your cart. Blocking cookies required by embedded third-party content (like the Razorpay checkout widget) may prevent that feature from working correctly.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">6. Changes to This Policy</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We may update this Cookie Policy as our use of cookies and similar technologies changes. We will update the "Last updated" date above when we do.
                  </p>
                </section>

                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mt-12">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">7. Contact Us</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Questions about this Cookie Policy can be sent to <a href="mailto:contact@ewarnsystem.com" className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors">contact@ewarnsystem.com</a>.
                  </p>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
