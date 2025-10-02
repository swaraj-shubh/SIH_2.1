import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
  const domains = ['AI/ML', 'Quantum Computing', 'Cybersecurity', 'Advanced Materials', 'Biotechnology', 'Robotics'];
  const trlLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Domain Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technology Domain</label>
          <div className="space-y-2">
            {domains.map((domain) => (
              <label key={domain} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.domains?.includes(domain) || false}
                  onChange={(e) => onFilterChange('domains', domain, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{domain}</span>
              </label>
            ))}
          </div>
        </div>

        {/* TRL Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TRL Level</label>
          <div className="space-y-2">
            {trlLevels.map((trl) => (
              <label key={trl} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.trlLevels?.includes(trl) || false}
                  onChange={(e) => onFilterChange('trlLevels', trl, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">TRL {trl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Market Size Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Market Size</label>
          <div className="space-y-2">
            {['< $1B', '$1B - $10B', '$10B - $50B', '> $50B'].map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.marketSize?.includes(range) || false}
                  onChange={(e) => onFilterChange('marketSize', range, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{range}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;