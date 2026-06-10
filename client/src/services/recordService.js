import api from './api';

/**
 * Fetch all records from the backend.
 * GET /api/records
 * @returns {Promise<{success: boolean, count: number, data: Array}>}
 */
export const getRecords = async () => {
  const response = await api.get('/records');
  return response.data;
};

export const recordService = {
  getRecords,
};
