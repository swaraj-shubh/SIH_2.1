import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TechIntelegence from './pages/TechIntelegence';
import AnalyticsForecasting from './pages/AnalyticsForecasting';
import PatentAnalysis from './pages/PatentAnalysis';
import ResearchPublications from './pages/ResearchPublications';
import Home from './pages/Home';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Default theme is light

  return (
    <Router>
      <div className={`flex h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`}>
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} theme={theme} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setSidebarOpen={setSidebarOpen} theme={theme} setTheme={setTheme} />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/technology-intelligence" element={<TechIntelegence theme={theme} />} />
              <Route path="/analytics" element={<AnalyticsForecasting theme={theme} />} />
              <Route path="/patents" element={<PatentAnalysis theme={theme} />} />
              <Route path="/publications" element={<ResearchPublications theme={theme} />} />
              <Route path="*" element={<h1 className={`p-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>page not found 404</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;