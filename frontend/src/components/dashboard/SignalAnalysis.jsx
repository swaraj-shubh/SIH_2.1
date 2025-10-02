import React from 'react';
import { Activity, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const SignalAnalysis = ({ data }) => {
  // Get signals by category for the summary cards
  const getSignalsByCategory = () => {
    if (!data?.signalAnalysis) return {};
    
    return data.signalAnalysis.reduce((acc, signal) => {
      const category = signal.category.toLowerCase();
      if (!acc[category]) acc[category] = [];
      acc[category].push(signal);
      return acc;
    }, {});
  };

  const signalsByCategory = getSignalsByCategory();

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'mainstream':
        return { bg: 'from-green-500/10 to-green-500/5', border: 'border-green-500/30', text: 'text-green-400' };
      case 'growing':
        return { bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/30', text: 'text-blue-400' };
      case 'emerging':
        return { bg: 'from-yellow-500/10 to-yellow-500/5', border: 'border-yellow-500/30', text: 'text-yellow-400' };
      case 'weak':
        return { bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400' };
      default:
        return { bg: 'from-gray-500/10 to-gray-500/5', border: 'border-gray-500/30', text: 'text-gray-400' };
    }
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-400" />
        Signal Analysis
      </h3>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {Object.entries(signalsByCategory).map(([category, signals]) => {
          const color = getCategoryColor(category);
          return (
            <div key={category} className={`bg-gradient-to-r ${color.bg} ${color.border} p-3 rounded-lg`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium capitalize">{category}</span>
                <span className={`font-bold ${color.text}`}>{signals.length}</span>
              </div>
              <div className="text-xs text-slate-400">
                {signals.slice(0, 2).map((signal, idx) => (
                  <div key={idx} className="truncate">• {signal.signal}</div>
                ))}
                {signals.length > 2 && (
                  <div className="text-slate-500">+{signals.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Signals List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {data?.signalAnalysis?.map((signal, idx) => {
          const categoryColor = getCategoryColor(signal.category);
          const impactColor = getImpactColor(signal.potentialImpact);
          
          return (
            <div 
              key={idx} 
              className={`bg-gradient-to-br from-slate-700/70 to-slate-700/30 p-4 rounded-lg border-l-4 ${categoryColor.border.replace('border-', 'border-l-')}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-white">{signal.signal}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded border ${impactColor}`}>
                      {signal.potentialImpact}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className={`capitalize ${categoryColor.text}`}>{signal.category}</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Momentum: {signal.momentumScore}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {signal.timeToMainstreamEstimate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {signal.description}
              </p>

              {/* Key Indicators */}
              {signal.keyIndicators && signal.keyIndicators.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2 text-xs font-medium text-slate-400">
                    <AlertCircle className="w-3 h-3" />
                    Key Indicators:
                  </div>
                  <div className="space-y-1">
                    {signal.keyIndicators.map((indicator, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strategic Implication */}
              <div className="bg-slate-600/30 rounded p-3 border border-slate-500/30">
                <div className="text-xs font-medium text-cyan-400 mb-1">
                  Strategic Implication:
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {signal.strategicImplication}
                </p>
              </div>

              {/* Momentum Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Signal Strength</span>
                  <span>{signal.momentumScore}%</span>
                </div>
                <div className="bg-slate-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${categoryColor.bg.replace('/10', '/60').replace('/5', '/40')} transition-all`}
                    style={{ width: `${signal.momentumScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {(!data?.signalAnalysis || data.signalAnalysis.length === 0) && (
        <div className="text-center py-8 text-slate-400">
          <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No signal analysis data available</p>
        </div>
      )}
    </div>
  );
};

export default SignalAnalysis;