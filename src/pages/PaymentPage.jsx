import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, Loader2, XCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Payment Selection State
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  const [upiId, setUpiId] = useState('');
  const [upiStatus, setUpiStatus] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  
  const totalFinalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = parseInt((item.price || '').replace(/[^\d]/g, '') || '0');
    return sum + (priceNumber * item.quantity);
  }, 0);

  const isProfileComplete = () => {
    if (!user?.email) return false;
    const profileData = JSON.parse(localStorage.getItem(`ewarn_profile_${user.email}`) || '{}');
    const requiredFields = ['fullName', 'phone', 'dob', 'flat', 'street', 'city', 'state', 'zip', 'country'];
    return requiredFields.every(field => profileData[field] && profileData[field].trim() !== '');
  };

  const verifyUpi = () => {
    if (/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setUpiStatus('valid');
    } else {
      setUpiStatus('invalid');
    }
  };

  const handleProceedClick = () => {
    if (cartItems.length === 0) return;
    
    if (!isProfileComplete()) {
      setErrorMsg("Please complete all Personal Information fields in your profile before purchasing.");
      return;
    }
    
    setErrorMsg("");
    setShowPaymentOptions(true);
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderId = `EW-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isoDate: new Date().toISOString(),
        total: `₹${totalFinalPrice.toLocaleString('en-IN')}`,
        status: 'Processing',
        items: cartItems.length === 1 
          ? cartItems[0].name 
          : `${cartItems[0].name} + ${cartItems.length - 1} others`,
        cartSnapshot: cartItems,
        paymentMethod: selectedMethod
      };

      if (user?.email) {
        const history = JSON.parse(localStorage.getItem(`ewarn_orders_${user.email}`) || '[]');
        history.unshift(newOrder);
        localStorage.setItem(`ewarn_orders_${user.email}`, JSON.stringify(history));
      }

      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const PAYMENT_METHODS = [
    { id: 'razorpay', label: 'Razorpay', logo: <span className="text-blue-600 font-bold italic">Razorpay</span> },
    { id: 'paypal', label: 'PayPal', logo: <span className="text-blue-800 font-black italic">PayPal</span> },
    { id: 'bhim', label: 'BHIM UPI', logo: <span className="text-orange-600 font-black">BHIM</span> },
    { id: 'gpay', label: 'Google Pay', logo: <span className="font-bold tracking-tight"><span className="text-blue-500">G</span><span className="text-red-500">P</span><span className="text-yellow-500">a</span><span className="text-green-500">y</span></span> },
    { id: 'phonepe', label: 'PhonePe', logo: <span className="text-purple-600 font-bold">PhonePe</span> },
    { id: 'paytm', label: 'Paytm', logo: <span className="text-blue-500 font-black italic">Paytm</span> },
    { id: 'credit', label: 'Credit Card', logo: <CreditCard className="text-slate-600 w-5 h-5" /> },
    { id: 'debit', label: 'Debit Card', logo: <CreditCard className="text-slate-600 w-5 h-5" /> },
    { id: 'custom_upi', label: 'Custom UPI ID', logo: <span className="text-emerald-600 font-bold border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded text-xs">UPI</span> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
            >
              <h1 className="text-3xl font-black text-slate-900 mb-4">Secure Checkout</h1>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Please review your order details and proceed with the payment of <span className="font-bold text-slate-900">₹{totalFinalPrice.toLocaleString('en-IN')}</span>.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-gray-100 text-left max-w-sm mx-auto mb-8">
                <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
                <div className="flex flex-col gap-3 text-sm">
                  {cartItems.length === 0 ? (
                    <div className="text-slate-500 italic">Your cart is empty.</div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-slate-600 truncate mr-4">{item.quantity}x {item.name}</span>
                      </div>
                    ))
                  )}
                  <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between font-bold text-slate-900">
                    <span>Total Amount</span>
                    <span>₹{totalFinalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl max-w-sm mx-auto mb-6 text-sm font-bold flex flex-col gap-3">
                  <span>{errorMsg}</span>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-700 py-2 rounded-lg transition-colors"
                  >
                    Go to Profile
                  </button>
                </div>
              )}

              {!showPaymentOptions ? (
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleProceedClick}
                    disabled={cartItems.length === 0}
                    className={`w-full max-w-xs font-bold py-4 px-12 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 ${
                      cartItems.length === 0 
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                        : 'bg-slate-900 hover:bg-black text-white hover:shadow-xl'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    PAY NOW
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 text-left border-t border-gray-100 pt-8"
                >
                  <h3 className="font-black text-slate-900 mb-6 text-xl">Select Payment Method</h3>
                  <div className="flex flex-col gap-3 mb-8">
                    {PAYMENT_METHODS.map(method => (
                      <div key={method.id} className={`border rounded-xl transition-all ${selectedMethod === method.id ? 'border-cyan-500 bg-cyan-50 shadow-sm' : 'border-gray-200 hover:border-cyan-200 bg-white'}`}>
                        <label className="flex items-center justify-between cursor-pointer p-4">
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="payment_method" 
                              value={method.id} 
                              checked={selectedMethod === method.id}
                              onChange={() => setSelectedMethod(method.id)}
                              className="w-5 h-5 accent-cyan-500 cursor-pointer"
                            />
                            <span className="font-bold text-slate-700">{method.label}</span>
                          </div>
                          <div>{method.logo}</div>
                        </label>
                        
                        <AnimatePresence>
                          {selectedMethod === method.id && (method.id === 'debit' || method.id === 'credit') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="px-4 pb-4 pt-2 border-t border-cyan-100 grid gap-4">
                                <input type="text" placeholder="Card Number (e.g. 4111 1111 1111 1111)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 font-mono text-sm" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} />
                                <div className="grid grid-cols-2 gap-4">
                                  <input type="text" placeholder="Expiry (MM/YY)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 font-mono text-sm" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} />
                                  <input type="text" placeholder="CVV" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 font-mono text-sm" value={cardDetails.cvv} onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})} />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {selectedMethod === method.id && method.id === 'custom_upi' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="px-4 pb-4 pt-2 border-t border-cyan-100 flex flex-col sm:flex-row items-center gap-2">
                                <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 text-sm" value={upiId} onChange={e => { setUpiId(e.target.value); setUpiStatus(null); }} />
                                <button onClick={verifyUpi} className="w-full sm:w-auto bg-slate-900 text-white px-5 py-3 rounded-lg font-bold hover:bg-black transition-colors text-sm">Verify</button>
                                {upiStatus === 'valid' && <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />}
                                {upiStatus === 'invalid' && <XCircle className="w-6 h-6 text-rose-500 shrink-0" />}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={handleFinalPayment}
                      disabled={isProcessing || (selectedMethod === 'custom_upi' && upiStatus !== 'valid') || ((selectedMethod === 'debit' || selectedMethod === 'credit') && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))}
                      className={`w-full max-w-xs font-bold py-4 px-12 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 ${
                        isProcessing || (selectedMethod === 'custom_upi' && upiStatus !== 'valid') || ((selectedMethod === 'debit' || selectedMethod === 'credit') && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                      {isProcessing ? 'PROCESSING...' : `CONFIRM ₹${totalFinalPrice.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </motion.div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h1>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Thank you for your purchase. Your order has been securely processed and is now being prepared for shipment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigate('/profile')} 
                  className="bg-slate-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto"
                >
                  View Order History
                </button>
                <button 
                  onClick={() => navigate('/products')} 
                  className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
