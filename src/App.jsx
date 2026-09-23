import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/layout/Navbar';
import { CrosshairCursor } from './components/animations/CrosshairCursor';
import { FlyToCart } from './components/animations/FlyToCart';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Footer } from './components/layout/Footer';
import { CareerPage } from './pages/CareerPage';
import { YoutubePage } from './pages/YoutubePage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ITServicePage } from './pages/ITServicePage';
import { ProductDevPage } from './pages/ProductDevPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white">
              <CrosshairCursor />
              <FlyToCart />
              <CartDrawer />
              
              <Navbar />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/youtube" element={<YoutubePage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/it" element={<ITServicePage />} />
                <Route path="/services/product-development" element={<ProductDevPage />} />
              </Routes>
              
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
