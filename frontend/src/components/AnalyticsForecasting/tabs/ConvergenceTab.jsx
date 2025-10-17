import React from 'react';
import { GitMerge, ChevronRight } from 'lucide-react';
import ConvergenceNetwork from '../components/ConvergenceNetwork';

const ConvergenceTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const badgeBg = isLight ? "bg-slate-200 border-slate-400" : "bg-slate-700/50 border-blue-500/30";
  const badgeText = isLight ? "text-slate-700" : "text-blue-200";
  const listText = isLight ? "text-slate-700" : "text-blue-100";
  const iconColor = isLight ? "text-purple-600" : "text-purple-400";

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textAccent}`}>
          <GitMerge className="h-5 w-5" />
          Converging Technologies
        </h3>
        <ConvergenceNetwork data={data.analysis} theme={theme} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
          <h4 className={`font-semibold mb-3 ${textSecondary}`}>Cross-Sector Impact</h4>
          <div className="flex flex-wrap gap-2">
            {(data.analysis?.convergenceDetection?.crossSectorImpact ?? []).map((sector, i) => (
              <span key={i} className={`px-3 py-1 ${badgeBg} border rounded-full text-sm ${badgeText}`}>
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className={`p-4 ${cardBg} backdrop-blur-sm rounded-lg border ${isLight ? 'border-purple-300' : 'border-purple-500/30'}`}>
          <h4 className={`font-semibold mb-3 ${isLight ? 'text-purple-600' : 'text-purple-300'}`}>Integration Opportunities</h4>
          <ul className="space-y-2">
            {(data.analysis?.convergenceDetection?.integrationOpportunities ?? []).slice(0, 5).map((opp, i) => (
              <li key={i} className={`text-sm flex items-start gap-2 ${listText}`}>
                <ChevronRight className={`h-4 w-4 mt-0.5 ${iconColor}`} />
                {opp}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConvergenceTab;