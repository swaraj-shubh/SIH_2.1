import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import TechnologyCard from '../components/TechnologyCard';
import DataTable from '../components/DataTable';
import { technologies, technologyTableData } from '../mockData/mockData';

const TechnologyIntelligence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    trlRange: [1, 9],
    marketSize: ''
  });

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="technology-intelligence">
      <div className="page-header">
        <h1>Technology Intelligence</h1>
        <p>Comprehensive analysis of emerging and critical technologies</p>
      </div>

      <div className="controls-section">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search technologies, domains, keywords..."
        />
        <FilterPanel filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="content-layout">
        <div className="technologies-overview">
          <h2>Technologies Overview</h2>
          <div className="technologies-grid">
            {filteredTechnologies.map(tech => (
              <TechnologyCard key={tech.id} technology={tech} detailed />
            ))}
          </div>
        </div>

        <div className="data-table-section">
          <h2>Detailed Technology Analysis</h2>
          <DataTable 
            data={technologyTableData}
            columns={[
              { key: 'name', label: 'Technology' },
              { key: 'domain', label: 'Domain' },
              { key: 'trl', label: 'TRL' },
              { key: 'marketSize', label: 'Market Size' },
              { key: 'growthRate', label: 'Growth Rate' }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnologyIntelligence;