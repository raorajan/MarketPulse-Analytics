import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getRecords();
      setRecords(data || []);
    } catch (err) {
      // Handle 404 or empty data gracefully
      if (err.response?.status === 404) {
        setRecords([]);
        setError(null); // clear error to show empty state instead
      } else {
        setError(
          err.response?.data?.message || 
          (err.message.includes('404') ? null : err.message) || 
          'Failed to fetch records'
        );
        if (err.message.includes('404')) {
          setRecords([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { records, loading, error, refetch: fetchRecords };
};
