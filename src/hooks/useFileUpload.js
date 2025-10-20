import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { uploadService } from '../services/uploadService';
import { FILE_UPLOAD } from '../constants';

/**
 * Custom hook for file upload functionality
 */
export const useFileUpload = () => {
  const navigate = useNavigate();
  const { 
    getToken, 
    logout,
    uploadLoading,
    uploadError,
    uploadSuccess,
    setUploadLoading,
    setUploadError,
    setUploadSuccess,
    clearUploadMessages
  } = useAuthStore();
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => {
    if (!file) return 'Please select a file to upload';
    
    if (file.size > FILE_UPLOAD.MAX_SIZE) {
      return `File size must be less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`;
    }
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!FILE_UPLOAD.ACCEPTED_TYPES.includes(fileExtension)) {
      return `File type not supported. Please upload: ${FILE_UPLOAD.ACCEPTED_TYPES.join(', ')}`;
    }
    
    return null;
  };

  const handleFileSelect = useCallback((selectedFile) => {
    const error = validateFile(selectedFile);
    if (error) {
      setUploadError(error);
      return;
    }
    
    setFile(selectedFile);
    clearUploadMessages();
  }, [setUploadError, clearUploadMessages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragEvents = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const token = getToken();
    if (!token) {
      setUploadError('Please login first');
      navigate('/login');
      return;
    }

    setUploadLoading(true);
    clearUploadMessages();

    try {
      const response = await uploadService.uploadFile(file, token);
      
      setUploadSuccess('File uploaded and analyzed successfully!');
      setFile(null);
      navigate(`/course/${response.courseId}`);

    } catch (error) {
      console.error('Upload error:', error);
      
      if (error.message.includes('Unauthorized') || error.message.includes('401')) {
        setUploadError('Authentication failed. Please login again.');
        logout();
        navigate('/login');
      } else {
        setUploadError(error.message || 'Upload failed. Please try again.');
      }
    } finally {
      setUploadLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    clearUploadMessages();
  };

  const formatFileSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return {
    file,
    dragActive,
    uploadLoading,
    uploadError,
    uploadSuccess,
    handleFileChange,
    handleDragEvents,
    handleDrop,
    handleSubmit,
    removeFile,
    formatFileSize
  };
};