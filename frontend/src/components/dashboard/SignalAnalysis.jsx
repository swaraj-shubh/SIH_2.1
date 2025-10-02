import React from 'react';
import { Activity } from 'lucide-react';

const SignalAnalysis = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-400" />
        Signal Analysis
      </h3>
      <div className="space-y-3">
        {data?.signalAnalysis && (
          <>
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weak Signals</span>
                <span className="text-yellow-400 font-bold">{data.signalAnalysis.weakSignals?.length || 0}</span>
              </div>
              {data.signalAnalysis.weakSignals?.slice(0, 2).map((signal, idx) => (
                <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Emerging Signals</span>
                <span className="text-blue-400 font-bold">{data.signalAnalysis.emergingSignals?.length || 0}</span>
              </div>
              {data.signalAnalysis.emergingSignals?.slice(0, 2).map((signal, idx) => (
                <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Growing Signals</span>
                <span className="text-green-400 font-bold">{data.signalAnalysis.growingSignals?.length || 0}</span>
              </div>
              {data.signalAnalysis.growingSignals?.slice(0, 2).map((signal, idx) => (
                <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignalAnalysis;