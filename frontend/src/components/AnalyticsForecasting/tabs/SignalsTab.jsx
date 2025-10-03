import React from 'react';
import { AlertCircle } from 'lucide-react';
import SignalStrengthRadar from '../charts/SignalStrengthRadar';

const SignalsTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Signal Momentum</h3>
        <SignalStrengthRadar data={data.analysis} />
      </div>

      <div className="space-y-4">
        {(data.analysis?.signalAnalysis?.signals ?? []).map((signal, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{signal.name}</h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  signal.strength === 'Strong' ? 'bg-green-100 text-green-700' :
                  signal.strength === 'Emerging' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {signal.strength}
                </span>
                <span className="text-xs text-gray-500">{signal.timeframe}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
            <p className="text-sm text-gray-700 italic">{signal.implications}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h4 className="font-semibold text-red-900 mb-2">Disruptive Potential</h4>
        <p className="text-2xl font-bold text-red-700">{data.analysis?.signalAnalysis?.disruptivePotential ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default SignalsTab;