import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { coursesService } from '../services/coursesService';

/**
 * Custom hook for managing courses in dashboard
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const {
    courses,
    coursesLoading,
    coursesError,
    getToken,
    logout,
    setCourses,
    setCoursesLoading,
    setCoursesError,
    clearCoursesError
  } = useAuthStore();

  const fetchCourses = async () => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    setCoursesLoading(true);
    clearCoursesError();

    try {
      const coursesData = await coursesService.fetchCourses(token);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      
      if (error.message.includes('Unauthorized') || error.message.includes('401')) {
        logout();
        navigate('/login');
      } else {
        setCoursesError(error.message || 'Failed to fetch courses');
      }
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/upload');
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    coursesLoading,
    coursesError,
    handleCreateNew,
    handleCourseClick,
    refetchCourses: fetchCourses
  };
};