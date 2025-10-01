import React, { useState, useMemo } from 'react';

const DataTable = ({ 
  data, 
  columns, 
  itemsPerPage = 10,
  sortable = true,
  selectable = false,
  onRowClick,
  actions = []
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item =>
      columns.some(column =>
        String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(paginatedData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const handleRowClick = (item, index) => {
    if (onRowClick) {
      onRowClick(item, index);
    }
  };

  const renderCell = (item, column) => {
    const value = item[column.key];
    
    // Special rendering for certain data types
    if (column.key === 'trl') {
      return (
        <div className="trl-cell">
          <div className="trl-badge">TRL {value}</div>
        </div>
      );
    }

    if (column.key === 'growthRate' && typeof value === 'string') {
      const isPositive = value.includes('+');
      return (
        <span className={isPositive ? 'positive-trend' : 'negative-trend'}>
          {value}
        </span>
      );
    }

    if (column.key === 'marketSize') {
      return <span className="market-size">{value}</span>;
    }

    return value;
  };

  return (
    <div className="data-table-container">
      {/* Table Controls */}
      <div className="table-controls">
        <div className="table-search">
          <input
            type="text"
            placeholder="Search in table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="table-info">
          Showing {paginatedData.length} of {sortedData.length} records
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th className="select-column">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  />
                </th>
              )}
              {columns.map(column => (
                <th 
                  key={column.key}
                  className={sortable ? 'sortable' : ''}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="header-content">
                    {column.label}
                    {sortable && sortConfig.key === column.key && (
                      <span className="sort-indicator">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && <th className="actions-column">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr 
                  key={index}
                  className={`
                    ${onRowClick ? 'clickable' : ''}
                    ${selectedRows.has(index) ? 'selected' : ''}
                  `}
                  onClick={() => handleRowClick(item, index)}
                >
                  {selectable && (
                    <td className="select-column">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={() => handleSelectRow(index)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td key={column.key}>
                      {renderCell(item, column)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="actions-column">
                      <div className="action-buttons">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            className={`action-btn ${action.type || 'secondary'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item, index);
                            }}
                            title={action.label}
                          >
                            {action.icon || action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                  <div className="no-data">
                    {searchTerm ? 'No matching records found' : 'No data available'}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;