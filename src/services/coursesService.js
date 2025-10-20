import axios from 'axios';

export const coursesService = {
  fetchCourses: async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/courses`,
      {
        headers: {
          'Authorization': `${token}`
        }
      }
    );
    return response.data;
  },

  getCourse: async (courseId, token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/courses/${courseId}`,
      {
        headers: {
          'Authorization': `${token}`
        }
      }
    );
    return response.data;
  }
};