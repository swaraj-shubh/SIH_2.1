import React, { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { technologies } from '../mockData/technologies';

const TechnologyIntelligence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domains: [],
    trlLevels: [],
    marketSize: []
  });

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...(prev[filterType] || []), value]
        : (prev[filterType] || []).filter(item => item !== value)
    }));
  };

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = filters.domains.length === 0 || 
                         filters.domains.some(domain => tech.tags.includes(domain));
    
    const matchesTRL = filters.trlLevels.length === 0 || 
                      filters.trlLevels.includes(tech.trl);
    
    return matchesSearch && matchesDomain && matchesTRL;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Technology Intelligence</h1>
        <p className="text-gray-600">Comprehensive technology scouting and analysis</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <SearchBar 
            placeholder="Search technologies..."
            onSearch={setSearchTerm}
          />

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {filteredTechnologies.length} technologies found
            </p>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by: Relevance</option>
              <option>Sort by: TRL Level</option>
              <option>Sort by: Market Size</option>
              <option>Sort by: Growth Rate</option>
            </select>
          </div>

          {/* Technology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTechnologies.map((tech, index) => (
              <TechnologyCard key={index} technology={tech} />
            ))}
          </div>

          {filteredTechnologies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No technologies found matching your criteria</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnologyIntelligence;