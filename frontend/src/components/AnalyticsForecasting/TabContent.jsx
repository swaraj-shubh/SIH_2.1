import React from 'react';

// Import tab components
import OverviewTab from './tabs/OverviewTab';
import MarketTab from './tabs/MarketTab';
import SignalsTab from './tabs/SignalsTab';
import ConvergenceTab from './tabs/ConvergenceTab';
import InsightsTab from './tabs/InsightsTab';
import SourcesTab from './tabs/SourcesTab';

const TabContent = ({ activeTab, data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  const background = isLight ? "bg-slate-100" : "bg-slate-800/30";

  return (
    <div className={`p-6 ${background} backdrop-blur-sm`}>
      {activeTab === 'overview' && <OverviewTab data={data} theme={theme} />}
      {activeTab === 'market' && <MarketTab data={data} theme={theme} />}
      {activeTab === 'signals' && <SignalsTab data={data} theme={theme} />}
      {activeTab === 'convergence' && <ConvergenceTab data={data} theme={theme} />}
      {activeTab === 'insights' && <InsightsTab data={data} theme={theme} />}
      {activeTab === 'sources' && <SourcesTab data={data} theme={theme} />}
    </div>
  );
};

export default TabContent;