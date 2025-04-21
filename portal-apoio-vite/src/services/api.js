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

// Interceptor para logs de requisição
api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
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
    const response = await api.post('/submit_form', formData);
    return response.data;
  } catch (error) {
    console.error('Error in submitForm:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error in register:', error.response?.data || error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in login:', error.response?.data || error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error in getProducts:', error.response?.data || error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getProductDetails:', error.response?.data || error);
    throw error;
  }
};

export default api; 