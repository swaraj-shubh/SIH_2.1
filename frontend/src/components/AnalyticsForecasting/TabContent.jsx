import React from 'react';

// Import tab components
import OverviewTab from './tabs/OverviewTab';
import MarketTab from './tabs/MarketTab';
import SignalsTab from './tabs/SignalsTab';
import ConvergenceTab from './tabs/ConvergenceTab';
import InsightsTab from './tabs/InsightsTab';
import SourcesTab from './tabs/SourcesTab';

const TabContent = ({ activeTab, data }) => {
  return (
    <div className="p-6 bg-slate-800/30 backdrop-blur-sm">
      {activeTab === 'overview' && <OverviewTab data={data} />}
      {activeTab === 'market' && <MarketTab data={data} />}
      {activeTab === 'signals' && <SignalsTab data={data} />}
      {activeTab === 'convergence' && <ConvergenceTab data={data} />}
      {activeTab === 'insights' && <InsightsTab data={data} />}
      {activeTab === 'sources' && <SourcesTab data={data} />}
    </div>
  );
};

export default TabContent;