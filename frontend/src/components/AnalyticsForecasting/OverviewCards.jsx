import React from 'react';
import { Activity, TrendingUp, Target, FileText } from 'lucide-react';

const OverviewCards = ({ data, topic, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-200" : "border-blue-800/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className={`${cardBg} backdrop-blur-sm p-4 rounded-lg border ${cardBorder}`}>
        <div className="flex items-center gap-2 mb-2">
          <Activity className={`h-5 w-5 ${textAccent}`} />
          <span className={`text-sm ${textSecondary}`}>Current TRL</span>
        </div>
        <p className={`text-2xl font-bold ${textPrimary}`}>{data.analysis?.trlProgression?.currentLevel ?? 'N/A'}</p>
        <p className={`text-xs ${textSecondary} mt-1`}>{data.analysis?.trlProgression?.levelDescription?.substring(0, 50)}</p>
      </div>

      <div className={`${cardBg} backdrop-blur-sm p-4 rounded-lg border ${cardBorder}`}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className={`h-5 w-5 ${isLight ? 'text-green-600' : 'text-green-400'}`} />
          <span className={`text-sm ${textSecondary}`}>Adoption Phase</span>
        </div>
        <p className={`text-2xl font-bold ${textPrimary}`}>{data.analysis?.sCurveData?.phase ?? 'N/A'}</p>
        <p className={`text-xs ${textSecondary} mt-1`}>{data.analysis?.sCurveData?.adoptionRate ?? 0}% Adoption Rate</p>
      </div>

      <div className={`${cardBg} backdrop-blur-sm p-4 rounded-lg border ${cardBorder}`}>
        <div className="flex items-center gap-2 mb-2">
          <Target className={`h-5 w-5 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
          <span className={`text-sm ${textSecondary}`}>Market Size</span>
        </div>
        <p className={`text-2xl font-bold ${textPrimary}`}>${data.analysis?.marketAnalysis?.currentSize ?? 'N/A'}B</p>
        <p className={`text-xs ${textSecondary} mt-1`}>{data.analysis?.marketAnalysis?.cagr ?? 'N/A'}% CAGR</p>
      </div>

      <div className={`${cardBg} backdrop-blur-sm p-4 rounded-lg border ${cardBorder}`}>
        <div className="flex items-center gap-2 mb-2">
          <FileText className={`h-5 w-5 ${isLight ? 'text-orange-600' : 'text-orange-400'}`} />
          <span className={`text-sm ${textSecondary}`}>Data Sources</span>
        </div>
        <p className={`text-2xl font-bold ${textPrimary}`}>
          {((data.metadata?.newsCount ?? 0) + (data.metadata?.patentCount ?? 0))}
        </p>
        <p className={`text-xs ${textSecondary} mt-1`}>{data.metadata?.newsCount ?? 0} News, {data.metadata?.patentCount ?? 0} Patents</p>
      </div>
    </div>
  );
};

export default OverviewCards;