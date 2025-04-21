import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const submitForm = async (formData) => {
  try {
    const response = await api.post('/api/submit_form', formData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/users/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/users/login/', credentials);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/api/products/');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default api; 