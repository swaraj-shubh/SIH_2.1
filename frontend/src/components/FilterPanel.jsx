import React from 'react';

const FilterPanel = ({ filters, onFiltersChange }) => {
  const technologyDomains = [
    'Artificial Intelligence',
    'Quantum Computing',
    'Biotechnology',
    'Nanotechnology',
    'Robotics & Automation',
    'Advanced Materials',
    'Renewable Energy',
    'Cybersecurity',
    'Space Technology',
    'Advanced Computing'
  ];

  const trlStages = [
    { label: 'Basic Research (TRL 1-2)', range: [1, 2] },
    { label: 'Technology Formulation (TRL 3-4)', range: [3, 4] },
    { label: 'Proof of Concept (TRL 5-6)', range: [5, 6] },
    { label: 'Prototype (TRL 7-8)', range: [7, 8] },
    { label: 'Commercial Ready (TRL 9)', range: [9, 9] }
  ];

  const marketSizes = [
    'Under $100M',
    '$100M - $1B',
    '$1B - $10B',
    '$10B - $100B',
    'Over $100B'
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleRangeChange = (key, min, max) => {
    onFiltersChange({
      ...filters,
      [key]: [min, max]
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      domain: '',
      trlRange: [1, 9],
      marketSize: '',
      growthRate: '',
      country: ''
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        <button 
          className="clear-all-filters"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <h4>Technology Domain</h4>
        <div className="filter-options">
          {technologyDomains.map(domain => (
            <label key={domain} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.domain === domain}
                onChange={(e) => 
                  handleFilterChange('domain', e.target.checked ? domain : '')
                }
              />
              <span className="checkmark"></span>
              {domain}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>TRL Range</h4>
        <div className="trl-filter">
          <div className="trl-range-display">
            TRL {filters.trlRange[0]} - {filters.trlRange[1]}
          </div>
          <div className="range-slider">
            <input
              type="range"
              min="1"
              max="9"
              value={filters.trlRange[0]}
              onChange={(e) => handleRangeChange('trlRange', parseInt(e.target.value), filters.trlRange[1])}
              className="range-min"
            />
            <input
              type="range"
              min="1"
              max="9"
              value={filters.trlRange[1]}
              onChange={(e) => handleRangeChange('trlRange', filters.trlRange[0], parseInt(e.target.value))}
              className="range-max"
            />
          </div>
          <div className="trl-stages">
            {trlStages.map(stage => (
              <button
                key={stage.label}
                className={`trl-stage-btn ${
                  filters.trlRange[0] === stage.range[0] && filters.trlRange[1] === stage.range[1] 
                    ? 'active' 
                    : ''
                }`}
                onClick={() => handleRangeChange('trlRange', ...stage.range)}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Market Size</h4>
        <div className="filter-options">
          {marketSizes.map(size => (
            <label key={size} className="filter-radio">
              <input
                type="radio"
                name="marketSize"
                checked={filters.marketSize === size}
                onChange={(e) => handleFilterChange('marketSize', size)}
              />
              <span className="radiomark"></span>
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Growth Rate</h4>
        <select 
          value={filters.growthRate || ''}
          onChange={(e) => handleFilterChange('growthRate', e.target.value)}
          className="filter-select"
        >
          <option value="">Any Growth Rate</option>
          <option value="high">High (+20%+)</option>
          <option value="medium">Medium (10-20%)</option>
          <option value="low">Low (0-10%)</option>
          <option value="declining">Declining</option>
        </select>
      </div>

      <div className="filter-section">
        <h4>Country/Region</h4>
        <select 
          value={filters.country || ''}
          onChange={(e) => handleFilterChange('country', e.target.value)}
          className="filter-select"
        >
          <option value="">All Countries</option>
          <option value="US">United States</option>
          <option value="CN">China</option>
          <option value="EU">European Union</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="IN">India</option>
        </select>
      </div>

      <div className="filter-stats">
        <div className="active-filters">
          <strong>Active Filters:</strong>
          {Object.entries(filters).map(([key, value]) => 
            value && value !== '' && !(Array.isArray(value) && value[0] === 1 && value[1] === 9) ? (
              <span key={key} className="active-filter-tag">
                {key}: {Array.isArray(value) ? value.join('-') : value}
              </span>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;