import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { OurStory } from './pages/OurStory';
import { Offers } from './pages/Offers';
import { BestSellers } from './pages/BestSellers';
import { CustomCakes } from './pages/CustomCakes';
import { BakeryMenu } from './pages/BakeryMenu';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#2C1A11] antialiased selection:bg-[#E5BA73]/30 selection:text-[#2C1A11]">
          {/* Header Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/best-sellers" element={<BestSellers />} />
              <Route path="/custom-cakes" element={<CustomCakes />} />
              <Route path="/menu" element={<BakeryMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />

          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* Global Notification Toast Container */}
          <ToastContainer />
        </div>
      </CartProvider>
    </Router>
  );
}
