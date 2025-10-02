import React from 'react';
import { Rocket } from 'lucide-react';

const EmergingTechnologies = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-blue-400" />
        Emerging Technologies
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {data?.emergingTechnologies?.map((tech, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-700/70 to-slate-700/30 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{tech.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                tech.signalStrength === 'Strong' ? 'bg-green-500/20 text-green-300' :
                tech.signalStrength === 'Growing' ? 'bg-blue-500/20 text-blue-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {tech.signalStrength}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">{tech.description}</p>
            <div className="grid grid-cols-4 gap-2 text-xs mb-2">
              <div className="text-center">
                <div className="text-slate-400">Funding</div>
                <div className="text-green-400 font-bold">${tech.fundingEstimate}B</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Patents</div>
                <div className="text-purple-400 font-bold">{tech.patentCount}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Maturity</div>
                <div className="text-orange-400 font-bold">{tech.maturityLevel}%</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Momentum</div>
                <div className="text-blue-400 font-bold">{tech.momentum}</div>
              </div>
            </div>
            <div className="bg-slate-600 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full"
                style={{ width: `${tech.momentum}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTechnologies;