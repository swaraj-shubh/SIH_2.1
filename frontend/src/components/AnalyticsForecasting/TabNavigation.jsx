import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight ? "bg-slate-100" : "bg-slate-800/50";
  const border = isLight ? "border-slate-300" : "border-blue-500/30";
  const activeTabStyle = isLight 
    ? "border-b-2 border-blue-500 text-blue-600 bg-slate-200" 
    : "border-b-2 border-blue-400 text-blue-400 bg-slate-800/70";
  const inactiveTabStyle = isLight 
    ? "text-slate-600 hover:text-slate-800 hover:bg-slate-300" 
    : "text-blue-300 hover:text-blue-200 hover:bg-slate-700/50";

  const tabs = ['overview', 'market', 'signals', 'convergence', 'insights', 'sources'];
  
  return (
    <div className={`border-b ${border} flex overflow-x-auto ${background} backdrop-blur-sm`}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 font-medium capitalize transition-colors ${
            activeTab === tab ? activeTabStyle : inactiveTabStyle
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;