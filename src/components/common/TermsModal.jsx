import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { useMemo } from 'react';

export const TermsModal = ({ isOpen, onClose }) => {
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
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h2>
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">1. Acceptance of Terms</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    These Terms of Service ("Terms") govern your access to and use of iotews.com and platform.iotews.com (together, the "Platform"), operated by EWARN SYSTEM PRIVATE LIMITED ("EWARN System", "we", "us", "our"). By accessing or using the Platform, creating an account, or placing an order, you agree to be bound by these Terms and our <span className="text-cyan-600 font-bold">Privacy Policy</span>. If you do not agree, please do not use the Platform.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">2. Eligibility and Accounts</h3>
                  <ul className="space-y-3 mb-4">
                    {[
                      "You must be at least 18 years old, or using the Platform under the supervision of a parent/guardian or institution, to place an order.",
                      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
                      "You agree to provide accurate, current, and complete information when registering and placing orders.",
                      "We may suspend or terminate accounts that we reasonably believe are used fraudulently, abusively, or in violation of these Terms."
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start pl-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">3. Products, Pricing, and Availability</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    We sell IoT development kits, hardware components, and related educational products. All prices are listed in Indian Rupees (₹) and are inclusive of applicable GST unless stated otherwise. We make reasonable efforts to display accurate pricing, stock, and product information, but errors may occur; we reserve the right to correct pricing or availability errors and to cancel any order affected by such an error, with a full refund of any amount paid.
                  </p>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Product images are for illustration; actual products, packaging, or included accessories may vary slightly.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">4. Orders and Payment</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    Placing an order is an offer to purchase, which we may accept or decline (for example, due to stock unavailability or a suspected fraudulent order). A contract of sale is formed only once we confirm your order.
                  </p>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    We currently support the following payment methods at checkout:
                  </p>
                  <ul className="space-y-4 mb-4">
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Razorpay</strong> — cards, UPI, net banking, and wallets, processed securely by Razorpay. We never see or store your full card, UPI, or net banking credentials.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Direct Bank Transfer</strong> — payment is made directly to our bank account and manually verified against the transaction reference you provide; order confirmation may take longer with this method.
                      </p>
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    You are responsible for ensuring payment details you submit (including bank transfer references) are accurate. Orders paid via bank transfer are confirmed only after we have verified receipt of payment.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">5. Shipping and Delivery</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Shipping charges, free-shipping thresholds, and estimated delivery times are shown at checkout before you place your order and may vary by location and order value; see our <span className="text-cyan-600 font-bold">Shipping Information</span> section for general guidance. Delivery timeframes are estimates only and are not guaranteed. Risk of loss for products passes to you upon delivery to the shipping address you provided.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">6. Returns, Refunds, and Cancellations</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We offer a 30-day return policy on eligible items — see our <span className="text-cyan-600 font-bold">Returns & Refunds</span> policy for full details, eligibility, and the return process. Refunds are issued to the original payment method. Orders may be cancelled prior to shipment by contacting customer support; once shipped, the standard return process applies.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">7. Quotations and Custom/Institutional Orders</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    Quotation requests submitted through the Platform are non-binding estimates and do not constitute an order. A separate confirmation and payment step is required before we process a quoted order.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">8. Acceptable Use</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    You agree not to:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[
                      "Use the Platform for any unlawful purpose or in violation of any applicable law",
                      "Attempt to gain unauthorized access to any part of the Platform, other users' accounts, or our systems",
                      "Interfere with or disrupt the Platform's operation, including via automated scraping, bots, or denial-of-service attempts",
                      "Submit false, fraudulent, or misleading order, payment, or account information",
                      "Reproduce, resell, or exploit any portion of the Platform without our prior written consent"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start pl-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">9. Intellectual Property</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    All content on the Platform — including text, graphics, logos, product descriptions, and software — is owned by or licensed to EWARN SYSTEM PRIVATE LIMITED and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or create derivative works from this content without our prior written permission, except as reasonably necessary to use the Platform for its intended purpose.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">10. Third-Party Services</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    The Platform integrates third-party services, including Razorpay (payments) and YouTube (embedded videos). Your use of those services is also subject to their respective terms and privacy policies. We are not responsible for the content, policies, or practices of third-party services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">11. Disclaimers</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    The Platform and all products are provided "as is" and "as available" without warranties of any kind, express or implied, except as required by applicable Indian consumer protection law. We do not warrant that the Platform will be uninterrupted, error-free, or completely secure.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">12. Limitation of Liability</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    To the maximum extent permitted by applicable law, EWARN SYSTEM PRIVATE LIMITED shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform or purchase of products. Our total liability for any claim arising from an order shall not exceed the amount you paid for that order. Nothing in these Terms limits any liability that cannot be excluded or limited under applicable Indian law, including the Consumer Protection Act, 2019.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">13. Governing Law and Dispute Resolution</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    These Terms are governed by the laws of India. Subject to applicable consumer protection law, any dispute arising out of or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts having jurisdiction over our registered office location in India.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">14. Changes to These Terms</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We may update these Terms from time to time. We will update the "Last updated" date above when we do, and material changes will be communicated where practical. Continued use of the Platform after changes take effect constitutes your acceptance of the updated Terms.
                  </p>
                </section>

                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mt-12">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">15. Contact Us</h3>
                  <div className="space-y-2">
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">EWARN SYSTEM PRIVATE LIMITED</p>
                    <p className="text-base sm:text-lg font-medium text-slate-600">
                      Email: <a href="mailto:contact@ewarnsystem.com" className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors">contact@ewarnsystem.com</a>
                    </p>
                    <p className="text-base sm:text-lg font-medium text-slate-500 italic mt-4">
                      [Registered office address to be added]
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
