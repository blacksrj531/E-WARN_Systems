import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, Heart, ChevronRight, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { LocationPickerModal } from './LocationPickerModal';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();
  
  const COUNTRIES = useMemo(() => {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const list = [];
    const exclude = ['ZZ', 'UN', 'EU', 'QO', 'XA', 'XB', 'EZ'];
    for(let i=65; i<=90; i++) {
      for(let j=65; j<=90; j++) {
        let code = String.fromCharCode(i) + String.fromCharCode(j);
        if(exclude.includes(code)) continue;
        try {
          let name = regionNames.of(code);
          if(name && name !== code && !name.toLowerCase().includes('unknown') && !name.includes('Region')) {
            const flag = String.fromCodePoint(i + 127397) + String.fromCodePoint(j + 127397);
            list.push({ name, flag });
          }
        } catch(e) {}
      }
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isPriceDetailsExpanded, setIsPriceDetailsExpanded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState({
    city: 'Rourkela',
    zip: '769008'
  });
  const [tempAddress, setTempAddress] = useState({
    flat: '',
    street: '',
    city: 'Rourkela',
    state: '',
    zip: '769008',
    country: '',
    contact1: '',
    contact2: ''
  });

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isZipLoading, setIsZipLoading] = useState(false);

  // Handle Zip Code change and auto-fill
  const handleZipChange = async (newZip) => {
    setTempAddress(prev => ({ ...prev, zip: newZip }));
    
    // Most standard PIN/ZIP codes are around 5-6 digits
    if (newZip.length >= 5) {
      setIsZipLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${newZip}&format=json&addressdetails=1`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const addr = data[0].address;
          setTempAddress(prev => ({
            ...prev,
            country: addr.country || prev.country,
            state: addr.state || prev.state,
            city: addr.city || addr.town || addr.county || prev.city,
          }));
        }
      } catch (err) {
        console.error("Zip lookup failed", err);
      } finally {
        setIsZipLoading(false);
      }
    }
  };

  const handleLocationSelected = (locationData) => {
    setTempAddress(prev => ({
      ...prev,
      street: locationData.street || prev.street,
      city: locationData.city || prev.city,
      state: locationData.state || prev.state,
      zip: locationData.zip || prev.zip,
      country: locationData.country || prev.country,
    }));
  };

  const handleSaveAddress = () => {
    const requiredFields = ['flat', 'street', 'city', 'state', 'zip', 'country', 'contact1'];
    const newErrors = [];
    
    requiredFields.forEach(field => {
      if (!tempAddress[field] || tempAddress[field].trim() === '') {
        newErrors.push(field);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setAddress({
      city: tempAddress.city,
      zip: tempAddress.zip
    });
    setIsEditingAddress(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (!isAuthenticated) {
      navigate('/login?redirect=/payment');
    } else {
      navigate('/payment');
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      navigate('/login?redirect=/wishlist');
      return;
    }
    addToWishlist(item);
    removeFromCart(item.id);
  };

  const totalOriginalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ''));
    const discountPercent = (item.id * 7 % 30) + 15;
    const mrpNumber = Math.round(priceNumber / (1 - discountPercent / 100));
    return sum + (mrpNumber * item.quantity);
  }, 0);

  const totalFinalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (priceNumber * item.quantity);
  }, 0);

  const totalDiscount = totalOriginalPrice - totalFinalPrice;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-100 z-[120] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 relative">
              <div className="flex items-center gap-2 flex-1 overflow-hidden">
                <MapPin className="w-5 h-5 text-blue-500 fill-blue-50 shrink-0" />
                <span className="text-[15px] font-medium text-slate-800 truncate">Delivery at {address.city} - {address.zip}</span>
              </div>
              <button 
                onClick={() => setIsEditingAddress(true)}
                className="text-sm font-medium border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 text-slate-700 ml-3 shrink-0"
              >
                Change
              </button>
              <button onClick={() => setIsCartOpen(false)} className="absolute -left-12 top-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* Address Edit Modal */}
            <AnimatePresence>
              {isEditingAddress && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 bg-white z-50 flex flex-col p-6 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Change Delivery Address</h2>
                    <button onClick={() => setIsEditingAddress(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    Please enter your new address details. Each field has a maximum of 250 characters for security.
                  </p>

                  <button 
                    onClick={() => setIsMapOpen(true)}
                    className="w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold py-3 mb-6 rounded-xl flex items-center justify-center gap-2 border border-cyan-200 transition-colors"
                  >
                    <MapPin className="w-5 h-5" /> Pinpoint on Map (Auto-fill)
                  </button>
                  
                  <div className="flex-1 overflow-y-auto pr-2 pb-10 flex flex-col gap-4">
                    {[
                      { key: 'flat', label: 'Flat/House No.' },
                      { key: 'street', label: 'Street' },
                      { key: 'city', label: 'City' },
                      { key: 'state', label: 'State' },
                      { key: 'zip', label: 'ZIP Code (Auto-detects Region)' },
                      { key: 'country', label: 'Country', isSelect: true },
                      { key: 'contact1', label: 'Contact Number 1 (Mandatory)' },
                      { key: 'contact2', label: 'Contact Number 2 (Optional)' }
                    ].map(field => {
                      const hasError = errors.includes(field.key);
                      return (
                      <div key={field.key} className="flex flex-col gap-1 relative">
                        <label className={`text-xs font-bold uppercase tracking-widest ${hasError ? 'text-red-500' : 'text-slate-500'}`}>{field.label}</label>
                        {field.isSelect ? (
                          <select
                            value={tempAddress[field.key]}
                            onChange={e => setTempAddress({...tempAddress, [field.key]: e.target.value})}
                            className={`border rounded-lg px-4 py-2.5 outline-none transition-all ${hasError ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'}`}
                          >
                            <option value="">Select a country</option>
                            {COUNTRIES.map(c => (
                              <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="relative">
                            <input 
                              type="text"
                              maxLength={250}
                              value={tempAddress[field.key]}
                              onChange={e => {
                                if (field.key === 'zip') {
                                  handleZipChange(e.target.value);
                                } else {
                                  setTempAddress({...tempAddress, [field.key]: e.target.value});
                                }
                              }}
                              className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${hasError ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'}`}
                              placeholder={`Enter ${field.label.split(' ')[0]}`}
                            />
                            {field.key === 'zip' && isZipLoading && (
                              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500 animate-spin" />
                            )}
                          </div>
                        )}
                      </div>
                    )})}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button 
                      onClick={handleSaveAddress}
                      className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                      Save Address
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <LocationPickerModal 
              isOpen={isMapOpen}
              onClose={() => setIsMapOpen(false)}
              onLocationSelected={handleLocationSelected}
            />

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-white p-6">
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center">
                  <Tag className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
                <p className="text-slate-500 text-center">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-4 bg-cyan-500 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-cyan-400">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                
                {/* Banner */}
                <div className="bg-emerald-100/50 px-4 py-3 flex items-center gap-2 mb-2">
                  <div className="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">₹</div>
                  <span className="text-sm text-emerald-700 font-medium">Save ₹18 with Only wrong/defect item returns</span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2">
                  {cartItems.map(item => {
                    const priceNumber = parseInt(item.price.replace(/[^\d]/g, ''));
                    const discountPercent = (item.id * 7 % 30) + 15;
                    const mrpNumber = Math.round(priceNumber / (1 - discountPercent / 100));

                    return (
                      <div key={item.id} className="bg-white flex flex-col pt-4">
                        <div className="flex gap-4 px-4">
                          <div className="w-24 h-24 border border-gray-200 rounded-lg p-2 flex items-center justify-center shrink-0">
                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 uppercase italic rounded-sm flex items-center gap-0.5">SALE ⚡</span>
                            </div>
                            <h4 className="text-sm text-slate-700 line-clamp-1 leading-tight">{item.name}</h4>
                            
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-medium text-slate-900">₹{priceNumber.toLocaleString('en-IN')}</span>
                              <span className="text-sm text-slate-400 line-through">₹{mrpNumber.toLocaleString('en-IN')}</span>
                              <span className="text-xs font-medium text-emerald-600">{discountPercent}% Off</span>
                            </div>

                            <div className="flex gap-2 mt-2">
                              <div className="text-xs border border-gray-200 rounded px-2 py-1.5 text-slate-700 bg-slate-50">
                                Size: Free Size
                              </div>
                              <div className="flex items-center gap-3 border border-gray-200 rounded px-2 py-1 text-slate-700 bg-slate-50">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-5 h-5 flex items-center justify-center font-bold disabled:opacity-30 hover:bg-gray-200 rounded transition-colors"
                                >
                                  -
                                </button>
                                <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-5 h-5 flex items-center justify-center font-bold hover:bg-gray-200 rounded transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-[10px] text-slate-500 mt-2">All issue easy returns</div>
                          </div>
                        </div>

                        <div className="px-4 py-3 border-t border-gray-100 mt-4 flex items-center gap-2 text-xs text-slate-600">
                          <TruckIcon className="w-4 h-4 text-slate-400" /> Estimated Delivery by Sunday, 27th Sep
                        </div>

                        <div className="flex border-t border-gray-200">
                          <button 
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 border-r border-gray-200"
                          >
                            <Heart className="w-4 h-4" /> Move to Wishlist
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <X className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div 
                  onClick={() => {
                    setIsCartOpen(false);
                    if (isAuthenticated) navigate('/wishlist');
                    else navigate('/login?redirect=/wishlist');
                  }}
                  className="bg-white mt-2 px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Heart className="w-5 h-5" /> Wishlist
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                {/* Price Details */}
                <div className="bg-white mt-2 p-4 mb-32">
                  <div 
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setIsPriceDetailsExpanded(!isPriceDetailsExpanded)}
                  >
                    <h3 className="text-[15px] font-medium text-slate-800">Price Details ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})</h3>
                    {isPriceDetailsExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  </div>
                  
                  <AnimatePresence>
                    {isPriceDetailsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 flex flex-col gap-3">
                          <div className="flex justify-between text-sm text-slate-600">
                            <span>M.R.P</span>
                            <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600">
                            <span>Product Price (Excl. GST)</span>
                            <span>₹{Math.round(totalFinalPrice / 1.18).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600">
                            <span>GST (18%)</span>
                            <span>₹{Math.round(totalFinalPrice - (totalFinalPrice / 1.18)).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-sm text-emerald-600 mb-2">
                            <span>Total Discounts</span>
                            <span>- ₹{totalDiscount.toLocaleString('en-IN')}</span>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4 mb-4 flex justify-between font-medium text-slate-900 text-[17px]">
                            <span>Order Total</span>
                            <span>₹{totalFinalPrice.toLocaleString('en-IN')}</span>
                          </div>
                          
                          <div className="bg-emerald-100/50 text-emerald-700 text-sm font-medium text-center py-2.5 rounded-lg flex items-center justify-center gap-2 mb-2">
                            <Tag className="w-4 h-4 fill-current" /> Yay! Your total discount is ₹{totalDiscount.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}
            
            {/* Sticky Footer */}
            {cartItems.length > 0 && (
              <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex items-center justify-between z-20 pb-8">
                <div className="flex flex-col">
                  <span className="text-xl font-medium text-slate-900">₹{totalFinalPrice.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => setIsPriceDetailsExpanded(true)}
                    className="text-xs text-purple-700 font-bold tracking-wide mt-1 text-left hover:underline"
                  >
                    VIEW PRICE DETAILS
                  </button>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-10 py-3 rounded text-sm transition-colors shadow-md"
                >
                  Continue
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const TruckIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 7h-3V6a4 4 0 0 0-8 0H5a1 1 0 0 0-1 1v9h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2V10l-3-3zM8 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-5h-4V9h3.5l1.5 1.5V12z"/>
  </svg>
);
