import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

/**
 * API client configuration
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    // Token will be added per request as it might change
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized error
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    } else if (error.code === 'ECONNABORTED') {
      // Handle timeout
      throw new Error('Request timeout. Please try again.');
    } else if (!error.response) {
      // Handle network error
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'An unexpected error occurred'
    );
  }
);

/**
 * Courses Service
 */
export const coursesService = {
  /**
   * Fetch all courses for the authenticated user
   */
  fetchCourses: async (token) => {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await apiClient.get(API_ENDPOINTS.COURSES, {
      headers: {
        'Authorization': token
      }
    });

    return response.data;
  },

  /**
   * Get a specific course by ID
   */
  getCourse: async (courseId, token) => {
    if (!courseId) {
      throw new Error('Course ID is required');
    }
    
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await apiClient.get(API_ENDPOINTS.COURSE_BY_ID(courseId), {
      headers: {
        'Authorization': token
      }
    });

    return response.data;
  }
};