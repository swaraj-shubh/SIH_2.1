import React from 'react';
import { Brain } from 'lucide-react';

const ExecutiveSummary = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const sectionAccent = isLight ? "text-green-600" : "text-green-400";
  const sectionPurple = isLight ? "text-purple-600" : "text-purple-400";

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-6 mb-6`}>
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
        <Brain className="w-6 h-6" />
        Executive Summary
      </h3>
      {data?.executiveSummary && (
        <div className="space-y-4">
          <div>
            <h4 className={`text-lg font-semibold mb-2 ${textAccent}`}>Overview</h4>
            <p className={`${textSecondary} leading-relaxed`}>{data.executiveSummary.overview}</p>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-2 ${sectionAccent}`}>Key Findings</h4>
            <ul className="space-y-2">
              {data.executiveSummary.keyFindings?.map((finding, idx) => (
                <li key={idx} className={`flex items-start gap-2 ${textSecondary}`}>
                  <span className={`${sectionAccent} mt-1`}>•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-2 ${sectionPurple}`}>Strategic Implications</h4>
            <p className={`${textSecondary} leading-relaxed`}>{data.executiveSummary.strategicImplications}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;