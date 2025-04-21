import axios from 'axios';

// URL da API baseada no ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('API URL:', API_URL);

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
    const response = await api.post('/contact/submit/', formData);
    return response.data;
  } catch (error) {
    console.error('Error in submitForm:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
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
    const response = await api.post('/users/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in login:', error.response?.data || error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
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
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
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
    throw error;
  }
};

export default api; 