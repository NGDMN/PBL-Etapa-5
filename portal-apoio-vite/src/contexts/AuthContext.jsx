import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Usar API_URL corretamente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('AuthContext API URL:', API_URL);

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const endpoint = `${API_URL}/api/users/me`;
      console.log('Checking auth at:', endpoint);
      const response = await axios.get(endpoint);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const endpoint = `${API_URL}/api/users/login/`;
      console.log('Logging in at:', endpoint);
      console.log('Login data:', { email, password });
      
      const response = await axios.post(endpoint, {
        email,
        password,
      });
      
      console.log('Login response:', response.data);
      
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setError(null);
      navigate('/marketplace');
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage = error.response?.data?.message || error.response?.data || 'Erro ao fazer login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      const endpoint = `${API_URL}/api/users/register/`;
      console.log('Registering at:', endpoint);
      console.log('User data:', userData);
      
      const response = await axios.post(endpoint, userData);
      
      console.log('Registration response:', response.data);
      setError(null);
      navigate('/login');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Erro no registro:', error);
      const errorMessage = error.response?.data?.message || error.response?.data || 'Erro ao registrar usuário';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 