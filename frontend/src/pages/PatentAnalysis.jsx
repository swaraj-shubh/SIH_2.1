import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ChartContainer from '../components/ChartContainer';
import DataTable from '../components/DataTable';
import { patents, patentCharts, patentTableData } from '../mockData/mockData';

const PatentAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="patent-analysis">
      <div className="page-header">
        <h1>Patent Analysis</h1>
        <p>Comprehensive patent intelligence and trend analysis</p>
      </div>

      <div className="search-section">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search patents, inventors, assignees..."
        />
      </div>

      <div className="patent-stats">
        <div className="stat-card">
          <h3>Total Patents</h3>
          <p className="stat-number">12,458</p>
        </div>
        <div className="stat-card">
          <h3>Top Country</h3>
          <p className="stat-number">USA (42%)</p>
        </div>
        <div className="stat-card">
          <h3>Growth Rate</h3>
          <p className="stat-number">+18% YoY</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-row">
          <ChartContainer 
            title="Patent Trends Over Time"
            chartData={patentCharts.trends}
            type="line"
          />
          <ChartContainer 
            title="Patent Distribution by Country"
            chartData={patentCharts.countryDistribution}
            type="bar"
          />
        </div>
        <div className="chart-row">
          <ChartContainer 
            title="Top Assignees"
            chartData={patentCharts.topAssignees}
            type="pie"
          />
          <ChartContainer 
            title="Technology Domain Distribution"
            chartData={patentCharts.technologyDistribution}
            type="radar"
          />
        </div>
      </div>

      <div className="patent-table">
        <h2>Recent Patents</h2>
        <DataTable 
          data={patentTableData}
          columns={[
            { key: 'title', label: 'Patent Title' },
            { key: 'assignee', label: 'Assignee' },
            { key: 'country', label: 'Country' },
            { key: 'filingDate', label: 'Filing Date' },
            { key: 'technology', label: 'Technology' }
          ]}
        />
      </div>
    </div>
  );
};

export default PatentAnalysis;