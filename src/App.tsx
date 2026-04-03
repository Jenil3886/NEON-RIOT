import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import QuickAdd from './pages/QuickAdd';
import ProductDetail from './pages/ProductDetail';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import Contact from './pages/Contact';
import SizeGuide from './pages/SizeGuide';
import Toast from './components/Toast';
import Checkout from './pages/Checkout';

import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!appReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [appReady]);
  return (
    <Router>
      <Preloader onComplete={() => setAppReady(true)} />
      <div className="mesh-layer" aria-hidden />
      <div className="flex flex-col min-h-screen bg-background relative">
        <Toast />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/quick-add" element={<QuickAdd />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
