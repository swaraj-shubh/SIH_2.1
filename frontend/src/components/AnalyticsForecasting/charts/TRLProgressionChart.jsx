import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TRLProgressionChart = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const gridColor = isLight ? "#E5E7EB" : "#374151";
  const axisColor = isLight ? "#6B7280" : "#9CA3AF";
  const tooltipBg = isLight ? "bg-white" : "bg-slate-800";
  const tooltipBorder = isLight ? "border-slate-400" : "border-blue-500/30";
  const tooltipText = isLight ? "text-slate-800" : "text-white";

  if (!data?.trlProgression?.timeline || data.trlProgression.timeline.length === 0) {
    return (
      <div className={`flex items-center justify-center h-[300px] ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
        <p className={textSecondary}>Insufficient data for TRL analysis</p>
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
        <div className={`${isLight ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300' : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30'} p-4 rounded-lg border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-blue-700' : 'text-blue-300'} uppercase tracking-wide`}>Current TRL</p>
          <p className={`text-3xl font-bold ${isLight ? 'text-blue-800' : 'text-blue-400'} mt-1`}>Level {currentLevel}</p>
          <p className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-200'} mt-2`}>{levelDescription}</p>
        </div>
        
        <div className={`${isLight ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-300' : 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/30'} p-4 rounded-lg border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-green-700' : 'text-green-300'} uppercase tracking-wide`}>Evidence Points</p>
          <ul className="mt-2 space-y-1">
            {evidence.slice(0, 3).map((ev, idx) => (
              <li key={idx} className={`text-xs ${isLight ? 'text-green-600' : 'text-green-200'} flex items-start`}>
                <span className={`${isLight ? 'text-green-700' : 'text-green-400'} mr-1`}>✓</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={timeline}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12, fill: axisColor }}
            label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: axisColor }}
            stroke={axisColor}
          />
          <YAxis 
            domain={[0, 9]} 
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            tick={{ fontSize: 12, fill: axisColor }}
            label={{ value: 'TRL Level', angle: -90, position: 'insideLeft', fill: axisColor }}
            stroke={axisColor}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                return (
                  <div className={`${tooltipBg} border-2 ${tooltipBorder} p-4 rounded-lg shadow-xl max-w-xs backdrop-blur-sm`}>
                    <p className={`font-bold ${tooltipText} text-lg`}>{point.year}</p>
                    <p className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-400'} font-semibold mt-1`}>
                      TRL Level: {point.level}
                    </p>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-blue-300'} mt-1`}>
                      {trlDescriptions[point.level]}
                    </p>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-blue-200'} mt-2 font-medium`}>
                      {point.milestone}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: isLight ? '#374151' : '#E5E7EB' }} />
          
          {/* Reference lines for TRL milestones */}
          <ReferenceLine 
            y={4} 
            stroke={isLight ? "#D97706" : "#fbbf24"} 
            strokeDasharray="3 3" 
            label={{ value: 'Lab Validation', position: 'right', fontSize: 10, fill: isLight ? "#D97706" : "#fbbf24" }}
          />
          <ReferenceLine 
            y={6} 
            stroke={isLight ? "#B45309" : "#f59e0b"} 
            strokeDasharray="3 3" 
            label={{ value: 'Prototype Demo', position: 'right', fontSize: 10, fill: isLight ? "#B45309" : "#f59e0b" }}
          />
          <ReferenceLine 
            y={8} 
            stroke={isLight ? "#047857" : "#10b981"} 
            strokeDasharray="3 3" 
            label={{ value: 'System Qualified', position: 'right', fontSize: 10, fill: isLight ? "#047857" : "#10b981" }}
          />
          
          <Line 
            type="monotone" 
            dataKey="level" 
            stroke={isLight ? "#2563EB" : "#3b82f6"} 
            strokeWidth={3} 
            name="TRL Level" 
            dot={{ r: 6, fill: isLight ? "#2563EB" : "#3b82f6", strokeWidth: 2, stroke: isLight ? "#FFFFFF" : "#1E293B" }}
            activeDot={{ r: 8, fill: isLight ? "#2563EB" : "#3b82f6", stroke: isLight ? "#FFFFFF" : "#1E293B", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* TRL Scale Reference */}
      <div className={`${cardBg} p-4 rounded-lg border ${cardBorder} backdrop-blur-sm`}>
        <p className={`text-xs font-semibold ${textAccent} mb-2`}>TRL Scale Reference:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="text-xs">
            <span className={`font-medium ${textAccent}`}>TRL 1-3:</span>
            <span className={textSecondary}> Research & Concept</span>
          </div>
          <div className="text-xs">
            <span className={`font-medium ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>TRL 4-6:</span>
            <span className={textSecondary}> Development & Testing</span>
          </div>
          <div className="text-xs">
            <span className={`font-medium ${isLight ? 'text-green-600' : 'text-green-400'}`}>TRL 7-9:</span>
            <span className={textSecondary}> Deployment & Operations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRLProgressionChart;