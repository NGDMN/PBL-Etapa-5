import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import LoginForm from './LoginForm';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Portal de Apoio</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Sobre Nós</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">Marketplace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/treinamentos">Treinamentos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contato">Fale Conosco</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <CartIcon />
            <div className="ms-3">
              {user ? (
                <div className="d-flex align-items-center">
                  <span className="text-light me-2">Olá, {user.name}</span>
                  <button 
                    className="btn btn-outline-light" 
                    onClick={logout}
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-outline-light" 
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginForm show={showLogin} onHide={() => setShowLogin(false)} />
    </nav>
  );
};

export default Navbar; 