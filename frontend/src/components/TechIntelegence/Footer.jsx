import React from 'react';

const Footer = ({ data, analyzing, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-4`}>
      <div className="flex items-center justify-between text-sm">
        <div className={`flex items-center gap-6 ${textSecondary}`}>
          <span>Data Points: {data?.metadata?.dataPointsAnalyzed || 'N/A'}</span>
          <span>Version: {data?.metadata?.analysisVersion || '1.0'}</span>
          <span>Status: {analyzing ? 'Analyzing...' : 'Ready'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className={`${analyzing ? 'text-yellow-500' : 'text-green-500'}`}>
            {analyzing ? 'Analysis in Progress' : 'System Active'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;