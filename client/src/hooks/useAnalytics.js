import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getSummary();
        setSummary(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, loading, error };
};
