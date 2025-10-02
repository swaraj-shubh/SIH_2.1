import React from 'react';
import { Globe, Rocket, Users, DollarSign } from 'lucide-react';

const StatsOverview = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-4 hover:border-blue-400 transition-colors">
        <Globe className="w-5 h-5 text-blue-400 mb-2" />
        <div className="text-3xl font-bold">{data?.rdInvestmentByCountry?.length || 0}</div>
        <div className="text-sm text-slate-400">Countries Tracked</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur border border-green-500/30 rounded-lg p-4 hover:border-green-400 transition-colors">
        <Rocket className="w-5 h-5 text-green-400 mb-2" />
        <div className="text-3xl font-bold">{data?.emergingTechnologies?.length || 0}</div>
        <div className="text-sm text-slate-400">Emerging Technologies</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 transition-colors">
        <Users className="w-5 h-5 text-purple-400 mb-2" />
        <div className="text-3xl font-bold">{data?.keyPlayers?.length || 0}</div>
        <div className="text-sm text-slate-400">Key Players</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur border border-orange-500/30 rounded-lg p-4 hover:border-orange-400 transition-colors">
        <DollarSign className="w-5 h-5 text-orange-400 mb-2" />
        <div className="text-3xl font-bold">${data?.marketGrowth?.currentSize || 0}B</div>
        <div className="text-sm text-slate-400">Current Market Size</div>
      </div>
    </div>
  );
};

export default StatsOverview;