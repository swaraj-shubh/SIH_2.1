import React from 'react';
import { TrendingUp } from 'lucide-react';

const MarketGrowth = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        Market Growth
      </h3>
      {data?.marketGrowth && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 p-4 rounded-lg text-center">
            <div className="text-xs text-slate-400 mb-1">Current (2024)</div>
            <div className="text-3xl font-bold text-blue-400">${data.marketGrowth.currentSize}B</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 p-4 rounded-lg text-center">
            <div className="text-xs text-slate-400 mb-1">Forecast 2030</div>
            <div className="text-3xl font-bold text-green-400">${data.marketGrowth.forecastedSize2030}B</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 p-4 rounded-lg text-center">
            <div className="text-xs text-slate-400 mb-1">CAGR</div>
            <div className="text-2xl font-bold text-purple-400">{data.marketGrowth.cagr}%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketGrowth;