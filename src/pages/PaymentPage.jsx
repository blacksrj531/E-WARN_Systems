import { motion } from 'framer-motion';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PaymentPage = () => {
  const { cartItems } = useCart();
  
  const totalFinalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (priceNumber * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Secure Checkout</h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            You are successfully authenticated. Please review your order details and proceed with the payment of <span className="font-bold text-slate-900">₹{totalFinalPrice.toLocaleString('en-IN')}</span>.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 border border-gray-100 text-left max-w-sm mx-auto mb-8">
            <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
            <div className="flex flex-col gap-3 text-sm">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-slate-600 truncate mr-4">{item.quantity}x {item.name}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between font-bold text-slate-900">
                <span>Total Amount</span>
                <span>₹{totalFinalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <button className="bg-slate-900 hover:bg-black text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto">
            <CreditCard className="w-5 h-5" /> PAY NOW
          </button>
        </motion.div>
      </div>
    </div>
  );
};
