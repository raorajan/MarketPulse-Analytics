import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useRecords } from '../../hooks/useRecords';
import { formatCurrency } from '../../utils/formatCurrency';
import './SalesChart.css';

/** Custom tooltip for dark theme */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="sales-chart-tooltip">
        <p className="tooltip-label">Week: {label}</p>
        <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const { records, loading, error } = useRecords();

  if (loading) {
    return <div className="chart-skeleton skeleton" />;
  }

  if (error) return <div className="chart-error">{error}</div>;
  if (!records || records.length === 0) {
    return <div className="chart-empty">No data available. Upload a CSV to get started.</div>;
  }

  // Format week label — show shorter text
  const formatXAxis = (tickItem) => {
    if (!tickItem) return '';
    // If format is "2025-W01", show "W01"
    if (tickItem.includes('-W')) {
      return tickItem.split('-W')[1] ? `W${tickItem.split('-W')[1]}` : tickItem;
    }
    // If format is "Week 1", keep as is
    return tickItem;
  };

  // Format Y axis to compact currency
  const formatYAxis = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <div className="sales-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={records}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tickFormatter={formatXAxis}
            stroke="transparent"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            stroke="transparent"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#salesGradient)"
            dot={false}
            activeDot={{
              r: 6,
              fill: '#6366f1',
              stroke: '#1e2235',
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
