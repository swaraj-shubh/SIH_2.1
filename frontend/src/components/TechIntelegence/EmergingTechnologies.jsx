import React from 'react';
import { Rocket } from 'lucide-react';

const EmergingTechnologies = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const innerCardBg = isLight ? "bg-gradient-to-br from-slate-100 to-slate-50" : "bg-gradient-to-br from-slate-700/70 to-slate-700/30";
  const progressBg = isLight ? "bg-slate-300" : "bg-slate-600";

  const getStrengthBadgeStyle = (strength) => {
    if (isLight) {
      switch (strength) {
        case 'Strong': return 'bg-green-100 text-green-700 border-green-300';
        case 'Growing': return 'bg-blue-100 text-blue-700 border-blue-300';
        default: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      }
    } else {
      switch (strength) {
        case 'Strong': return 'bg-green-500/20 text-green-300';
        case 'Growing': return 'bg-blue-500/20 text-blue-300';
        default: return 'bg-yellow-500/20 text-yellow-300';
      }
    }
  };

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
        <Rocket className="w-5 h-5" />
        Emerging Technologies
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {data?.emergingTechnologies?.map((tech, idx) => (
          <div key={idx} className={`${innerCardBg} p-4 rounded-lg border-l-4 ${isLight ? 'border-blue-400' : 'border-blue-500'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-semibold text-sm ${textPrimary}`}>{tech.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${getStrengthBadgeStyle(tech.signalStrength)}`}>
                {tech.signalStrength}
              </span>
            </div>
            <p className={`text-xs ${textSecondary} mb-3`}>{tech.description}</p>
            <div className="grid grid-cols-4 gap-2 text-xs mb-2">
              <div className="text-center">
                <div className={textSecondary}>Funding</div>
                <div className={`${isLight ? 'text-green-600' : 'text-green-400'} font-bold`}>${tech.fundingEstimate}B</div>
              </div>
              <div className="text-center">
                <div className={textSecondary}>Patents</div>
                <div className={`${isLight ? 'text-purple-600' : 'text-purple-400'} font-bold`}>{tech.patentCount}</div>
              </div>
              <div className="text-center">
                <div className={textSecondary}>Maturity</div>
                <div className={`${isLight ? 'text-orange-600' : 'text-orange-400'} font-bold`}>{tech.maturityLevel}%</div>
              </div>
              <div className="text-center">
                <div className={textSecondary}>Momentum</div>
                <div className={`${isLight ? 'text-blue-600' : 'text-blue-400'} font-bold`}>{tech.momentum}</div>
              </div>
            </div>
            <div className={`${progressBg} rounded-full h-1.5`}>
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full"
                style={{ width: `${tech.momentum}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTechnologies;