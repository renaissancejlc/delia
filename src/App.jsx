// src/App.jsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ShippingAndReturns from './pages/ShippingAndReturns';
import Press from './pages/Press';
import Faq from './pages/Faq';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

import { useLocation, Navigate } from 'react-router-dom';

function ProtectedConfirmation() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');
  const orderHash = params.get('order');

  if (!sessionId && !orderHash) {
    return <Navigate to="/" replace />;
  }

  return <Confirmation />;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  useEffect(() => {
    const cursor = document.querySelector('.cursor-circle');

    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="cursor-circle" />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}