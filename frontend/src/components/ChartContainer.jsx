import React from 'react';

const ChartContainer = ({ title, chartData, type = 'bar', height = 300 }) => {
  // In a real application, you would integrate with a charting library like Chart.js, Recharts, or ApexCharts
  // This is a mock implementation for demonstration

  // Early return if chartData is not available to prevent rendering errors
  if (!chartData) {
    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <div className="chart-content" style={{ height: `${height}px`, display: 'grid', placeContent: 'center' }}>
          <p className="text-gray-500">No data available for this chart.</p>
        </div>
      </div>
    );
  }

  const renderMockChart = () => {
    const colors = {
      bar: '#3b82f6',
      line: '#8b5cf6',
      pie: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
      radar: '#f59e0b'
    };

    const chartColor = Array.isArray(colors[type]) ? colors[type][0] : colors[type];

    return (
      <div className="mock-chart" style={{ height: `${height}px` }}>
        <div className="chart-placeholder">
          <div className="chart-bars">
            {chartData?.labels?.map((label, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar"
                  style={{
                    height: `${(chartData.datasets[0].data[index] / Math.max(...chartData.datasets[0].data)) * 80}%`,
                    backgroundColor: Array.isArray(colors[type]) ? colors[type][index % colors[type].length] : chartColor
                  }}
                ></div>
                <span className="chart-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            {/* FIX APPLIED HERE: Added optional chaining to safely access .datasets */}
            {chartData?.datasets?.map((dataset, datasetIndex) => (
              <div key={datasetIndex} className="legend-item">
                <div 
                  className="legend-color"
                  style={{ 
                    backgroundColor: Array.isArray(colors[type]) ? colors[type][datasetIndex % colors[type].length] : chartColor 
                  }}
                ></div>
                <span>{dataset.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-note">
          <p>📊 Interactive {type} chart showing: {title}</p>
          <small>In production, this would use a real charting library</small>
        </div>
      </div>
    );
  };

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="chart-content">
        {renderMockChart()}
      </div>
      <div className="chart-actions">
        <button className="btn-secondary btn-small">Export</button>
        <button className="btn-secondary btn-small">View Details</button>
      </div>
    </div>
  );
};

export default ChartContainer;
