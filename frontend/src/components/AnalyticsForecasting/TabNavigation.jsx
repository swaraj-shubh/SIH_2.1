import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['overview', 'market', 'signals', 'convergence', 'insights', 'sources'];
  
  return (
    <div className="border-b border-blue-500/30 flex overflow-x-auto bg-slate-800/50 backdrop-blur-sm">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 font-medium capitalize transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-blue-400 text-blue-400 bg-slate-800/70'
              : 'text-blue-300 hover:text-blue-200 hover:bg-slate-700/50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;