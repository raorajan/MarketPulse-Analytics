import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatCurrency } from '../../utils/formatCurrency';
import { FiDollarSign, FiTrendingUp, FiCalendar, FiPieChart } from 'react-icons/fi';
import './KPICards.css';

const KPICards = () => {
  const { summary, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="kpi-skeleton-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="kpi-skeleton-card skeleton" />
        ))}
      </div>
    );
  }

  if (error) return <div className="kpi-error">{error}</div>;
  if (!summary) return null;

  const cards = [
    {
      title: 'Total Sales',
      value: formatCurrency(summary.totalSales),
      icon: <FiDollarSign className="kpi-icon text-blue" />,
      color: 'blue',
    },
    {
      title: 'Average Weekly Sales',
      value: formatCurrency(summary.averageWeeklySales),
      icon: <FiTrendingUp className="kpi-icon text-green" />,
      color: 'green',
    },
    {
      title: 'Number of Weeks',
      value: summary.numberOfWeeks,
      icon: <FiCalendar className="kpi-icon text-amber" />,
      color: 'amber',
    },
    {
      title: 'Total Marketing Spend',
      value: formatCurrency(summary.totalMarketingSpend),
      icon: <FiPieChart className="kpi-icon text-violet" />,
      color: 'violet',
    },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, index) => (
        <div key={index} className="kpi-card" id={`kpi-card-${index}`}>
          <div className="kpi-card-content">
            <h3 className="kpi-title">{card.title}</h3>
            <p className="kpi-value">{card.value}</p>
          </div>
          <div className={`kpi-icon-container ${card.color}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
