import React from 'react';
import KPICards from '../components/KPICards';
import SalesChart from '../components/SalesChart';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>MarketPulse Analytics</h1>
      </header>

      <main className="dashboard-main">
        {/* Upload CSV Section Placeholder */}
        <section className="dashboard-section upload-section">
          <h2>Upload Data</h2>
        </section>

        {/* 4 KPI Cards Placeholder */}
        <section className="dashboard-section kpi-section">
          <h2>Key Metrics</h2>
          <KPICards />
        </section>

        {/* Sales Trend Chart Placeholder */}
        <section className="dashboard-section chart-section">
          <h2>Sales Trend</h2>
          <SalesChart />
        </section>

        {/* Records Table Placeholder */}
        <section className="dashboard-section table-section">
          <h2>Records</h2>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
