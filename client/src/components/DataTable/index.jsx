import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronUp, FiChevronDown, FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRecords } from '../../hooks/useRecords';
import { formatCurrency } from '../../utils/formatCurrency';
import './DataTable.css';

const ROWS_PER_PAGE = 10;

const COLUMNS = [
  { key: 'week', label: 'Week', format: null },
  { key: 'sales', label: 'Sales', format: formatCurrency },
  { key: 'branded_search_spend', label: 'Branded Search', format: formatCurrency },
  { key: 'nonbranded_search_spend', label: 'Non-Branded Search', format: formatCurrency },
  { key: 'facebook_spend', label: 'Facebook', format: formatCurrency },
  { key: 'print_spend', label: 'Print', format: formatCurrency },
  { key: 'ooh_spend', label: 'OOH', format: formatCurrency },
  { key: 'tv_spend', label: 'TV', format: formatCurrency },
  { key: 'radio_spend', label: 'Radio', format: formatCurrency },
];

const DataTable = () => {
  const { records, loading, error } = useRecords();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter records by search term
  const filteredRecords = useMemo(() => {
    if (!records) return [];
    if (!searchTerm.trim()) return records;

    const lower = searchTerm.toLowerCase();
    return records.filter((record) =>
      COLUMNS.some((col) => {
        const val = record[col.key];
        return val && String(val).toLowerCase().includes(lower);
      })
    );
  }, [records, searchTerm]);

  // Sort records
  const sortedRecords = useMemo(() => {
    if (!sortConfig.key) return filteredRecords;

    return [...filteredRecords].sort((a, b) => {
      const aVal = parseFloat(a[sortConfig.key]) || a[sortConfig.key] || '';
      const bVal = parseFloat(b[sortConfig.key]) || b[sortConfig.key] || '';

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / ROWS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return sortedRecords.slice(start, start + ROWS_PER_PAGE);
  }, [sortedRecords, currentPage]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FiChevronUp className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? (
      <FiChevronUp className="sort-icon active" />
    ) : (
      <FiChevronDown className="sort-icon active" />
    );
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading) return <div className="table-skeleton skeleton" />;
  if (error) return <div className="table-error">{error}</div>;
  if (!records || records.length === 0) {
    return <div className="table-empty">No records found. Upload a CSV to get started.</div>;
  }

  return (
    <div className="table-container" id="records-table">
      {/* Toolbar: Search + Record Count */}
      <div className="table-toolbar">
        <div className="table-search-wrapper">
          <FiSearch className="table-search-icon" />
          <input
            type="text"
            id="table-search"
            className="table-search"
            placeholder="Search records..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="table-record-count">
          Showing {paginatedRecords.length} of {filteredRecords.length} records
        </div>
      </div>

      {/* Table */}
      <div className="table-scroll-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                  <span className="th-content">
                    {col.label}
                    {getSortIcon(col.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record, idx) => (
              <tr key={record.id || idx}>
                {COLUMNS.map((col) => (
                  <td key={col.key}>
                    {col.format ? col.format(record[col.key]) : record[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            title="First page"
          >
            <FiChevronsLeft />
          </button>
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <FiChevronLeft />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <FiChevronRight />
          </button>
          <button
            className="page-btn"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <FiChevronsRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
