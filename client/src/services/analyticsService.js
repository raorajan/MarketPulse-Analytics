import api from './api';

/**
 * Fetch summary/KPI metrics from the backend.
 * GET /api/summary
 * @returns {Promise<{totalSales, averageWeeklySales, numberOfWeeks, totalMarketingSpend}>}
 */
const getSummary = async () => {
  const response = await api.get('/summary');
  return response.data.data;
};

/**
 * Fetch all records from the backend.
 * GET /api/records
 * @returns {Promise<Array>}
 */
const getRecords = async () => {
  const response = await api.get('/records');
  return response.data.data;
};

export const analyticsService = {
  getSummary,
  getRecords,
};
