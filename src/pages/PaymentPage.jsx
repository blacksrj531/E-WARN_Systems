import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, Loader2 } from 'lucide-react';
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

  const handlePayment = () => {
    if (cartItems.length === 0) return;
    
    if (!isProfileComplete()) {
      setErrorMsg("Please complete all Personal Information fields in your profile before purchasing.");
      return;
    }
    
    setErrorMsg("");
    setIsProcessing(true);
    
    // Simulate API network request
    setTimeout(() => {
      // 1. Generate Order Data
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
        cartSnapshot: cartItems // Save full items for details view if needed later
      };

      // 2. Save to User's Order History in LocalStorage
      if (user?.email) {
        const history = JSON.parse(localStorage.getItem(`ewarn_orders_${user.email}`) || '[]');
        history.unshift(newOrder);
        localStorage.setItem(`ewarn_orders_${user.email}`, JSON.stringify(history));
      }

      // 3. Clear the shopping cart
      clearCart();
      
      // 4. Update UI state
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

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

              <button 
                onClick={handlePayment}
                disabled={isProcessing || cartItems.length === 0}
                className={`w-full max-w-xs mx-auto font-bold py-4 px-12 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 ${
                  isProcessing || cartItems.length === 0 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-slate-900 hover:bg-black text-white hover:shadow-xl'
                }`}
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
              </button>
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
