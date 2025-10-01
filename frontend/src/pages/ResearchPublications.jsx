import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ChartContainer from '../components/ChartContainer';
import DataTable from '../components/DataTable';
import { publications, publicationCharts, publicationTableData } from '../mockData/mockData';

const ResearchPublications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [timeRange, setTimeRange] = useState('5y');

  const domains = [
    'All Domains',
    'Artificial Intelligence',
    'Quantum Computing',
    'Biotechnology',
    'Nanotechnology',
    'Advanced Materials',
    'Renewable Energy'
  ];

  const timeRanges = [
    { value: '1y', label: 'Last Year' },
    { value: '2y', label: 'Last 2 Years' },
    { value: '5y', label: 'Last 5 Years' },
    { value: '10y', label: 'Last 10 Years' }
  ];

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.some(author => 
      author.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableActions = [
    {
      label: 'View Details',
      icon: '👁️',
      onClick: (publication) => {
        console.log('View publication:', publication);
        // In real app, this would open a modal or navigate to detail page
        alert(`Viewing: ${publication.title}`);
      }
    },
    {
      label: 'Download',
      icon: '📥',
      onClick: (publication) => {
        console.log('Download publication:', publication);
        // In real app, this would trigger download
        alert(`Downloading: ${publication.title}`);
      }
    },
    {
      label: 'Cite',
      icon: '📝',
      onClick: (publication) => {
        console.log('Cite publication:', publication);
        // In real app, this would show citation options
        alert(`Citation for: ${publication.title}`);
      }
    }
  ];

  return (
    <div className="research-publications">
      <div className="page-header">
        <h1>Research Publications</h1>
        <p>Comprehensive analysis of scientific publications and research trends</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Publications</h3>
          <p className="stat-number">12,847</p>
          <span className="stat-trend positive">+15%</span>
        </div>
        <div className="stat-card">
          <h3>Citations (Avg.)</h3>
          <p className="stat-number">24.3</p>
          <span className="stat-trend positive">+8%</span>
        </div>
        <div className="stat-card">
          <h3>H-Index</h3>
          <p className="stat-number">156</p>
          <span className="stat-trend positive">+12</span>
        </div>
        <div className="stat-card">
          <h3>Active Researchers</h3>
          <p className="stat-number">8,452</p>
          <span className="stat-trend positive">+5%</span>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search publications, authors, journals..."
          advanced={true}
        />
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Domain</label>
            <select 
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="filter-select"
            >
              {domains.map(domain => (
                <option key={domain} value={domain.toLowerCase().replace(' ', '-')}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Time Range</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="filter-select"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select className="filter-select">
              <option value="relevance">Relevance</option>
              <option value="date">Publication Date</option>
              <option value="citations">Citation Count</option>
              <option value="journal">Journal Impact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <h2>Publication Analytics</h2>
        <div className="chart-row">
          <ChartContainer 
            title="Publication Trends Over Time"
            chartData={publicationCharts.trends}
            type="line"
          />
          <ChartContainer 
            title="Top Research Institutions"
            chartData={publicationCharts.institutions}
            type="bar"
          />
        </div>
        
        <div className="chart-row">
          <ChartContainer 
            title="Domain Distribution"
            chartData={publicationCharts.domainDistribution}
            type="pie"
          />
          <ChartContainer 
            title="Citation Impact Analysis"
            chartData={publicationCharts.citationImpact}
            type="radar"
          />
        </div>

        <div className="chart-full">
          <ChartContainer 
            title="Collaboration Network Map"
            chartData={publicationCharts.collaborationMap}
            type="line"
            height={400}
          />
        </div>
      </div>

      {/* Publications Table */}
      <div className="publications-table-section">
        <div className="section-header">
          <h2>Research Publications</h2>
          <div className="table-actions">
            <button className="btn-primary">Export Data</button>
            <button className="btn-secondary">Create Alert</button>
            <button className="btn-secondary">Save Search</button>
          </div>
        </div>

        <DataTable 
          data={publicationTableData}
          columns={[
            { key: 'title', label: 'Publication Title' },
            { key: 'authors', label: 'Authors' },
            { key: 'journal', label: 'Journal/Conference' },
            { key: 'date', label: 'Publication Date' },
            { key: 'citations', label: 'Citations' },
            { key: 'impact', label: 'Impact Factor' },
            { key: 'domain', label: 'Domain' }
          ]}
          itemsPerPage={10}
          sortable={true}
          selectable={true}
          actions={tableActions}
          onRowClick={(publication) => {
            console.log('Row clicked:', publication);
            // Navigate to publication detail or open modal
          }}
        />
      </div>

      {/* Additional Insights */}
      <div className="insights-section">
        <h2>Research Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🔬 Emerging Research Areas</h3>
            <ul className="insight-list">
              <li>Quantum Machine Learning (+245% growth)</li>
              <li>Synthetic Biology (+189% growth)</li>
              <li>Neuromorphic Computing (+167% growth)</li>
              <li>2D Materials Research (+156% growth)</li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>🤝 Top Collaborations</h3>
            <ul className="insight-list">
              <li>MIT - Stanford (42 joint publications)</li>
              <li>Harvard - Cambridge (38 joint publications)</li>
              <li>ETH Zurich - Max Planck (35 joint publications)</li>
              <li>IIT - DRDO Labs (28 joint publications)</li>
            </ul>
          </div>
          
          <div className="insight-card">
            <h3>📈 High-Impact Journals</h3>
            <ul className="insight-list">
              <li>Nature (Impact: 42.78)</li>
              <li>Science (Impact: 41.84)</li>
              <li>Cell (Impact: 36.22)</li>
              <li>Nature Communications (Impact: 14.92)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPublications;