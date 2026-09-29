import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

import { PRODUCTS } from '../../data/products';

// Inside Navbar:
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, logout, user } = useAuth();
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/about';
  const isScrolled = scrolled || !isDarkHeroPage;
  
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setPastHero(window.scrollY > (window.innerHeight - 150));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'top-0 px-0' : 'top-4 md:top-6 px-4 md:px-6'}`}
    >
      <nav 
        className={`mx-auto flex justify-between items-center transition-all duration-500 ${
          scrolled 
            ? 'max-w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 py-3 md:py-4 px-6 md:px-12 lg:px-24 shadow-sm rounded-none' 
            : 'max-w-7xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 py-3 md:py-4 px-4 md:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl'
        }`}
      >
        
        {/* Logo - flex-shrink-0 and w-auto ensure it NEVER crops */}
        <Link to="/" className={`flex items-center group transition-colors flex-shrink-0 ${isScrolled ? '' : 'p-1.5 rounded-lg bg-white border border-white/20 shadow-sm'}`}>
          <img 
            src="/logo.png" 
            alt="eWarn Logo" 
            className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 bg-white rounded" 
          />
        </Link>

        {/* Desktop Links (Hidden on tablet/mobile) */}
        <div className={`hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>
          <Link to="/products" className={`transition-colors ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white drop-shadow-md'}`}>Products</Link>
          <Link to="/about" className={`transition-colors ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white drop-shadow-md'}`}>About Us</Link>
          <Link to="/testimonials" className={`transition-colors ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white drop-shadow-md'}`}>Testimonials</Link>
          <Link to="/services" className={`transition-colors ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white drop-shadow-md'}`}>Services</Link>
        </div>

        {/* Icons & CTA Buttons */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          
          {/* Conditionally Visible: Search */}
          <AnimatePresence mode="popLayout">
            {(!isHomePage || pastHero) && (
              <motion.button 
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.8 }}
                onClick={() => setIsSearchOpen(true)}
                className={`transition-colors flex items-center justify-center ${isScrolled ? 'text-slate-500 hover:text-ewarn-dark' : 'text-slate-300 hover:text-white'}`}
              >
                <Search className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>

          <button 
            onClick={() => {
              if (isAuthenticated) navigate('/wishlist');
              else navigate('/login?redirect=/wishlist');
            }}
            className={`transition-colors relative group cursor-pointer ${isScrolled ? 'text-slate-500 hover:text-ewarn-dark' : 'text-slate-300 hover:text-white'}`}
          >
            <Heart className="w-5 h-5" />
            <AnimatePresence mode="popLayout">
              {wishlistItems?.length > 0 && (
                <motion.span 
                  key={wishlistItems.length}
                  initial={{ scale: 0.5, y: 5 }}
                  animate={{ scale: 1, y: 0 }}
                  className={`absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform ${isScrolled ? 'bg-red-500 text-white' : 'bg-red-400 text-white'}`}
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            id="navbar-cart-icon"
            onClick={() => setIsCartOpen(true)}
            className={`transition-colors relative group mr-1 md:mr-2 cursor-pointer ${isScrolled ? 'text-slate-500 hover:text-ewarn-dark' : 'text-slate-300 hover:text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence mode="popLayout">
              {totalCartItems > 0 && (
                <motion.span 
                  key={totalCartItems}
                  initial={{ scale: 0.5, y: 5 }}
                  animate={{ scale: 1, y: 0 }}
                  className={`absolute -top-1.5 -right-1.5 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform ${isScrolled ? 'bg-ewarn-dark text-white' : 'bg-cyan-500 text-slate-900'}`}
                >
                  {totalCartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Desktop Only: Divider, Login, Signup */}
          <div className={`hidden lg:block h-5 w-px transition-colors ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`}></div>

          {isAuthenticated ? (
            <>
              {user?.isAdmin && (
                <Link to="/admin" className={`hidden lg:block text-xs font-mono font-bold tracking-widest uppercase transition-colors hover:underline underline-offset-4 ${isScrolled ? 'text-rose-600 hover:text-rose-700' : 'text-rose-400 hover:text-rose-300'}`}>
                  Admin Panel
                </Link>
              )}
              <Link to="/profile" className={`hidden lg:block text-xs font-mono font-bold tracking-widest uppercase transition-colors hover:underline underline-offset-4 ${isScrolled ? 'text-slate-600 hover:text-cyan-600' : 'text-cyan-400 hover:text-cyan-300'}`}>
                {user?.email?.split('@')[0]}
              </Link>
              <button onClick={logout} className={`hidden lg:block text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-red-500' : 'text-slate-200 hover:text-red-400 drop-shadow-md'}`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`hidden lg:block text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-ewarn-dark' : 'text-slate-200 hover:text-white drop-shadow-md'}`}>
                Login
              </Link>
              
              <Link to="/signup" className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] !bg-cyan-500 hover:!bg-cyan-400 !text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] hover:-translate-y-0.5 tracking-wide">
                Sign up
              </Link>
            </>
          )}

          {/* Mobile/Tablet Only: Hamburger (Placed AFTER Cart) */}
          <button className={`lg:hidden transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className={`mx-4 md:mx-6 mt-2 rounded-2xl overflow-hidden border ${
              isScrolled ? 'bg-white border-gray-200 shadow-xl' : 'bg-slate-900/95 backdrop-blur-3xl border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className={`flex flex-col px-6 py-6 gap-6 font-bold ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)} className={`text-lg ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white'}`}>Products</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`text-lg ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white'}`}>About Us</Link>
              <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)} className={`text-lg ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white'}`}>Testimonials</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className={`text-lg ${isScrolled ? 'hover:text-ewarn-dark' : 'hover:text-white'}`}>Services</Link>
              
              <div className={`h-px w-full ${isScrolled ? 'bg-gray-100' : 'bg-white/10'} my-2`}></div>
              
              <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className={`w-full text-center py-3 text-xs font-mono font-bold tracking-widest uppercase hover:underline ${isScrolled ? 'text-slate-600' : 'text-cyan-400'}`}>
                      PROFILE: {user?.email}
                    </Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className={`w-full text-center py-3 rounded-lg border transition-colors font-bold ${
                      isScrolled ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-red-500/50 text-red-400 hover:bg-red-500/10'
                    }`}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className={`w-full text-center py-3 rounded-lg border transition-colors font-bold ${
                      isScrolled ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-white/20 text-white hover:bg-white/10'
                    }`}>
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] !bg-cyan-500 hover:!bg-cyan-400 !text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] font-bold tracking-wide">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Global Search Overlay */}
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md flex justify-center"
          onClick={() => setIsSearchOpen(false)}
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full max-w-3xl px-4 mt-24 md:mt-32 h-fit"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex items-center px-4 py-4 md:py-6 border-b border-gray-100">
                <Search className="w-6 h-6 text-cyan-500 mr-4 shrink-0" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search components, sensors, microcontrollers..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 text-lg md:text-xl placeholder:text-slate-400 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2 shrink-0">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Search Results */}
              {searchTerm.length > 0 && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchTerm("");
                          navigate(`/product/${product.id}`);
                        }}
                        className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                      >
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center p-2 shrink-0 shadow-sm">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-bold text-slate-900 mb-0.5">{product.name}</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{product.category} <span className="mx-2 text-gray-300">|</span> <span className="text-cyan-600">{product.price}</span></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-500 text-sm font-mono uppercase tracking-widest">
                      No matching hardware found for "{searchTerm}"
                    </div>
                  )}
                  <div 
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/products?search=${searchTerm}`);
                    }}
                    className="p-4 bg-slate-50 hover:bg-cyan-50 text-center text-xs font-bold text-cyan-600 cursor-pointer uppercase tracking-widest transition-colors border-t border-gray-100"
                  >
                    View all {searchTerm} results
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
