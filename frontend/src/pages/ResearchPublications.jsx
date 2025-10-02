import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import ChartContainer from '../components/ChartContainer';
import { publications } from '../mockData/publications';

const ResearchPublications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const publicationColumns = [
    { key: 'title', title: 'Publication Title' },
    { key: 'authors', title: 'Authors' },
    { key: 'journal', title: 'Journal/Conference' },
    { key: 'date', title: 'Publication Date' },
    { key: 'citations', title: 'Citations' },
    { key: 'technology', title: 'Technology Domain' },
  ];

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.technology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Research Publications</h1>
        <p className="text-gray-600">Scientific publications and research trend analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Research Trends */}
        <ChartContainer title="Research Trends" className="lg:col-span-2">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500">Research Trends Chart</p>
              <p className="text-gray-400 text-sm">Publication trends over time</p>
            </div>
          </div>
        </ChartContainer>

        {/* Citation Analysis */}
        <ChartContainer title="Citation Analysis">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500">Citation Impact</p>
              <p className="text-gray-400 text-sm">Citation distribution and impact factors</p>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Publication Search */}
      <ChartContainer title="Publication Search">
        <div className="space-y-4">
          <SearchBar 
            placeholder="Search publications by title, authors, or technology..."
            onSearch={setSearchTerm}
          />
          
          <DataTable 
            data={filteredPublications}
            columns={publicationColumns}
          />
        </div>
      </ChartContainer>
    </div>
  );
};

export default ResearchPublications;