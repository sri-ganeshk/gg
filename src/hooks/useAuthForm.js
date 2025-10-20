import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { AUTH_MODES, FORM_VALIDATION } from '../constants';

/**
 * Custom hook for authentication form (login/register)
 */
export const useAuthForm = () => {
  const navigate = useNavigate();
  const { login, setLoading, loading } = useAuthStore();
  
  const [mode, setMode] = useState(AUTH_MODES.LOGIN);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const isRegisterMode = mode === AUTH_MODES.REGISTER;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = FORM_VALIDATION.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = FORM_VALIDATION.EMAIL_INVALID;
    }
    
    if (!formData.password) {
      newErrors.password = FORM_VALIDATION.PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = FORM_VALIDATION.PASSWORD_MIN_LENGTH;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      const response = await authService.authenticate(formData.email, formData.password, isRegisterMode);
      
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ 
        submit: error.message || (isRegisterMode ? 'Registration failed' : 'Login failed')
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === AUTH_MODES.LOGIN ? AUTH_MODES.REGISTER : AUTH_MODES.LOGIN);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  return {
    mode,
    isRegisterMode,
    formData,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
    toggleMode,
    resetForm
  };
};