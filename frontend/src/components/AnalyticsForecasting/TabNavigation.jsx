import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['overview', 'market', 'signals', 'convergence', 'insights', 'sources'];
  
  return (
    <div className="border-b flex overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 font-medium capitalize ${
            activeTab === tab
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;