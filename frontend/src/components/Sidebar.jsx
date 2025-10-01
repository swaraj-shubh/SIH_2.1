import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/technology-intelligence', label: 'Technology Intelligence', icon: '🔍' },
    { path: '/analytics', label: 'Analytics & Forecasting', icon: '📈' },
    { path: '/patents', label: 'Patent Analysis', icon: '📑' },
    { path: '/publications', label: 'Research Publications', icon: '📚' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="system-status">
          <h4>Data Sources</h4>
          <div className="source-status">
            <span className="status active">Patents DB</span>
            <span className="status active">Publications</span>
            <span className="status active">Market Data</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;