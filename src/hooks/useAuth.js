import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!checkAuth()) {
      navigate('/login');
    }
  }, [navigate, checkAuth]);

  return isAuthenticated;
};

export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = useProtectedRoute();
    
    if (!isAuthenticated) {
      return null;
    }
    
    return <Component {...props} />;
  };
};