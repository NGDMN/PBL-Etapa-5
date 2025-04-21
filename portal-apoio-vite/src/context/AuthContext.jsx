import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// URL do backend baseada no ambiente
const API_URL = import.meta.env.PROD 
  ? '/api'  // Em produção, usa o path relativo pois está no mesmo domínio
  : 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Implement token validation with backend
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/users/login/`, credentials);
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register/`, userData);
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Erro no registro:', err);
      
      if (err.response?.data) {
        let errorMessage;
        
        if (typeof err.response.data === 'object') {
          if (err.response.data.detail) {
            errorMessage = err.response.data.detail;
          } else {
            errorMessage = Object.entries(err.response.data)
              .map(([key, value]) => {
                if (Array.isArray(value)) {
                  return `${key}: ${value.join(', ')}`;
                }
                return `${key}: ${value}`;
              })
              .join('\n');
          }
        } else {
          errorMessage = err.response.data;
        }
        
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      setError('Erro ao conectar com o servidor. Por favor, tente novamente.');
      return { success: false, error: 'Erro ao conectar com o servidor. Por favor, tente novamente.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 