import React from 'react';
import { Eye } from 'lucide-react';

const KeyPlayers = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-400" />
        Key Players to Watch
      </h3>
      <div className="overflow-x-auto max-h-96 overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-800">
            <tr className="border-b border-blue-500/30">
              <th className="pb-2 text-left text-blue-400">Organization</th>
              <th className="pb-2 text-left text-blue-400">Region</th>
              <th className="pb-2 text-left text-blue-400">Investment</th>
              <th className="pb-2 text-left text-blue-400">Impact</th>
            </tr>
          </thead>
          <tbody>
            {data?.keyPlayers?.map((player, idx) => (
              <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30">
                <td className="py-2 font-medium">{player.name}</td>
                <td className="py-2">{player.region}</td>
                <td className="py-2 text-green-400">${(player.investmentAmount/1000).toFixed(1)}B</td>
                <td className="py-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    player.impactLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
                    'bg-orange-500/20 text-orange-300'
                  }`}>
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