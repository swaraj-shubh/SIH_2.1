import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Technology Intelligence', href: '/technology-intelligence', icon: '🔍' },
    { name: 'Analytics & Forecasting', href: '/analytics', icon: '📈' },
    { name: 'Patent Analysis', href: '/patents', icon: '📑' },
    { name: 'Research Publications', href: '/publications', icon: '📚' },
    // { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 flex z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center rounded-lg hover:bg-gray-700 h-16 bg-gray-900">
          <Link to="/" className="absolute left-4">
          <h2 className="text-white text-xl font-bold">DRDO Tech Intelligence</h2>
          </Link>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${location.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;