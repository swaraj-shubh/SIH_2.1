import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TRLProgressionChart = ({ data }) => {
  if (!data?.trlProgression?.timeline || data.trlProgression.timeline.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">Insufficient data for TRL analysis</p>
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
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Current TRL</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">Level {currentLevel}</p>
          <p className="text-sm text-gray-700 mt-2">{levelDescription}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 uppercase tracking-wide">Evidence Points</p>
          <ul className="mt-2 space-y-1">
            {evidence.slice(0, 3).map((ev, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start">
                <span className="text-green-600 mr-1">✓</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={timeline}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            domain={[0, 9]} 
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            tick={{ fontSize: 12 }}
            label={{ value: 'TRL Level', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                return (
                  <div className="bg-white p-4 border-2 border-blue-300 rounded-lg shadow-xl max-w-xs">
                    <p className="font-bold text-gray-800 text-lg">{point.year}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                      TRL Level: {point.level}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {trlDescriptions[point.level]}
                    </p>
                    <p className="text-xs text-gray-700 mt-2 font-medium">
                      {point.milestone}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          
          {/* Reference lines for TRL milestones */}
          <ReferenceLine 
            y={4} 
            stroke="#fbbf24" 
            strokeDasharray="3 3" 
            label={{ value: 'Lab Validation', position: 'right', fontSize: 10, fill: '#92400e' }}
          />
          <ReferenceLine 
            y={6} 
            stroke="#f59e0b" 
            strokeDasharray="3 3" 
            label={{ value: 'Prototype Demo', position: 'right', fontSize: 10, fill: '#92400e' }}
          />
          <ReferenceLine 
            y={8} 
            stroke="#10b981" 
            strokeDasharray="3 3" 
            label={{ value: 'System Qualified', position: 'right', fontSize: 10, fill: '#065f46' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="level" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            name="TRL Level" 
            dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* TRL Scale Reference */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-700 mb-2">TRL Scale Reference:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="text-xs">
            <span className="font-medium text-blue-600">TRL 1-3:</span>
            <span className="text-gray-600"> Research & Concept</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-orange-600">TRL 4-6:</span>
            <span className="text-gray-600"> Development & Testing</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-green-600">TRL 7-9:</span>
            <span className="text-gray-600"> Deployment & Operations</span>
          </div>
        </div>
      </div>

      {/* Evidence Details */}
      {evidence.length > 0 && (
        <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded border border-blue-100">
          <p className="font-semibold text-gray-700 mb-2">Evidence from Analysis:</p>
          <ul className="space-y-1">
            {evidence.map((ev, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
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