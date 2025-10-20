import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

/**
 * API client configuration for auth
 */
const authClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor for auth error handling
 */
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Auth API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (!error.response) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.error || 'Invalid request data');
      case 401:
        throw new Error('Invalid email or password');
      case 409:
        throw new Error('Email already exists. Please use a different email.');
      case 429:
        throw new Error('Too many attempts. Please try again later.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data?.error || data?.message || 'Authentication failed');
    }
  }
);

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Authenticate user (login or register)
   */
  authenticate: async (email, password, isRegister = false) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const endpoint = isRegister ? API_ENDPOINTS.REGISTER : API_ENDPOINTS.LOGIN;
    
    const response = await authClient.post(endpoint, {
      email: email.trim().toLowerCase(),
      password
    });

    if (!response.data?.token) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  },

  /**
   * Login user
   */
  login: async (email, password) => {
    return authService.authenticate(email, password, false);
  },

  /**
   * Register user
   */
  register: async (email, password) => {
    return authService.authenticate(email, password, true);
  }
};