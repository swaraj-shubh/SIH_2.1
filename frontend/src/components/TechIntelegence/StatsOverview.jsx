import React from 'react';
import { Globe, Rocket, Users, DollarSign } from 'lucide-react';

const StatsOverview = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = (color) => isLight 
    ? `border-${color}-300 hover:border-${color}-400` 
    : `border-${color}-500/30 hover:border-${color}-400`;
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const iconColors = {
    blue: isLight ? "text-blue-600" : "text-blue-400",
    green: isLight ? "text-green-600" : "text-green-400",
    purple: isLight ? "text-purple-600" : "text-purple-400",
    orange: isLight ? "text-orange-600" : "text-orange-400"
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className={`${cardBg} backdrop-blur border ${cardBorder('blue')} rounded-lg p-4 transition-colors`}>
        <Globe className={`w-5 h-5 ${iconColors.blue} mb-2`} />
        <div className={`text-3xl font-bold ${textPrimary}`}>{data?.rdInvestmentByCountry?.length || 0}</div>
        <div className={`text-sm ${textSecondary}`}>Countries Tracked</div>
      </div>
      <div className={`${cardBg} backdrop-blur border ${cardBorder('green')} rounded-lg p-4 transition-colors`}>
        <Rocket className={`w-5 h-5 ${iconColors.green} mb-2`} />
        <div className={`text-3xl font-bold ${textPrimary}`}>{data?.emergingTechnologies?.length || 0}</div>
        <div className={`text-sm ${textSecondary}`}>Emerging Technologies</div>
      </div>
      <div className={`${cardBg} backdrop-blur border ${cardBorder('purple')} rounded-lg p-4 transition-colors`}>
        <Users className={`w-5 h-5 ${iconColors.purple} mb-2`} />
        <div className={`text-3xl font-bold ${textPrimary}`}>{data?.keyPlayers?.length || 0}</div>
        <div className={`text-sm ${textSecondary}`}>Key Players</div>
      </div>
      <div className={`${cardBg} backdrop-blur border ${cardBorder('orange')} rounded-lg p-4 transition-colors`}>
        <DollarSign className={`w-5 h-5 ${iconColors.orange} mb-2`} />
        <div className={`text-3xl font-bold ${textPrimary}`}>${data?.marketGrowth?.currentSize || 0}B</div>
        <div className={`text-sm ${textSecondary}`}>Current Market Size</div>
      </div>
    </div>
  );
};

export default StatsOverview;