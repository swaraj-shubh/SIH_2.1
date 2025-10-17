import React from 'react';
import { AlertCircle } from 'lucide-react';

const InsightsTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const listText = isLight ? "text-slate-700" : "text-blue-100";
  const opportunityBorder = isLight ? "border-green-300" : "border-green-500/30";
  const opportunityText = isLight ? "text-green-600" : "text-green-400";
  const threatBorder = isLight ? "border-red-300" : "border-red-500/30";
  const threatText = isLight ? "text-red-600" : "text-red-400";
  const recommendationBorder = isLight ? "border-blue-300" : "border-blue-500/30";
  const recommendationText = isLight ? "text-blue-600" : "text-blue-400";
  const investmentBorder = isLight ? "border-purple-300" : "border-purple-500/30";
  const investmentText = isLight ? "text-purple-600" : "text-purple-400";
  const innerCardBg = isLight ? "bg-slate-100" : "bg-slate-700/30";
  const innerCardBorder = isLight ? "border-blue-200" : "border-blue-500/20";
  const numberBg = isLight ? "bg-blue-500 text-white" : "bg-blue-600 text-white";
  const opportunityNumberBg = isLight ? "bg-green-500/20 border-green-400" : "bg-green-500/20 border-green-500/30";
  const opportunityNumberText = isLight ? "text-green-600" : "text-green-400";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 ${cardBg} backdrop-blur-sm rounded-lg border ${opportunityBorder}`}>
          <h3 className={`font-semibold ${opportunityText} mb-4 text-lg`}>Opportunities</h3>
          <ul className="space-y-3">
            {(data.analysis?.strategicInsights?.opportunities ?? []).map((opp, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className={`h-6 w-6 rounded-full ${opportunityNumberBg} flex items-center justify-center flex-shrink-0 mt-0.5 border`}>
                  <span className={`text-xs font-bold ${opportunityNumberText}`}>{i + 1}</span>
                </div>
                <span className={`text-sm ${listText}`}>{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`p-6 ${cardBg} backdrop-blur-sm rounded-lg border ${threatBorder}`}>
          <h3 className={`font-semibold ${threatText} mb-4 text-lg`}>Threats</h3>
          <ul className="space-y-3">
            {(data.analysis?.strategicInsights?.threats ?? []).map((threat, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertCircle className={`h-5 w-5 ${threatText} flex-shrink-0 mt-0.5`} />
                <span className={`text-sm ${listText}`}>{threat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`p-6 ${cardBg} backdrop-blur-sm rounded-lg border ${recommendationBorder}`}>
        <h3 className={`font-semibold ${recommendationText} mb-4 text-lg`}>Strategic Recommendations</h3>
        <div className="space-y-3">
          {(data.analysis?.strategicInsights?.recommendations ?? []).map((rec, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 ${innerCardBg} rounded border ${innerCardBorder}`}>
              <span className={`h-6 w-6 rounded-full ${numberBg} flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                {i + 1}
              </span>
              <p className={`text-sm ${listText}`}>{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 ${cardBg} backdrop-blur-sm rounded-lg border ${investmentBorder}`}>
        <h3 className={`font-semibold ${investmentText} mb-4 text-lg`}>Investment Focus Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(data.analysis?.strategicInsights?.investmentAreas ?? []).map((area, i) => (
            <div key={i} className={`p-3 ${innerCardBg} rounded border ${innerCardBorder} text-center`}>
              <p className={`text-sm font-medium ${listText}`}>{area}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;