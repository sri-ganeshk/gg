import { useState, useEffect, useCallback } from 'react';
import { coursesService } from '../services/coursesService';
import { safeJsonParse } from '../utils/helpers';
import { ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for managing course data fetching and state
 */
export const useCourse = (courseId, getToken) => {
  const [state, setState] = useState({
    courseData: null,
    flashcardsData: null,
    qnaData: null,
    loading: true,
    error: null
  });

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const token = getToken();
      
      const data = await coursesService.getCourse(courseId, token);
      
      // Parse course data
      const courseData = safeJsonParse(data.json);
      
      // Parse flashcards data
      const flashcardsData = safeJsonParse(data.flashCard);
      
      // Parse QnA data
      const qnaData = safeJsonParse(data.qna);
      
      setState({
        courseData,
        flashcardsData,
        qnaData,
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching course:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || ERROR_MESSAGES.COURSE_FETCH_ERROR
      }));
    }
  }, [courseId, getToken]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    ...state,
    refetch: fetchCourse
  };
};