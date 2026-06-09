import React from 'react';
import { useRecords } from '../../hooks/useRecords';
import './DataTable.css';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

const DataTable = () => {
  const { records, loading, error } = useRecords();

  if (loading) return <div className="table-loading">Loading records...</div>;
  if (error) return <div className="table-error">{error}</div>;
  if (!records || records.length === 0) return <div className="table-empty">No records found.</div>;

  return (
    <div className="table-container">
      <div className="table-scroll-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Sales</th>
              <th>Branded Search</th>
              <th>Non Branded Search</th>
              <th>Facebook</th>
              <th>Print</th>
              <th>OOH</th>
              <th>TV</th>
              <th>Radio</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.week}</td>
                <td>{formatCurrency(record.sales)}</td>
                <td>{formatCurrency(record.brandedSearchSpend)}</td>
                <td>{formatCurrency(record.nonBrandedSearchSpend)}</td>
                <td>{formatCurrency(record.facebookSpend)}</td>
                <td>{formatCurrency(record.printSpend)}</td>
                <td>{formatCurrency(record.oohSpend)}</td>
                <td>{formatCurrency(record.tvSpend)}</td>
                <td>{formatCurrency(record.radioSpend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
