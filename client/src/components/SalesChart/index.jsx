import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecords } from '../../hooks/useRecords';
import './SalesChart.css';

const SalesChart = () => {
  const { records, loading, error } = useRecords();

  if (loading) return <div className="chart-loading">Loading chart...</div>;
  if (error) return <div className="chart-error">{error}</div>;
  if (!records || records.length === 0) return <div className="chart-empty">No data available</div>;

  // Format tick labels to take up less space
  const formatXAxis = (tickItem) => {
    return tickItem.replace('2025-', '');
  };

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000) {
      return `$${(tickItem / 1000).toFixed(0)}k`;
    }
    return `$${tickItem}`;
  };

  return (
    <div className="sales-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={records}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis 
            dataKey="week" 
            tickFormatter={formatXAxis}
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-muted)' }}
          />
          <YAxis 
            tickFormatter={formatYAxis}
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-muted)' }}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
            labelFormatter={(label) => `Week: ${label}`}
            contentStyle={{ borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
          />
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="var(--primary)" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
