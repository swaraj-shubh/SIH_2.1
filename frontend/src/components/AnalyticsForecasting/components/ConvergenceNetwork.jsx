import React from 'react';

const ConvergenceNetwork = ({ data }) => {
  if (!data?.convergenceDetection?.convergingTechnologies) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.convergenceDetection.convergingTechnologies.slice(0, 4).map((tech, idx) => (
        <div key={idx} className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">{tech.name}</h4>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {tech.maturity}% Mature
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{tech.synergy}</p>
          <div className="flex flex-wrap gap-1">
            {tech.applications?.slice(0, 3)?.map((app, i) => (
              <span key={i} className="text-xs bg-white px-2 py-1 rounded border">
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