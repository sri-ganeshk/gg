import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

/**
 * API client configuration for uploads
 */
const uploadClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 60000, // 60 seconds for file uploads
});

/**
 * Response interceptor for upload error handling
 */
uploadClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Upload API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timeout. Please try again with a smaller file.');
    } else if (!error.response) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.error || 'Invalid file or request');
      case 401:
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      case 413:
        throw new Error('File too large. Please upload a smaller file.');
      case 415:
        throw new Error('File type not supported');
      case 429:
        throw new Error('Too many upload attempts. Please try again later.');
      case 500:
        throw new Error('Server error during file processing. Please try again.');
      default:
        throw new Error(data?.error || data?.message || 'Upload failed');
    }
  }
);

/**
 * Upload Service
 */
export const uploadService = {
  /**
   * Upload file for course creation
   */
  uploadFile: async (file, token) => {
    if (!file) {
      throw new Error('File is required');
    }
    
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await uploadClient.post(
      API_ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
        onUploadProgress: (progressEvent) => {
          // Could be used for progress tracking
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      }
    );

    if (!response.data?.courseId) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  }
};