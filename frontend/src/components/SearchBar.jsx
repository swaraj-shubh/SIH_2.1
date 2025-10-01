import React, { useState } from 'react';

const SearchBar = ({ value, onChange, placeholder = "Search...", onSearch, advanced = false }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({
    source: '',
    dateRange: '',
    domain: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query: value, filters });
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          {advanced && (
            <button
              type="button"
              className="advanced-toggle"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              ⚙️ Advanced
            </button>
          )}
        </div>

        {advanced && isAdvancedOpen && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Data Source</label>
              <select 
                value={filters.source} 
                onChange={(e) => handleFilterChange('source', e.target.value)}
              >
                <option value="">All Sources</option>
                <option value="patents">Patents</option>
                <option value="publications">Publications</option>
                <option value="market">Market Data</option>
                <option value="companies">Companies</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Time Range</label>
              <select 
                value={filters.dateRange} 
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="">All Time</option>
                <option value="1y">Last Year</option>
                <option value="2y">Last 2 Years</option>
                <option value="5y">Last 5 Years</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Technology Domain</label>
              <select 
                value={filters.domain} 
                onChange={(e) => handleFilterChange('domain', e.target.value)}
              >
                <option value="">All Domains</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="quantum">Quantum Computing</option>
                <option value="biotech">Biotechnology</option>
                <option value="nanotech">Nanotechnology</option>
                <option value="robotics">Robotics</option>
              </select>
            </div>

            <div className="filter-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setFilters({ source: '', dateRange: '', domain: '' })}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </form>

      {value && (
        <div className="search-results-info">
          <span>Showing results for: <strong>"{value}"</strong></span>
          <button 
            className="clear-search"
            onClick={() => onChange('')}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;