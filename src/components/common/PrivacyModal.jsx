import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';

export const PrivacyModal = ({ isOpen, onClose }) => {
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
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h2>
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">1. Who We Are</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    This Privacy Policy explains how EWARN SYSTEM PRIVATE LIMITED ("EWARN System", "we", "us", "our"), the operator of iotews.com and platform.iotews.com (together, the "Platform"), collects, uses, shares, and protects your personal information when you visit our website, create an account, place an order, or otherwise interact with us.
                  </p>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    By using the Platform, you agree to the collection and use of information as described in this Policy. If you do not agree, please do not use the Platform.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">2. Information We Collect</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Account information:</strong> name, email address, and password (stored as a salted hash — we never store your password in plain text) when you register.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Order and shipping information:</strong> full name, phone number, and delivery address when you place an order or request a quotation.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Payment information:</strong> we do not collect or store your card, UPI, or net banking details ourselves — payments are processed directly by Razorpay, our PCI-DSS compliant payment gateway partner (see Section 5). If you choose Direct Bank Transfer, we collect the transaction reference and, if you upload one, a payment screenshot, solely to verify your payment.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Account activity:</strong> your order history, cart contents, wishlist, and quotation requests, so the Platform can function and so you can track past orders.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Technical information:</strong> IP address, browser type, device information, and pages visited, collected automatically to keep the Platform secure and working correctly.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Communications:</strong> information you provide when you contact us via the Contact Us or Career pages, or apply for training/services we offer.
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">3. How We Use Your Information</h3>
                  <ul className="space-y-3 mb-4">
                    {[
                      "To create and manage your account and authenticate you when you log in",
                      "To process, fulfil, ship, and provide support for your orders and quotations",
                      "To verify bank transfer payments and prevent fraud",
                      "To communicate with you about your orders, account, or enquiries",
                      "To operate, maintain, and improve the security and performance of the Platform",
                      "To comply with applicable tax, accounting, and legal obligations in India"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start pl-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We do not use your personal information for automated advertising profiling, and we do not sell your personal information to third parties.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">4. Cookies and Local Storage</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    The Platform uses your browser's local storage to keep you signed in (storing your session token) and to remember items in your cart. Some third-party content we embed — such as YouTube videos on our Video page and the Razorpay checkout widget — may set their own cookies, governed by their own privacy policies. See our <a href="/cookie-policy" className="text-cyan-600 hover:text-cyan-700 font-bold underline decoration-cyan-200 hover:decoration-cyan-600 transition-colors">Cookie Policy</a> for details.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">5. How We Share Your Information</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    We share personal information only where necessary to operate the Platform:
                  </p>
                  <ul className="space-y-4 mb-4">
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Razorpay (payment gateway)</strong> — receives your name and the order amount to process card, UPI, net banking, and wallet payments. Razorpay does not share your full card details with us.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Courier / logistics partners</strong> — receive your shipping address and phone number solely to deliver your order.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Service providers</strong> who host our infrastructure and database, bound by confidentiality obligations.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start pl-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2.5" />
                      <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                        <strong className="text-slate-900">Legal and regulatory authorities</strong>, where required by Indian law, court order, or to protect our legal rights.
                      </p>
                    </li>
                  </ul>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">6. Data Security</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We use industry-standard measures to protect your information, including HTTPS/TLS encryption for all traffic to the Platform, password hashing, and authenticated, role-restricted access to admin functions. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">7. Data Retention</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We retain account and order information for as long as your account is active and thereafter for as long as needed to comply with our legal, accounting, and tax obligations (including under Indian consumer protection and taxation law), resolve disputes, and enforce our agreements.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">8. Your Rights</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    Subject to applicable law (including India's Digital Personal Data Protection Act, 2023), you have the right to:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[
                      "Access the personal information we hold about you",
                      "Correct inaccurate or incomplete information (via your Profile page, or by contacting us)",
                      "Request deletion of your account and associated personal information, subject to our legal retention obligations",
                      "Withdraw consent for optional processing, where consent is the basis for that processing",
                      "Lodge a grievance with our Grievance Officer (see Section 11)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start pl-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-2.5" />
                        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">9. Children's Privacy</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    The Platform is not directed at children under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">10. Changes to This Policy</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will update the "Last updated" date above when we do. Continued use of the Platform after changes are posted constitutes acceptance of the updated Policy.
                  </p>
                </section>

                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mt-12">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">11. Contact Us / Grievance Officer</h3>
                  <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed mb-4">
                    For any questions about this Privacy Policy, to exercise your rights, or to raise a grievance about how we handle your personal information, please contact:
                  </p>
                  <div className="space-y-2">
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">EWARN SYSTEM PRIVATE LIMITED</p>
                    <p className="text-base sm:text-lg font-medium text-slate-600">
                      Email: <a href="mailto:contact@ewarnsystem.com" className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors">contact@ewarnsystem.com</a>
                    </p>
                    <p className="text-base sm:text-lg font-medium text-slate-500 italic mt-4">
                      [Registered office address and Grievance Officer name/phone to be added]
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
