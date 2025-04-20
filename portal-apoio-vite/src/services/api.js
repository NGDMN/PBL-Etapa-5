import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com erros de token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email, password) => {
    const response = await api.post('/token/', { email, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};

export const products = {
  getAll: async () => {
    const response = await api.get('/products/');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },
};

export const cart = {
  getCart: async () => {
    const response = await api.get('/carts/');
    return response.data[0]; // Retorna o carrinho ativo
  },
  addItem: async (cartId, productId, quantity) => {
    const response = await api.post(`/carts/${cartId}/add_item/`, {
      product_id: productId,
      quantity,
    });
    return response.data;
  },
  removeItem: async (cartId, productId, quantity) => {
    const response = await api.post(`/carts/${cartId}/remove_item/`, {
      product_id: productId,
      quantity,
    });
    return response.data;
  },
};

export const reviews = {
  getByProduct: async (productId) => {
    const response = await api.get(`/reviews/?product=${productId}`);
    return response.data;
  },
  create: async (productId, reviewData) => {
    const response = await api.post('/reviews/', {
      product: productId,
      ...reviewData,
    });
    return response.data;
  },
};

export const submitForm = async (formData) => {
  try {
    const response = await fetch('/api/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Erro ao enviar formulário: ' + error.message);
  }
}; 