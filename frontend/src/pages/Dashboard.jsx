import React from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ChartContainer from '../components/ChartContainer';
import { dashboardData, recentUpdates } from '../mockData/chartsData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Technology Intelligence Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% from last month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Technologies */}
        <ChartContainer title="Emerging Technologies">
          <div className="space-y-4">
            {dashboardData.technologies.map((tech, index) => (
              <TechnologyCard key={index} technology={tech} />
            ))}
          </div>
        </ChartContainer>

        {/* Recent Updates */}
        <ChartContainer title="Recent Updates & Alerts">
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className={`w-2 h-2 mt-2 rounded-full ${update.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{update.title}</p>
                  <p className="text-sm text-gray-600">{update.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{update.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="TRL Distribution">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">TRL Distribution Chart</p>
          </div>
        </ChartContainer>
        
        <ChartContainer title="Technology Growth">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Growth Trends Chart</p>
          </div>
        </ChartContainer>
        
        <ChartContainer title="Market Segmentation">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Market Segmentation Chart</p>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Dashboard;