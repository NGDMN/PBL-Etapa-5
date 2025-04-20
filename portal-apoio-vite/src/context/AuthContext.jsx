import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

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
      const response = await axios.post('http://localhost:8000/api/users/login/', credentials);
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
      const response = await axios.post('http://localhost:8000/api/users/register/', userData);
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Erro no registro:', err.response?.data);
      setError(err.response?.data?.message || 'Erro ao criar conta. Por favor, tente novamente.');
      return false;
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