import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Zap, CreditCard, Heart, Star, Minus, Plus, ChevronDown, Sparkles, ArrowUpRight, Activity, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dynamically load products from localStorage to reflect Admin changes instantly
  const allProducts = JSON.parse(localStorage.getItem('ewarn_products')) || PRODUCTS;
  const product = allProducts.find(p => p.id === parseInt(id));
  
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [starFilter, setStarFilter] = useState(null);
  const [ratingsExplainerOpen, setRatingsExplainerOpen] = useState(false);
  const [reportedReviews, setReportedReviews] = useState([]);
  const [translatedReviews, setTranslatedReviews] = useState([]);
  const [localReviews, setLocalReviews] = useState(() => {
    const allReviews = JSON.parse(localStorage.getItem('ewarn_reviews') || '[]');
    return allReviews.filter(r => r.productId === product?.id || !r.productId);
  });
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, title: '', text: '', photoUrl: null });

  // Frequently Bought Together Logic
  const suggestedProducts = allProducts.filter(p => p.id !== product?.id).slice(0, 2);
  const boughtTogether = product ? [product, ...suggestedProducts] : [];
  const [checkedItems, setCheckedItems] = useState(boughtTogether.map(p => p.id));

  const handleSubmitReview = () => {
    const reviewData = {
      ...newReview,
      id: Date.now(),
      productId: product.id,
      user: JSON.parse(localStorage.getItem('ewarn_user'))?.email?.split('@')[0] || 'User',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
      translate: false
    };
    
    // Save to global storage
    const allReviews = JSON.parse(localStorage.getItem('ewarn_reviews') || '[]');
    const updatedGlobal = [reviewData, ...allReviews];
    localStorage.setItem('ewarn_reviews', JSON.stringify(updatedGlobal));
    
    // Update local view
    setLocalReviews([reviewData, ...localReviews]);
    setIsWritingReview(false);
    setNewReview({ rating: 0, title: '', text: '', photoUrl: null });
  };

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
      setCheckedItems([product.id, ...suggestedProducts.map(p => p.id)]);
      
      const allReviews = JSON.parse(localStorage.getItem('ewarn_reviews') || '[]');
      setLocalReviews(allReviews.filter(r => r.productId === product.id || !r.productId));
    }
  }, [product?.id, product?.image]);

  if (!product) return <div className="pt-32 text-center text-slate-500 font-mono">PRODUCT NOT FOUND</div>;

  const images = product.images || [product.image];

  const totalReviews = localReviews.length;
  const averageRating = totalReviews > 0 ? (localReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
  
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  localReviews.forEach(r => {
    if (ratingCounts[r.rating] !== undefined) ratingCounts[r.rating]++;
  });
  
  const dynamicStats = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    pct: totalReviews > 0 ? Math.round((ratingCounts[stars] / totalReviews) * 100) : 0
  }));

  const handleProtectedAction = (action) => {
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      alert(`Successfully processed ${action} for ${product.name}!`);
    }
  };

  // MRP and Discount logic (Respects Admin's product.mrp if available)
  const priceNumber = parseInt((product.price || '').replace(/[^\d]/g, '') || '0');
  
  let formattedMrp = product.mrp;
  let discountPercent = 0;

  if (formattedMrp) {
    const mrpNumber = parseInt(formattedMrp.replace(/[^\d]/g, ''));
    if (mrpNumber > priceNumber) {
      discountPercent = Math.round(((mrpNumber - priceNumber) / mrpNumber) * 100);
    }
  } else {
    // Fallback logic for legacy products without explicitly defined MRP
    discountPercent = (product.id * 7 % 30) + 15; // Generates a stable random discount between 15% and 44%
    const calculatedMrp = Math.round(priceNumber / (1 - discountPercent / 100));
    formattedMrp = `₹${calculatedMrp.toLocaleString('en-IN')}`;
  }

  return (
    <div className="pt-36 md:pt-40 pb-24 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-cyan-600 font-bold text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO RESULTS
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Product Image Gallery */}
          <div className="md:sticky top-32 flex flex-col gap-6 z-10 bg-white md:bg-transparent">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-gray-100 flex items-center justify-center relative aspect-square overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
              </AnimatePresence>
            </motion.div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
              >
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-2xl border-2 flex items-center justify-center bg-slate-50 overflow-hidden transition-all ${
                      activeImage === img 
                        ? 'border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-105' 
                        : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">{product.category}</div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">{product.name}</h1>
            
            {/* Ratings Section */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-current' : i === Math.floor(averageRating) && averageRating % 1 !== 0 ? 'fill-current opacity-50' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-black text-slate-900">{averageRating}</span>
              <span className="text-sm text-cyan-600 hover:text-cyan-700 cursor-pointer underline decoration-cyan-200 underline-offset-4">({totalReviews.toLocaleString()} verified ratings)</span>
            </div>

            {/* Pricing Section (Amazon / Flipkart Style) */}
            <div className={`mb-8 pb-8 border-b border-gray-100 ${product.stock === 0 ? 'opacity-50 grayscale' : ''}`}>
              <div className="flex items-center gap-4 mb-2">
                {discountPercent > 0 && <span className="text-3xl font-black text-red-500">-{discountPercent}%</span>}
                <span className="text-4xl font-black text-slate-900">{product.price}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="text-slate-500 font-bold">
                  M.R.P: <span className="line-through decoration-slate-400">{formattedMrp}</span>
                </div>
                <div className="text-xs text-slate-400 font-bold tracking-wide uppercase">Inclusive of all taxes</div>
              </div>
            </div>
            
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A high-performance {product.category.toLowerCase()} component perfect for your next electronic prototyping project. Manufactured to the highest standards with strict quality assurance, this module guarantees precision and reliability within the EWARN ecosystem.
            </p>

            {/* Quantity Selector */}
            <div className={`flex items-center gap-4 mb-10 ${product.stock === 0 ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="p-3 bg-slate-50 hover:bg-gray-100 text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-14 text-center font-black text-slate-900">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="p-3 bg-slate-50 hover:bg-gray-100 text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex gap-4">
                <button 
                  onClick={() => handleProtectedAction('Buy Now')} 
                  disabled={product.stock === 0}
                  className={`flex-1 text-white py-4 rounded-xl font-black transition-all flex items-center justify-center gap-3 ${product.stock === 0 ? 'bg-slate-300 cursor-not-allowed opacity-50 grayscale' : 'bg-slate-900 hover:bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1'}`}
                >
                  <CreditCard className="w-5 h-5" /> BUY NOW
                </button>
                
                <button 
                  onClick={() => handleProtectedAction('Wishlist')} 
                  className="w-16 flex shrink-0 items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-100 hover:border-rose-500 hover:shadow-lg hover:-translate-y-1 group"
                  title="Add to Wishlist"
                >
                  <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <button 
                onClick={(e) => addToCart(product, quantity, e)}
                disabled={product.stock === 0}
                className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-3 ${product.stock === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50 grayscale' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_8px_30px_rgba(34,211,238,0.2)] hover:shadow-[0_8px_40px_rgba(34,211,238,0.4)] hover:-translate-y-1'}`}
              >
                <ShoppingBag className="w-6 h-6" /> {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
            </div>

            {/* Feature Badges */}
            <div className="flex justify-between items-start gap-2 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-600 leading-tight">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"><Truck className="w-5 h-5" /></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-600 leading-tight">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0"><Zap className="w-5 h-5" /></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-600 leading-tight">EWARN Lab Ready</span>
              </div>
            </div>

            {/* Full Product Details Section */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Full Product Details</h3>
              <div className="text-slate-500 text-sm leading-relaxed">
                {(() => {
                  const fullDetails = `The ${product.name} is an advanced industrial-grade component designed for engineers and hobbyists alike. It offers unparalleled performance in its class, ensuring your prototypes run smoothly under all conditions. Built with high-grade materials, this module supports a wide range of input voltages and interfaces seamlessly with the entire EWARN ecosystem. Perfect for IoT applications, advanced robotics, AI processing, and smart home automation projects where absolute precision and reliability are critical. Detailed schematics, integration guides, and datasheets are included in the package.`;
                  const words = fullDetails.split(' ');
                  const isLong = words.length > 25;
                  
                  if (!isLong) return fullDetails;
                  
                  return (
                    <>
                      {detailsExpanded ? fullDetails : words.slice(0, 25).join(' ') + '...'}
                      <div className="mt-3">
                        <button 
                          onClick={() => setDetailsExpanded(!detailsExpanded)}
                          className="text-cyan-600 font-bold text-xs hover:text-cyan-700 uppercase tracking-widest transition-colors inline-block"
                        >
                          {detailsExpanded ? 'READ LESS' : 'READ MORE'}
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Frequently Bought Together Section */}
        {(() => {
          const handleCheck = (id) => {
            setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
          };
          
          const totalPrice = boughtTogether
            .filter(p => checkedItems.includes(p.id))
            .reduce((sum, p) => sum + parseInt(p.price.replace(/[^\d]/g, '')), 0);
          const formattedTotal = `₹${totalPrice.toLocaleString('en-IN')}`;

          return (
            <div className="mt-20 pt-16 border-t border-gray-100">
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Frequently bought together</h2>
              
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                
                {/* Images and Pluses */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-8 flex-1">
                  {boughtTogether.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 lg:gap-8">
                      <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-center hover:shadow-md transition-shadow">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        </div>
                        {/* Checkbox */}
                        <div className="absolute top-2 right-2">
                          <input 
                            type="checkbox" 
                            checked={checkedItems.includes(item.id)}
                            onChange={() => handleCheck(item.id)}
                            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer border-gray-300 bg-white"
                          />
                        </div>
                      </div>
                      {index < boughtTogether.length - 1 && (
                        <Plus className="w-6 h-6 text-gray-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Action / Total Box */}
                <div className="w-full lg:w-80 bg-slate-50 p-6 rounded-3xl border border-gray-100 flex flex-col gap-4 shrink-0">
                  <div className="text-sm font-bold text-slate-600">
                    Total price: <span className="text-2xl font-black text-slate-900 ml-1">{formattedTotal}</span>
                  </div>
                  <button 
                    disabled={checkedItems.length === 0}
                    onClick={(e) => {
                      boughtTogether
                        .filter(p => checkedItems.includes(p.id))
                        .forEach(item => addToCart(item, 1, e));
                    }}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 rounded-xl font-black transition-all shadow-[0_4px_15px_rgba(34,211,238,0.3)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
                  >
                    Add {checkedItems.length > 0 ? (checkedItems.length === 3 ? 'all 3' : `${checkedItems.length}`) : ''} to Cart
                  </button>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    <ShieldCheck className="w-4 h-4 inline text-cyan-600 mr-1" />
                    These items are dispatched from and sold by EWARN Labs. <span className="text-cyan-600 hover:underline cursor-pointer">Show details</span>
                  </p>
                </div>
              </div>
              
              {/* Item List with titles and prices */}
              <div className="mt-8 flex flex-col gap-3">
                {boughtTogether.map((item) => (
                  <label key={item.id} className="flex items-center gap-3 text-sm cursor-pointer w-fit group">
                    <input 
                      type="checkbox" 
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheck(item.id)}
                      className="w-4 h-4 accent-cyan-500 rounded cursor-pointer shrink-0 border-gray-300"
                    />
                    <span className={item.id === product.id ? 'font-bold text-slate-900' : 'text-cyan-600 group-hover:underline'}>
                      {item.id === product.id ? <strong className="text-slate-900">This item: </strong> : ''}
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-900 ml-2">{item.price}</span>
                  </label>
                ))}
              </div>

            </div>
          );
        })()}

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-16 border-t border-gray-100 grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-20">
          
          {/* Left Column: Rating breakdown */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Customer reviews</h2>
            
            <div className="flex items-center gap-3 mb-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-current' : i === Math.floor(averageRating) && averageRating % 1 !== 0 ? 'fill-current opacity-50' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-lg font-black text-slate-900">{averageRating} out of 5</span>
            </div>
            <div className="text-sm text-slate-500 mb-6">{totalReviews.toLocaleString()} global ratings</div>

            <div className="flex flex-col gap-2 mb-6">
              {dynamicStats.map(bar => (
                <div 
                  key={bar.stars} 
                  onClick={() => setStarFilter(prev => prev === bar.stars ? null : bar.stars)}
                  className={`flex items-center gap-3 text-sm p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer border ${starFilter === bar.stars ? 'bg-cyan-50 border-cyan-200' : 'border-transparent hover:bg-slate-50'}`}
                >
                  <span className={`w-12 hover:underline ${starFilter === bar.stars ? 'font-black text-cyan-800' : 'text-cyan-600'}`}>{bar.stars} star</span>
                  <div className="flex-1 h-5 rounded-sm border border-gray-300 bg-slate-50 overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-sm" style={{ width: `${bar.pct}%` }}></div>
                  </div>
                  <span className={`w-8 text-right hover:underline ${starFilter === bar.stars ? 'font-black text-cyan-800' : 'text-cyan-600'}`}>{bar.pct}%</span>
                </div>
              ))}
            </div>
            
            <div className="text-sm">
              <button 
                onClick={() => setRatingsExplainerOpen(!ratingsExplainerOpen)}
                className="flex items-center gap-1 text-cyan-600 hover:text-orange-500 hover:underline"
              >
                How are ratings calculated? <ChevronDown className={`w-4 h-4 transition-transform ${ratingsExplainerOpen ? 'rotate-180' : ''}`} />
              </button>
              {ratingsExplainerOpen && (
                <p className="text-slate-500 mt-2 leading-relaxed text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  To calculate the overall star rating and percentage breakdown by star, we don't use a simple average. Instead, our system considers things like how recent a review is and if the reviewer bought the item on EWARN. It also analyses reviews to verify trustworthiness.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Summaries and Reviews */}
          <div>
            {/* Review CTA */}
            <div className="mb-10 p-6 bg-slate-50 border border-gray-200 rounded-2xl flex flex-col items-start gap-4">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Review this product</h3>
                <p className="text-sm text-slate-600">Share your thoughts with other customers. Take a photo of how you used it in your project!</p>
              </div>
              <button 
                onClick={() => {
                  if(!isAuthenticated) {
                    navigate('/login?redirect=/product/' + product.id);
                  } else {
                    setIsWritingReview(true);
                  }
                }}
                className="bg-white border border-gray-300 hover:bg-slate-50 text-slate-900 font-bold px-6 py-2 rounded-xl transition-colors text-sm shadow-sm"
              >
                Write a customer review
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">Customers say</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-1">
              Customers find the {product.category.toLowerCase()} operates exceptionally well and is easy to use and install, offering great value for money. The component integrates seamlessly into existing systems. Durability receives mixed feedback, with one user reporting connection drops during extreme load testing.
            </p>
            <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Generated from the text of customer reviews
            </p>

            <div className="text-sm font-bold text-slate-900 mb-3">Select to learn more</div>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => handleProtectedAction('Filter by Performance')} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center gap-1"><ArrowUpRight className="w-4 h-4 text-emerald-600" /> Performance (16)</button>
              <button onClick={() => handleProtectedAction('Filter by Value for money')} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center gap-1"><ArrowUpRight className="w-4 h-4 text-emerald-600" /> Value for money (15)</button>
              <button onClick={() => handleProtectedAction('Filter by Easy to install')} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center gap-1"><ArrowUpRight className="w-4 h-4 text-emerald-600" /> Easy to install (9)</button>
              <button onClick={() => handleProtectedAction('Filter by Durability')} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 flex items-center gap-1"><Activity className="w-4 h-4 text-slate-400" /> Durability (7)</button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {starFilter ? `${starFilter}-Star Reviews` : 'Our Top Reviews'}
              </h3>
              {starFilter && (
                <button onClick={() => setStarFilter(null)} className="text-sm text-cyan-600 hover:underline font-bold">Clear filter</button>
              )}
            </div>
            
            <div className="flex flex-col gap-10">
              {(() => {
                const combinedReviews = localReviews;
                const filteredReviews = starFilter ? combinedReviews.filter(r => r.rating === starFilter) : combinedReviews;

                if (filteredReviews.length === 0) {
                  return <div className="text-slate-500 bg-slate-50 p-6 rounded-xl border border-gray-100 text-sm">No reviews match your selected filter.</div>;
                }

                return filteredReviews.map(review => {
                  const isTranslated = translatedReviews.includes(review.id);
                  const isReported = reportedReviews.includes(review.id);

                  return (
                    <div key={review.id} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 uppercase font-bold text-sm">
                          {review.user?.[0] || 'U'}
                        </div>
                        <span className="text-sm text-slate-900 font-bold">{review.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{isTranslated ? review.englishTitle : review.title}</span>
                      </div>
                      <div className="text-xs text-slate-500">{review.date}</div>
                      {review.verified && <div className="text-xs font-bold text-orange-600 mt-0.5">Verified Purchase</div>}
                      <p className="text-sm text-slate-800 leading-relaxed mt-2 whitespace-pre-wrap">
                        {isTranslated ? review.englishText : review.text}
                      </p>
                      
                      {review.photoUrl && (
                        <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={review.photoUrl} alt="User submission" className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 mt-2">
                        <button 
                          onClick={() => setReportedReviews(prev => prev.includes(review.id) ? prev.filter(id => id !== review.id) : [...prev, review.id])}
                          className={`text-xs hover:text-slate-700 transition-colors ${isReported ? 'text-orange-500 font-bold' : 'text-slate-500'}`}
                        >
                          {isReported ? 'Reported' : 'Report'}
                        </button>
                        {review.translate && (
                          <button 
                            onClick={() => setTranslatedReviews(prev => prev.includes(review.id) ? prev.filter(id => id !== review.id) : [...prev, review.id])}
                            className="text-xs text-cyan-600 hover:underline font-medium"
                          >
                            {isTranslated ? 'Show original' : 'Translate review to English'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isWritingReview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsWritingReview(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6">Write a Review</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Overall rating</label>
                  <div className="flex gap-2 text-yellow-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        onClick={() => setNewReview(prev => ({...prev, rating: star}))}
                        className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${star <= newReview.rating ? 'fill-current' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Add a headline</label>
                  <input 
                    type="text" 
                    placeholder="What's most important to know?"
                    value={newReview.title}
                    onChange={e => setNewReview({...newReview, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Add a photo (Optional)</label>
                  <p className="text-xs text-slate-500 mb-2">Showcase your project! You can use your camera or upload a file.</p>
                  <div className="flex items-center gap-4">
                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors border border-gray-200">
                      Upload / Take Photo
                      <input 
                        type="file" 
                        accept="image/*"
                        capture="environment"
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewReview({...newReview, photoUrl: reader.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    {newReview.photoUrl && (
                      <div className="w-12 h-12 rounded bg-slate-100 border border-gray-200 overflow-hidden relative group">
                        <img src={newReview.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setNewReview({...newReview, photoUrl: null})}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Add a written review</label>
                  <textarea 
                    rows={4}
                    placeholder="What did you like or dislike? What did you use this product for?"
                    value={newReview.text}
                    onChange={e => setNewReview({...newReview, text: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none" 
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <button onClick={() => setIsWritingReview(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitReview}
                    disabled={!newReview.rating || !newReview.title || !newReview.text}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-200 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

