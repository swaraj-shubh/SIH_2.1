import React from 'react';
import { ChevronRight } from 'lucide-react';
import MarketSizeChart from '../charts/MarketSizeChart';
import RegionalBreakdownChart from '../charts/RegionalBreakdownChart';

const MarketTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const listText = isLight ? "text-slate-700" : "text-blue-100";
  const badgeBg = isLight ? "bg-slate-200 border-slate-400" : "bg-slate-700/50 border-blue-500/30";
  const badgeText = isLight ? "text-slate-700" : "text-blue-200";
  const iconColor = isLight ? "text-green-600" : "text-green-400";

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Market Size & Growth</h3>
        <MarketSizeChart data={data.analysis} theme={theme} />
      </div>

      <div>
        <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Regional Breakdown</h3>
        <RegionalBreakdownChart data={data.analysis} theme={theme} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-4 ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
          <h4 className={`font-semibold mb-3 ${textSecondary}`}>Growth Drivers</h4>
          <ul className="space-y-2">
            {(data.analysis?.marketAnalysis?.growthDrivers ?? []).map((driver, i) => (
              <li key={i} className={`text-sm flex items-start gap-2 ${listText}`}>
                <ChevronRight className={`h-4 w-4 mt-0.5 ${iconColor}`} />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        <div className={`p-4 ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
          <h4 className={`font-semibold mb-3 ${textSecondary}`}>Key Players</h4>
          <div className="flex flex-wrap gap-2">
            {(data.analysis?.marketAnalysis?.keyPlayers ?? []).map((player, i) => (
              <span key={i} className={`px-3 py-1 ${badgeBg} border rounded-full text-sm ${badgeText}`}>
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