import axios from 'axios';
import { MOCK_PRODUCTS } from '../data/mockData';

// Verificar se devemos usar dados mockados
const USE_MOCK_DATA = import.meta.env.USE_MOCK_DATA === 'true';

// URL da API baseada no ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('API Service: ', { 
  useMockData: USE_MOCK_DATA,
  apiUrl: API_URL
});

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Adiciona o token de autenticação a cada requisição, se disponível
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Starting Request:', config);
  return config;
});

// Interceptor para logs de resposta
api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    throw error;
  }
);

export const submitForm = async (formData) => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Mock: submitForm', formData);
      return { message: 'Formulário enviado com sucesso' };
    }
    
    const response = await api.post('/contact/submit/', formData);
    return response.data;
  } catch (error) {
    console.error('Error in submitForm:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Mock: register', userData);
      return { success: true, message: 'Usuário registrado com sucesso' };
    }
    
    console.log('Registering user with data:', userData);
    const response = await api.post('/users/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error in register:', error.response?.data || error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Mock: login', credentials);
      return { token: 'mock-token', user: { id: 1, username: 'mock_user' } };
    }
    
    const response = await api.post('/users/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in login:', error.response?.data || error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Mock: Returning mock products');
      return MOCK_PRODUCTS;
    }
    
    console.log('Fetching products from:', `${API_URL}/api/products/`);
    const response = await api.get('/products/');
    console.log('Products response:', response.data);
    
    // Garante que todos os produtos tenham valores numéricos válidos para preço
    const normalizedProducts = response.data.map(product => ({
      ...product,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
      average_rating: Number(product.average_rating) || 0
    }));
    
    return normalizedProducts;
  } catch (error) {
    console.error('Error in getProducts:', error.response?.data || error);
    
    // Em caso de erro, retornar produtos mockados como fallback
    console.log('Fallback: Returning mock products');
    return MOCK_PRODUCTS;
  }
};

export const getProductDetails = async (id) => {
  try {
    if (USE_MOCK_DATA) {
      console.log('Mock: Returning mock product details for ID:', id);
      const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
      return product || MOCK_PRODUCTS[0];
    }
    
    console.log('Fetching product details for ID:', id);
    const response = await api.get(`/products/${id}/`);
    console.log('Product details response:', response.data);
    
    // Garante que o produto tenha valores numéricos válidos
    const normalizedProduct = {
      ...response.data,
      price: Number(response.data.price) || 0,
      stock: Number(response.data.stock) || 0,
      average_rating: Number(response.data.average_rating) || 0
    };
    
    return normalizedProduct;
  } catch (error) {
    console.error('Error in getProductDetails:', error.response?.data || error);
    
    // Em caso de erro, retornar um produto mockado como fallback
    console.log('Fallback: Returning mock product details');
    return MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0];
  }
};

export default api; 