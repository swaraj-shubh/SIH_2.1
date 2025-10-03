import React from 'react';

const ConvergenceNetwork = ({ data }) => {
  if (!data?.convergenceDetection?.convergingTechnologies) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.convergenceDetection.convergingTechnologies.slice(0, 4).map((tech, idx) => (
        <div key={idx} className="p-4 border border-purple-500/30 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm text-white">{tech.name}</h4>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
              {tech.maturity}% Mature
            </span>
          </div>
          <p className="text-xs text-blue-200 mb-2">{tech.synergy}</p>
          <div className="flex flex-wrap gap-1">
            {tech.applications?.slice(0, 3)?.map((app, i) => (
              <span key={i} className="text-xs bg-slate-700/50 text-blue-200 px-2 py-1 rounded border border-blue-500/30">
                {app}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConvergenceNetwork;