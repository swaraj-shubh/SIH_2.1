import React from 'react';
import { RefreshCw, Loader } from 'lucide-react';

const Header = ({ lastUpdated, analyzing, triggerNewAnalysis, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const gradientText = isLight 
    ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" 
    : "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent";
  const buttonPrimary = isLight 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white";
  const buttonDisabled = isLight ? "bg-slate-400" : "bg-slate-600";

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${gradientText}`}>
            DRDO Technology Intelligence Platform
          </h1>
          <p className={textSecondary}>Real-Time Strategic Technology Analysis & News Monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className={`text-sm ${textSecondary}`}>
              <div className="font-medium">Last Updated</div>
              <div>{new Date(lastUpdated).toLocaleString()}</div>
            </div>
          )}
          <button
            onClick={triggerNewAnalysis}
            disabled={analyzing}
            className={`px-6 py-3 ${analyzing ? buttonDisabled : buttonPrimary} rounded-lg font-medium transition-colors flex items-center gap-2`}
          >
            {analyzing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Refresh Analysis
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;