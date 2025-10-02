import React from 'react';
import { RefreshCw, Loader } from 'lucide-react';

const Header = ({ lastUpdated, analyzing, triggerNewAnalysis }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            DRDO Technology Intelligence Platform
          </h1>
          <p className="text-blue-300">Real-Time Strategic Technology Analysis & News Monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="text-sm text-slate-400">
              <div className="font-medium">Last Updated</div>
              <div>{new Date(lastUpdated).toLocaleString()}</div>
            </div>
          )}
          <button
            onClick={triggerNewAnalysis}
            disabled={analyzing}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-2"
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