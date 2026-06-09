import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getRecords();
      setRecords(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return { records, loading, error, refetch: fetchRecords };
};
