import React from 'react';

const Footer = ({ data, analyzing }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6 text-slate-400">
          <span>Data Points: {data?.metadata?.dataPointsAnalyzed || 'N/A'}</span>
          <span>Version: {data?.metadata?.analysisVersion || '1.0'}</span>
          <span>Status: {analyzing ? 'Analyzing...' : 'Ready'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className={analyzing ? 'text-yellow-400' : 'text-green-400'}>
            {analyzing ? 'Analysis in Progress' : 'System Active'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;