import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { FiDollarSign, FiTrendingUp, FiCalendar, FiPieChart } from 'react-icons/fi';
import './KPICards.css';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const KPICards = () => {
  const { summary, loading, error } = useAnalytics();

  if (loading) return <div className="kpi-loading">Loading metrics...</div>;
  if (error) return <div className="kpi-error">{error}</div>;
  if (!summary) return null;

  const cards = [
    {
      title: 'Total Sales',
      value: formatCurrency(summary.totalSales),
      icon: <FiDollarSign className="kpi-icon text-blue" />,
    },
    {
      title: 'Avg Weekly Sales',
      value: formatCurrency(summary.averageWeeklySales),
      icon: <FiTrendingUp className="kpi-icon text-green" />,
    },
    {
      title: 'Total Marketing Spend',
      value: formatCurrency(summary.totalMarketingSpend),
      icon: <FiPieChart className="kpi-icon text-orange" />,
    },
    {
      title: 'Number of Weeks',
      value: summary.numberOfWeeks,
      icon: <FiCalendar className="kpi-icon text-purple" />,
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => (
        <div key={index} className="kpi-card">
          <div className="kpi-card-content">
            <h3 className="kpi-title">{card.title}</h3>
            <p className="kpi-value">{card.value}</p>
          </div>
          <div className="kpi-icon-container">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
