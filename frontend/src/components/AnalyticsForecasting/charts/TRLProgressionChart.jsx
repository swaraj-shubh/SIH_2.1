import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TRLProgressionChart = ({ data }) => {
  if (!data?.trlProgression?.timeline || data.trlProgression.timeline.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-slate-800/40 backdrop-blur-sm rounded-lg border border-blue-500/30">
        <p className="text-blue-300">Insufficient data for TRL analysis</p>
      </div>
    );
  }

  const { currentLevel, levelDescription, evidence, timeline } = data.trlProgression;

  // TRL level descriptions for reference
  const trlDescriptions = {
    1: "Basic principles observed",
    2: "Technology concept formulated",
    3: "Experimental proof of concept",
    4: "Component validation in laboratory",
    5: "Component validation in relevant environment",
    6: "System/subsystem model demonstration",
    7: "System prototype demonstration",
    8: "System complete and qualified",
    9: "Actual system proven in operational environment"
  };

  return (
    <div className="space-y-4">
      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <p className="text-xs text-blue-300 uppercase tracking-wide">Current TRL</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">Level {currentLevel}</p>
          <p className="text-sm text-blue-200 mt-2">{levelDescription}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <p className="text-xs text-green-300 uppercase tracking-wide">Evidence Points</p>
          <ul className="mt-2 space-y-1">
            {evidence.slice(0, 3).map((ev, idx) => (
              <li key={idx} className="text-xs text-green-200 flex items-start">
                <span className="text-green-400 mr-1">✓</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={timeline}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
            stroke="#9CA3AF"
          />
          <YAxis 
            domain={[0, 9]} 
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            label={{ value: 'TRL Level', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            stroke="#9CA3AF"
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                return (
                  <div className="bg-slate-800 border-2 border-blue-500/30 p-4 rounded-lg shadow-xl max-w-xs backdrop-blur-sm">
                    <p className="font-bold text-white text-lg">{point.year}</p>
                    <p className="text-sm text-blue-400 font-semibold mt-1">
                      TRL Level: {point.level}
                    </p>
                    <p className="text-xs text-blue-300 mt-1">
                      {trlDescriptions[point.level]}
                    </p>
                    <p className="text-xs text-blue-200 mt-2 font-medium">
                      {point.milestone}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          
          {/* Reference lines for TRL milestones */}
          <ReferenceLine 
            y={4} 
            stroke="#fbbf24" 
            strokeDasharray="3 3" 
            label={{ value: 'Lab Validation', position: 'right', fontSize: 10, fill: '#fbbf24' }}
          />
          <ReferenceLine 
            y={6} 
            stroke="#f59e0b" 
            strokeDasharray="3 3" 
            label={{ value: 'Prototype Demo', position: 'right', fontSize: 10, fill: '#f59e0b' }}
          />
          <ReferenceLine 
            y={8} 
            stroke="#10b981" 
            strokeDasharray="3 3" 
            label={{ value: 'System Qualified', position: 'right', fontSize: 10, fill: '#10b981' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="level" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            name="TRL Level" 
            dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#1E293B' }}
            activeDot={{ r: 8, fill: '#3b82f6', stroke: '#1E293B', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* TRL Scale Reference */}
      <div className="bg-slate-800/40 p-4 rounded-lg border border-blue-500/30 backdrop-blur-sm">
        <p className="text-xs font-semibold text-blue-400 mb-2">TRL Scale Reference:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="text-xs">
            <span className="font-medium text-blue-400">TRL 1-3:</span>
            <span className="text-blue-300"> Research & Concept</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-orange-400">TRL 4-6:</span>
            <span className="text-blue-300"> Development & Testing</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-green-400">TRL 7-9:</span>
            <span className="text-blue-300"> Deployment & Operations</span>
          </div>
        </div>
      </div>

      {/* Evidence Details */}
      {evidence.length > 0 && (
        <div className="text-xs text-blue-300 bg-slate-800/40 p-3 rounded border border-blue-500/30 backdrop-blur-sm">
          <p className="font-semibold text-blue-400 mb-2">Evidence from Analysis:</p>
          <ul className="space-y-1">
            {evidence.map((ev, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TRLProgressionChart;