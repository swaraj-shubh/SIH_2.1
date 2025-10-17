import React from 'react';
import { AlertCircle } from 'lucide-react';
import SignalStrengthRadar from '../charts/SignalStrengthRadar';

const SignalsTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-200";
  const textTertiary = isLight ? "text-slate-500" : "text-blue-100";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const alertBg = isLight ? "bg-red-100 border-red-300" : "bg-red-500/20 border-red-500/30";
  const alertText = isLight ? "text-red-600" : "text-red-300";
  const alertTitle = isLight ? "text-red-700" : "text-red-400";

  const getStrengthBadgeStyle = (strength) => {
    if (isLight) {
      return strength === 'Strong' 
        ? 'bg-green-100 text-green-700 border-green-300'
        : strength === 'Emerging' 
        ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
        : 'bg-slate-200 text-slate-700 border-slate-400';
    } else {
      return strength === 'Strong' 
        ? 'bg-green-500/20 text-green-400 border-green-500/30'
        : strength === 'Emerging' 
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        : 'bg-slate-700/50 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Signal Momentum</h3>
        <SignalStrengthRadar data={data.analysis} theme={theme} />
      </div>

      <div className="space-y-4">
        {(data.analysis?.signalAnalysis?.signals ?? []).map((signal, i) => (
          <div key={i} className={`p-4 border ${cardBorder} rounded-lg ${cardBg} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${textPrimary}`}>{signal.name}</h4>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStrengthBadgeStyle(signal.strength)}`}>
                  {signal.strength}
                </span>
                <span className={`text-xs ${textSecondary}`}>{signal.timeframe}</span>
              </div>
            </div>
            <p className={`text-sm ${textSecondary} mb-2`}>{signal.description}</p>
            <p className={`text-sm ${textTertiary} italic`}>{signal.implications}</p>
          </div>
        ))}
      </div>

      <div className={`p-4 ${alertBg} border rounded-lg backdrop-blur-sm`}>
        <h4 className={`font-semibold ${alertTitle} mb-2`}>Disruptive Potential</h4>
        <p className={`text-2xl font-bold ${alertText}`}>{data.analysis?.signalAnalysis?.disruptivePotential ?? 'N/A'}</p>
      </div>
    </div>
  );
};

export default SignalsTab;