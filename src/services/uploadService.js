import axios from 'axios';

export const uploadService = {
  uploadFile: async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      }
    );

    return response.data;
  }
};