import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Verificar se devemos usar dados mockados
const USE_MOCK_DATA = import.meta.env.USE_MOCK_DATA === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('AuthContext: ', { 
  useMockData: USE_MOCK_DATA,
  apiUrl: API_URL
});

// Contexto de autenticação
const AuthContext = createContext({});

// Lista de usuários para teste
const MOCK_USERS = [
  {
    id: 1,
    email: 'teste@exemplo.com',
    password: 'teste123',
    username: 'teste',
    first_name: 'Usuário',
    last_name: 'Teste'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se existe um usuário no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Tentando login com:', { email, password });
      
      // Se estiver usando dados mockados
      if (USE_MOCK_DATA) {
        console.log('Usando dados mockados para login');
        
        // Simulação de verificação com dados mockados
        const foundUser = MOCK_USERS.find(u => 
          u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Remover a senha do objeto do usuário por segurança
          const { password, ...userWithoutPassword } = foundUser;
          
          // Salvar no estado e localStorage
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          setError(null);
          navigate('/marketplace');
          return { success: true };
        } else {
          setError('Email ou senha inválidos');
          return {
            success: false,
            error: 'Email ou senha inválidos'
          };
        }
      } 
      // Se estiver conectando ao backend real
      else {
        console.log('Conectando ao backend em:', `${API_URL}/api/users/login/`);
        
        try {
          const response = await axios.post(`${API_URL}/api/users/login/`, {
            email,
            password
          });
          
          console.log('Login response:', response.data);
          
          const userData = response.data;
          setUser(userData.user);
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData.user));
          
          setError(null);
          navigate('/marketplace');
          return { success: true };
        } catch (apiError) {
          console.error('Erro na API de login:', apiError);
          setError(apiError.response?.data?.message || 'Email ou senha inválidos');
          return {
            success: false,
            error: apiError.response?.data?.message || 'Email ou senha inválidos'
          };
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Ocorreu um erro ao tentar fazer login');
      return {
        success: false,
        error: 'Ocorreu um erro ao tentar fazer login'
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registrando usuário:', userData);
      
      // Se estiver usando dados mockados
      if (USE_MOCK_DATA) {
        console.log('Usando dados mockados para registro');
        
        // Verificar se o email já existe
        if (MOCK_USERS.some(u => u.email === userData.email)) {
          setError('Este email já está cadastrado');
          return {
            success: false,
            error: 'Este email já está cadastrado'
          };
        }
        
        // Simular criação de novo usuário
        const newUser = {
          id: MOCK_USERS.length + 1,
          ...userData
        };
        
        // Adicionar à lista de usuários mockados
        MOCK_USERS.push(newUser);
        
        console.log('Usuário registrado com sucesso:', newUser);
        setError(null);
        
        // Redirecionar para login
        navigate('/login');
        
        return { 
          success: true, 
          data: { message: 'Usuário registrado com sucesso' } 
        };
      } 
      // Se estiver conectando ao backend real
      else {
        console.log('Conectando ao backend em:', `${API_URL}/api/users/register/`);
        
        try {
          const response = await axios.post(`${API_URL}/api/users/register/`, userData);
          console.log('Registro response:', response.data);
          
          setError(null);
          navigate('/login');
          
          return { 
            success: true, 
            data: response.data 
          };
        } catch (apiError) {
          console.error('Erro na API de registro:', apiError);
          const errorMessage = apiError.response?.data?.message || apiError.response?.data || 'Erro ao registrar usuário';
          setError(errorMessage);
          
          return { 
            success: false, 
            error: errorMessage 
          };
        }
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setError('Ocorreu um erro ao tentar registrar o usuário');
      return {
        success: false,
        error: 'Ocorreu um erro ao tentar registrar o usuário'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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