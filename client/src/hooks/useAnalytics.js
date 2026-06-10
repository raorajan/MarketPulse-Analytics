import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getSummary();
      setSummary(data);
    } catch (err) {
      if (err.response?.status === 404 || err.message.includes('404')) {
        setSummary(null);
        setError('No data available. Please upload a CSV to get started.');
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to fetch summary');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { summary, loading, error, refetch: fetchSummary };
};
