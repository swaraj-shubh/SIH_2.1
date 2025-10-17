import React from 'react';
import { Eye } from 'lucide-react';

const KeyPlayers = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const tableHeaderBg = isLight ? "bg-slate-100" : "bg-slate-800";
  const tableBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const tableRowHover = isLight ? "hover:bg-slate-100" : "hover:bg-slate-700/30";

  const getImpactBadgeStyle = (impact) => {
    if (isLight) {
      return impact === 'Critical' 
        ? 'bg-red-100 text-red-700 border-red-300' 
        : 'bg-orange-100 text-orange-700 border-orange-300';
    } else {
      return impact === 'Critical' 
        ? 'bg-red-500/20 text-red-300' 
        : 'bg-orange-500/20 text-orange-300';
    }
  };

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
        <Eye className="w-5 h-5" />
        Key Players to Watch
      </h3>
      <div className="overflow-x-auto max-h-96 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className={`sticky top-0 ${tableHeaderBg}`}>
            <tr className={`border-b ${tableBorder}`}>
              <th className="pb-2 text-left text-blue-400">Organization</th>
              <th className="pb-2 text-left text-blue-400">Region</th>
              <th className="pb-2 text-left text-blue-400">Investment</th>
              <th className="pb-2 text-left text-blue-400">Impact</th>
            </tr>
          </thead>
          <tbody>
            {data?.keyPlayers?.map((player, idx) => (
              <tr key={idx} className={`border-b ${isLight ? 'border-slate-200' : 'border-slate-700'} ${tableRowHover}`}>
                <td className={`py-2 font-medium ${textPrimary}`}>{player.name}</td>
                <td className={`py-2 ${textSecondary}`}>{player.region}</td>
                <td className={`py-2 ${isLight ? 'text-green-600' : 'text-green-400'}`}>${(player.investmentAmount/1000).toFixed(1)}B</td>
                <td className="py-2">
                  <span className={`text-xs px-2 py-1 rounded ${getImpactBadgeStyle(player.impactLevel)}`}>
                    {player.impactLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeyPlayers;