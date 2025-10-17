import React from 'react';
import { TrendingUp } from 'lucide-react';

const MarketGrowth = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const statCardBg = (color) => isLight 
    ? `bg-${color}-100 border-${color}-300` 
    : `bg-gradient-to-br from-${color}-500/20 to-${color}-500/5 border-${color}-500/30`;

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
        <TrendingUp className="w-5 h-5" />
        Market Growth
      </h3>
      {data?.marketGrowth && (
        <div className="space-y-4">
          <div className={`${statCardBg('blue')} border p-4 rounded-lg text-center`}>
            <div className={`text-xs ${textSecondary} mb-1`}>Current (2024)</div>
            <div className={`text-3xl font-bold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>${data.marketGrowth.currentSize}B</div>
          </div>
          <div className={`${statCardBg('green')} border p-4 rounded-lg text-center`}>
            <div className={`text-xs ${textSecondary} mb-1`}>Forecast 2030</div>
            <div className={`text-3xl font-bold ${isLight ? 'text-green-600' : 'text-green-400'}`}>${data.marketGrowth.forecastedSize2030}B</div>
          </div>
          <div className={`${statCardBg('purple')} border p-4 rounded-lg text-center`}>
            <div className={`text-xs ${textSecondary} mb-1`}>CAGR</div>
            <div className={`text-2xl font-bold ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>{data.marketGrowth.cagr}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketGrowth;