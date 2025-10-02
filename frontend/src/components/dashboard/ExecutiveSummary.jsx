import React from 'react';
import { Brain } from 'lucide-react';

const ExecutiveSummary = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Brain className="w-6 h-6 text-blue-400" />
        Executive Summary
      </h3>
      {data?.executiveSummary && (
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Overview</h4>
            <p className="text-slate-300 leading-relaxed">{data.executiveSummary.overview}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-2">Key Findings</h4>
            <ul className="space-y-2">
              {data.executiveSummary.keyFindings?.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-400 mt-1">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-2">Strategic Implications</h4>
            <p className="text-slate-300 leading-relaxed">{data.executiveSummary.strategicImplications}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;