import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { Filter, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AllProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Dynamically load products from local storage so Admin edits appear immediately
  const [liveProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('ewarn_products')) || PRODUCTS;
  });

  const categories = ['All', ...new Set(liveProducts.map(p => p.category))];

  const filtered = liveProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-36 md:pt-40 min-h-screen bg-slate-50 flex flex-col md:flex-row max-w-[1400px] mx-auto px-4 md:px-8 gap-8 pb-20">
      
      {/* Sidebar Filters (Amazon/Flipkart Style) */}
      <aside className="w-full md:w-64 shrink-0 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-32">
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-6 pb-4 border-b border-gray-100">
            <Filter className="w-5 h-5" /> Filters
          </div>
          
          <div className="mb-6">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Categories</label>
            <div className="flex flex-col gap-3">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === cat} 
                    onChange={() => setSelectedCategory(cat)}
                    className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-gray-300" 
                  />
                  <span className={`text-sm transition-colors ${selectedCategory === cat ? 'font-bold text-slate-900' : 'text-gray-600 group-hover:text-cyan-600'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="flex-1 mt-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">EWARN Inventory</h1>
            <p className="text-gray-500 mt-1">Showing {filtered.length} products</p>
          </div>
          <div className="w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, idx) => {
              const priceNumber = parseInt((product.price || '').replace(/[^\d]/g, '') || '0');
              let discountPercent = 0;
              let showMrp = false;

              if (product.mrp) {
                const mrpNumber = parseInt(product.mrp.replace(/[^\d]/g, ''));
                if (mrpNumber > priceNumber) {
                  discountPercent = Math.round(((mrpNumber - priceNumber) / mrpNumber) * 100);
                  showMrp = true;
                }
              }

              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group cursor-pointer flex flex-col bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all ${product.stock === 0 ? "opacity-60 grayscale" : ""}`}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.stock === 0 ? (<span className="absolute top-2 left-2 bg-red-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm z-10">Out of Stock</span>) : product.badge && (
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm z-10">
                        {product.badge}
                      </span>
                    )}
                    {discountPercent > 0 && product.stock !== 0 && (
                      <span className="absolute bottom-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-wider">{product.category}</div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1 group-hover:text-cyan-600 transition-colors line-clamp-2">{product.name}</h3>
                    
                    <div className="mt-auto flex justify-between items-end">
                      <div>{product.stock === 0 ? <div className="text-sm font-black text-rose-500 leading-none mt-2">OUT OF STOCK</div> : <><div className="text-lg font-black text-slate-900 leading-none">{product.price}</div>
                        {showMrp && (<div className="text-[10px] text-gray-400 font-bold line-through mt-0.5">M.R.P: {product.mrp}</div>)}</>}</div>
                      {product.stock !== 0 && (<button onClick={(e) => { e.stopPropagation(); addToCart(product, 1, e); }}
                        className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0"
                      >
                        <ShoppingBag className="w-4 h-4" /></button>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            No products found matching your search criteria.
          </div>
        )}
      </main>
    </div>
  );
};

