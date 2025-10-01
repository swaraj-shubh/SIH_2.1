import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TechnologyIntelligence from './pages/TechnologyIntelligence';
import AnalyticsForecasting from './pages/AnalyticsForecasting';
import PatentAnalysis from './pages/PatentAnalysis';
import ResearchPublications from './pages/ResearchPublications';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/technology-intelligence" element={<TechnologyIntelligence />} />
              <Route path="/analytics" element={<AnalyticsForecasting />} />
              <Route path="/patents" element={<PatentAnalysis />} />
              <Route path="/publications" element={<ResearchPublications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;