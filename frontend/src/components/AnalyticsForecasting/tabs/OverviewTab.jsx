import React from 'react';
import { Activity, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import TRLProgressionChart from '../charts/TRLProgressionChart';
import SCurveChart from '../charts/SCurveChart';
import HypeCycleChart from '../charts/HypeCycleChart';

const OverviewTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const listText = isLight ? "text-slate-700" : "text-blue-100";
  const iconColor = isLight ? "text-blue-600" : "text-blue-400";

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textAccent}`}>
          <Activity className="h-5 w-5" />
          TRL Progression Tracking
        </h3>
        <TRLProgressionChart data={data.analysis} theme={theme} />
        {/* <div className={`mt-4 p-4 ${cardBg} backdrop-blur-sm rounded border ${cardBorder}`}>
          <h4 className={`font-semibold text-sm mb-2 ${textSecondary}`}>Evidence</h4>
          <ul className="space-y-1">
            {(data.analysis?.trlProgression?.evidence ?? []).map((ev, i) => (
              <li key={i} className={`text-sm ${listText} flex items-start gap-2`}>
                <ChevronRight className={`h-4 w-4 mt-0.5 ${iconColor} flex-shrink-0`} />
                {ev}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textAccent}`}>
            <TrendingUp className="h-5 w-5" />
            S-Curve Analysis
          </h3>
          <SCurveChart data={data.analysis} theme={theme} />
          {/* <p className={`text-sm ${textSecondary} mt-2`}>{data.analysis?.sCurveData?.analysis}</p> */}
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${textAccent}`}>
            <Zap className="h-5 w-5" />
            Hype Cycle Position
          </h3>
          <HypeCycleChart data={data.analysis} theme={theme} />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className={textSecondary}>Time to Mainstream:</span>
            <span className={`font-semibold ${textPrimary}`}>{data.analysis?.hypeCycle?.timeToMainstream}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;