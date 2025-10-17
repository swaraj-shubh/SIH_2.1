import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Header = ({ setSidebarOpen, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`${theme === 'light' ? 'bg-white shadow-sm border-gray-200' : 'bg-slate-800 shadow-md border-slate-700'} border-b`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            type="button"
            className={`${theme === 'light' ? 'text-gray-500 hover:text-gray-600' : 'text-slate-400 hover:text-slate-300'} lg:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className={`ml-4 text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Technology Intelligence Platform
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'light' 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-slate-300 hover:bg-slate-700'
            }`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">DR</span>
            </div>
            <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-slate-300'}`}>
              DRDO User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;