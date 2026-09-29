import { motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import { PRODUCTS as DEFAULT_PRODUCTS } from '../../data/products';

export const ProductGrid = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const allProducts = JSON.parse(localStorage.getItem('ewarn_products')) || DEFAULT_PRODUCTS;
  const displayProducts = allProducts.slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-ewarn-dark mb-4 tracking-tight">Featured Products & Components</h2>
            <p className="text-gray-500 text-lg">Curated electronics for precise engineering.</p>
          </div>
          <a onClick={() => navigate('/products')} className="cursor-pointer hidden md:flex items-center gap-1 text-ewarn-dark font-medium hover:text-gray-500 transition-colors group">
            View Collection <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {displayProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden mb-5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] mix-blend-multiply opacity-80"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-ewarn-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                
                {/* Hover Add to Cart Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1, e);
                    }}
                    className="bg-ewarn-dark text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-black/20 hover:scale-105 transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">{product.category}</div>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-ewarn-dark leading-tight group-hover:text-gray-600 transition-colors">{product.name}</h3>
                  <span className="text-lg font-bold text-ewarn-dark">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
