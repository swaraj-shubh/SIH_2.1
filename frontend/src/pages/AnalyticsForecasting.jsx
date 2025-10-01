import React, { useState } from 'react';
import ChartContainer from '../components/ChartContainer';
import { analyticsCharts } from '../mockData/mockData';

const AnalyticsForecasting = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('all');

  return (
    <div className="analytics-forecasting">
      <div className="page-header">
        <h1>Analytics & Forecasting</h1>
        <p>Advanced analytics and predictive forecasting for technology evolution</p>
      </div>

      <div className="controls">
        <select 
          value={selectedTechnology}
          onChange={(e) => setSelectedTechnology(e.target.value)}
          className="tech-selector"
        >
          <option value="all">All Technologies</option>
          <option value="ai">Artificial Intelligence</option>
          <option value="quantum">Quantum Computing</option>
          <option value="biotech">Biotechnology</option>
        </select>
      </div>

      <div className="charts-grid">
        <div className="chart-full">
          <ChartContainer 
            title="Technology S-Curve Analysis"
            chartData={analyticsCharts.sCurve}
            type="line"
            height={400}
          />
        </div>
        
        <div className="chart-row">
          <ChartContainer 
            title="Hype Cycle Analysis"
            chartData={analyticsCharts.hypeCycle}
            type="line"
          />
          <ChartContainer 
            title="TRL Progression Tracking"
            chartData={analyticsCharts.trlProgression}
            type="line"
          />
        </div>

        <div className="chart-row">
          <ChartContainer 
            title="Technology Convergence Detection"
            chartData={analyticsCharts.convergence}
            type="radar"
          />
          <ChartContainer 
            title="Market Size Projection"
            chartData={analyticsCharts.marketProjection}
            type="bar"
          />
        </div>

        <div className="chart-full">
          <ChartContainer 
            title="Signal Analysis & Emerging Trends"
            chartData={analyticsCharts.signalAnalysis}
            type="line"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsForecasting;