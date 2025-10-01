import React from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ChartContainer from '../components/ChartContainer';
import { technologies, dashboardCharts } from '../mockData/mockData';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Technology Intelligence Dashboard</h1>
        <p>Real-time insights and forecasting for strategic decision-making</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Technologies</h3>
          <p className="stat-number">24</p>
          <span className="stat-trend positive">+12%</span>
        </div>
        <div className="stat-card">
          <h3>Patents Analyzed</h3>
          <p className="stat-number">1,247</p>
          <span className="stat-trend positive">+8%</span>
        </div>
        <div className="stat-card">
          <h3>Publications</h3>
          <p className="stat-number">892</p>
          <span className="stat-trend positive">+15%</span>
        </div>
        <div className="stat-card">
          <h3>TRL Progress</h3>
          <p className="stat-number">Avg. 6.2</p>
          <span className="stat-trend positive">+0.3</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-technologies">
          <h2>Recently Monitored Technologies</h2>
          <div className="technologies-grid">
            {technologies.slice(0, 4).map(tech => (
              <TechnologyCard key={tech.id} technology={tech} />
            ))}
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-row">
            <ChartContainer 
              title="Technology Readiness Level Distribution"
              chartData={dashboardCharts.trlDistribution}
              type="bar"
            />
            <ChartContainer 
              title="Market Growth Forecast"
              chartData={dashboardCharts.marketForecast}
              type="line"
            />
          </div>
          <div className="chart-row">
            <ChartContainer 
              title="Technology Domains"
              chartData={dashboardCharts.domainDistribution}
              type="pie"
            />
            <ChartContainer 
              title="Emerging Signals"
              chartData={dashboardCharts.emergingSignals}
              type="radar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;