// User types
export interface User {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  date_joined: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

// Cart types
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

// Review types
export interface Review {
  id: number;
  user: number;
  product: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  data?: any;
} 