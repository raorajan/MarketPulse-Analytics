import api from './api';

/**
 * Upload a CSV file to the backend.
 * POST /api/upload
 * @param {File} file - The CSV file to upload
 * @returns {Promise<{success: boolean, message: string, totalRecords: number}>}
 */
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const uploadService = {
  uploadCSV,
};
