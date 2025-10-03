import React from 'react';
import { AlertCircle } from 'lucide-react';

const InsightsTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-green-500/30">
          <h3 className="font-semibold text-green-400 mb-4 text-lg">Opportunities</h3>
          <ul className="space-y-3">
            {(data.analysis?.strategicInsights?.opportunities ?? []).map((opp, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-green-500/30">
                  <span className="text-xs font-bold text-green-400">{i + 1}</span>
                </div>
                <span className="text-sm text-blue-100">{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-red-500/30">
          <h3 className="font-semibold text-red-400 mb-4 text-lg">Threats</h3>
          <ul className="space-y-3">
            {(data.analysis?.strategicInsights?.threats ?? []).map((threat, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-100">{threat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-blue-500/30">
        <h3 className="font-semibold text-blue-400 mb-4 text-lg">Strategic Recommendations</h3>
        <div className="space-y-3">
          {(data.analysis?.strategicInsights?.recommendations ?? []).map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded border border-blue-500/20">
              <span className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-blue-100">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-purple-500/30">
        <h3 className="font-semibold text-purple-400 mb-4 text-lg">Investment Focus Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(data.analysis?.strategicInsights?.investmentAreas ?? []).map((area, i) => (
            <div key={i} className="p-3 bg-slate-700/30 rounded border border-purple-500/20 text-center">
              <p className="text-sm font-medium text-blue-100">{area}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;