import React from 'react';
import { AlertCircle } from 'lucide-react';
import SignalStrengthRadar from '../charts/SignalStrengthRadar';

const SignalsTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Signal Momentum</h3>
        <SignalStrengthRadar data={data.analysis} />
      </div>

      <div className="space-y-4">
        {(data.analysis?.signalAnalysis?.signals ?? []).map((signal, i) => (
          <div key={i} className="p-4 border border-blue-500/30 rounded-lg bg-slate-800/40 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{signal.name}</h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  signal.strength === 'Strong' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  signal.strength === 'Emerging' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-slate-700/50 text-blue-300 border border-blue-500/30'
                }`}>
                  {signal.strength}
                </span>
                <span className="text-xs text-blue-300">{signal.timeframe}</span>
              </div>
            </div>
            <p className="text-sm text-blue-200 mb-2">{signal.description}</p>
            <p className="text-sm text-blue-100 italic">{signal.implications}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
        <h4 className="font-semibold text-red-400 mb-2">Disruptive Potential</h4>
        <p className="text-2xl font-bold text-red-300">{data.analysis?.signalAnalysis?.disruptivePotential ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default SignalsTab;