import React, { useState, useCallback } from 'react';
import { FiUploadCloud, FiBarChart2, FiTrendingUp, FiDatabase } from 'react-icons/fi';
import UploadCSV from '../components/UploadCSV';
import KPICards from '../components/KPICards';
import SalesChart from '../components/SalesChart';
import DataTable from '../components/DataTable';
import './Dashboard.css';

const Dashboard = () => {
  // A counter to trigger refetch in children after upload
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <div className="dashboard-logo">
            <FiBarChart2 />
          </div>
          <div>
            <h1>MarketPulse Analytics</h1>
            <p className="dashboard-header-subtitle">Marketing Performance Dashboard</p>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Section 1 — CSV Upload */}
        <section className="dashboard-section upload-section" id="upload-section">
          <div className="section-header">
            <div className="section-icon upload"><FiUploadCloud /></div>
            <h2>Upload Data</h2>
          </div>
          <UploadCSV onUploadSuccess={handleUploadSuccess} />
        </section>

        {/* Section 2 — KPI Cards */}
        <section className="dashboard-section kpi-section" id="kpi-section">
          <div className="section-header">
            <div className="section-icon metrics"><FiTrendingUp /></div>
            <h2>Key Metrics</h2>
          </div>
          <KPICards key={`kpi-${refreshKey}`} />
        </section>

        {/* Section 3 — Sales Trend Chart */}
        <section className="dashboard-section chart-section" id="chart-section">
          <div className="section-header">
            <div className="section-icon chart"><FiBarChart2 /></div>
            <h2>Sales Trend</h2>
          </div>
          <SalesChart key={`chart-${refreshKey}`} />
        </section>

        {/* Section 4 — Records Table */}
        <section className="dashboard-section table-section" id="table-section">
          <div className="section-header">
            <div className="section-icon table"><FiDatabase /></div>
            <h2>Records</h2>
          </div>
          <DataTable key={`table-${refreshKey}`} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
