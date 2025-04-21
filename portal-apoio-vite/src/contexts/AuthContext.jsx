import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexto de autenticação simplificado sem API
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Simulação de usuários cadastrados
  const MOCK_USERS = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
      username: 'admin',
      first_name: 'Administrador',
      last_name: 'Sistema'
    }
  ];

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
      
      // Verificar se o email já existe
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        setError('Este email já está cadastrado');
        return {
          success: false,
          error: 'Este email já está cadastrado'
        };
      }
      
      // Simular criação de novo usuário (apenas em memória)
      const newUser = {
        id: MOCK_USERS.length + 1,
        ...userData
      };
      
      // Adicionar à lista de usuários mockados (em memória)
      MOCK_USERS.push(newUser);
      
      console.log('Usuário registrado com sucesso:', newUser);
      setError(null);
      
      // Redirecionar para login
      navigate('/login');
      
      return { 
        success: true, 
        data: { message: 'Usuário registrado com sucesso' } 
      };
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