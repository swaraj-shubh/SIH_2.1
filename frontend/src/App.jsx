import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/TestDashboard';
import Dashboard from './pages/Dashboard';
import TechnologyIntelligence from './pages/TechnologyIntelligence';
import AnalyticsForecasting from './pages/AnalyticsForecasting';
import PatentAnalysis from './pages/PatentAnalysis';
import ResearchPublications from './pages/ResearchPublications';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setSidebarOpen={setSidebarOpen} />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/technology-intelligence" element={<TechnologyIntelligence />} />
              <Route path="/analytics" element={<AnalyticsForecasting />} />
              <Route path="/patents" element={<PatentAnalysis />} />
              <Route path="/dashboardold" element={<DashboardPage />} />
              <Route path="/publications" element={<ResearchPublications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;