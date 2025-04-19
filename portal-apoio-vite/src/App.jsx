import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Marketplace from './pages/Marketplace';
import Training from './pages/Training';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ReviewProvider } from './context/ReviewContext';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ReviewProvider>
            <div className="App">
              <Navbar />
              <main className="container flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contato" element={<Contact />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/treinamentos" element={<Training />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ReviewProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 