import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <h2>TechIntelligence Platform</h2>
        </div>
      </div>
      
      <div className="header-center">
        <span className="status-indicator">
          <span className="status-dot"></span>
          System Active
        </span>
      </div>

      <div className="header-right">
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <div className="user-menu">
          <span className="user-name">DRDO Analyst</span>
          <div className="user-avatar">
            <span>DA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;