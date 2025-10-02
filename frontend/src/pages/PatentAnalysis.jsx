import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import ChartContainer from '../components/ChartContainer';
import { patents } from '../mockData/patents';

const PatentAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patentColumns = [
    { key: 'title', title: 'Patent Title' },
    { key: 'number', title: 'Patent Number' },
    { key: 'assignee', title: 'Assignee' },
    { key: 'country', title: 'Country' },
    { key: 'filingDate', title: 'Filing Date' },
    { key: 'technology', title: 'Technology Domain' },
  ];

  const filteredPatents = patents.filter(patent =>
    patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patent.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patent.technology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patent Analysis</h1>
        <p className="text-gray-600">Global patent landscape and intellectual property analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patent Trends */}
        <ChartContainer title="Patent Trends Over Time" className="lg:col-span-2">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500">Patent Trends Chart</p>
              <p className="text-gray-400 text-sm">Filing trends and growth patterns</p>
            </div>
          </div>
        </ChartContainer>

        {/* Country Distribution */}
        <ChartContainer title="Country-wise Distribution">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500">Geographical Distribution</p>
              <p className="text-gray-400 text-sm">Patent distribution by country</p>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Patent Search */}
      <ChartContainer title="Patent Search & Analysis">
        <div className="space-y-4">
          <SearchBar 
            placeholder="Search patents by title, assignee, or technology..."
            onSearch={setSearchTerm}
          />
          
          <DataTable 
            data={filteredPatents}
            columns={patentColumns}
          />
        </div>
      </ChartContainer>
    </div>
  );
};

export default PatentAnalysis;