import React from 'react';
import { ChevronRight } from 'lucide-react';
import MarketSizeChart from '../charts/MarketSizeChart';
import RegionalBreakdownChart from '../charts/RegionalBreakdownChart';

const MarketTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Market Size & Growth</h3>
        <MarketSizeChart data={data.analysis} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Regional Breakdown</h3>
        <RegionalBreakdownChart data={data.analysis} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Growth Drivers</h4>
          <ul className="space-y-2">
            {(data.analysis?.marketAnalysis?.growthDrivers ?? []).map((driver, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5 text-green-600" />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Key Players</h4>
          <div className="flex flex-wrap gap-2">
            {(data.analysis?.marketAnalysis?.keyPlayers ?? []).map((player, i) => (
              <span key={i} className="px-3 py-1 bg-white border rounded-full text-sm">
                {player}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTab;