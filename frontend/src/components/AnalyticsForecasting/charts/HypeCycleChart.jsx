import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';

const HypeCycleChart = ({ data, theme = 'dark' }) => {
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
  const tooltipBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const tooltipText = isLight ? "text-slate-800" : "text-white";

  if (!data?.hypeCycle) {
    return (
      <div className={`flex items-center justify-center h-[300px] ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
        <p className={textSecondary}>Insufficient data for Hype Cycle analysis</p>
      </div>
    );
  }

  // Define the 5 phases with their typical positions
  const phases = [
    { name: 'Innovation\nTrigger', x: 10, y: 20, phase: 'Innovation Trigger' },
    { name: 'Peak of\nExpectations', x: 30, y: 90, phase: 'Peak of Inflated Expectations' },
    { name: 'Trough of\nDisillusionment', x: 50, y: 30, phase: 'Trough of Disillusionment' },
    { name: 'Slope of\nEnlightenment', x: 70, y: 60, phase: 'Slope of Enlightenment' },
    { name: 'Plateau of\nProductivity', x: 90, y: 80, phase: 'Plateau of Productivity' }
  ];

  const currentPhaseMap = {
    'Innovation Trigger': 0,
    'Peak of Inflated Expectations': 1,
    'Trough of Disillusionment': 2,
    'Slope of Enlightenment': 3,
    'Plateau of Productivity': 4
  };

  const currentIndex = currentPhaseMap[data.hypeCycle.currentPhase] ?? 0;
  
  // Calculate position based on actual visibility and maturity scores
  const calculatePosition = (phase, visibility, maturity) => {
    const basePosition = phases[phase];
    
    // Adjust position based on actual metrics
    // Visibility affects Y-axis, maturity affects X-axis progression
    const adjustedY = Math.min(100, Math.max(10, visibility));
    const adjustedX = basePosition.x + (maturity / 100) * 10;
    
    return { x: adjustedX, y: adjustedY };
  };

  const currentPosition = {
    ...calculatePosition(currentIndex, data.hypeCycle.visibility, data.hypeCycle.maturity),
    name: 'Current Position',
    visibility: data.hypeCycle.visibility,
    maturity: data.hypeCycle.maturity
  };

  // Draw the hype cycle curve - points don't need names
  const curvePoints = [
    { x: 5, y: 15 },
    { x: 15, y: 35 },
    { x: 25, y: 75 },
    { x: 30, y: 90 },
    { x: 35, y: 85 },
    { x: 45, y: 50 },
    { x: 50, y: 30 },
    { x: 55, y: 28 },
    { x: 65, y: 45 },
    { x: 75, y: 65 },
    { x: 85, y: 78 },
    { x: 95, y: 82 }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className={`${isLight ? 'bg-blue-100 border-blue-300' : 'bg-blue-500/20 border-blue-500/30'} p-3 rounded border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-blue-700' : 'text-blue-300'}`}>Current Phase</p>
          <p className={`text-sm font-bold ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>{data.hypeCycle.currentPhase}</p>
        </div>
        <div className={`${isLight ? 'bg-green-100 border-green-300' : 'bg-green-500/20 border-green-500/30'} p-3 rounded border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-green-700' : 'text-green-300'}`}>Time to Mainstream</p>
          <p className={`text-sm font-bold ${isLight ? 'text-green-800' : 'text-green-400'}`}>{data.hypeCycle.timeToMainstream}</p>
        </div>
        <div className={`${isLight ? 'bg-purple-100 border-purple-300' : 'bg-purple-500/20 border-purple-500/30'} p-3 rounded border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-purple-700' : 'text-purple-300'}`}>Visibility Score</p>
          <p className={`text-sm font-bold ${isLight ? 'text-purple-800' : 'text-purple-400'}`}>{data.hypeCycle.visibility}%</p>
        </div>
        <div className={`${isLight ? 'bg-orange-100 border-orange-300' : 'bg-orange-500/20 border-orange-500/30'} p-3 rounded border backdrop-blur-sm`}>
          <p className={`text-xs ${isLight ? 'text-orange-700' : 'text-orange-300'}`}>Maturity Score</p>
          <p className={`text-sm font-bold ${isLight ? 'text-orange-800' : 'text-orange-400'}`}>{data.hypeCycle.maturity}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, 100]} 
            label={{ value: 'Time / Maturity →', position: 'bottom', offset: 0, fill: axisColor }}
            tick={{ fontSize: 11, fill: axisColor }}
            stroke={axisColor}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            domain={[0, 100]} 
            label={{ value: 'Visibility / Expectations →', angle: -90, position: 'insideLeft', fill: axisColor }}
            tick={{ fontSize: 11, fill: axisColor }}
            stroke={axisColor}
          />
          <ZAxis range={[100, 400]} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                // Fixed: Add safety check for point.name
                const displayName = point.name ? point.name.replace('\n', ' ') : 'Location';
                return (
                  <div className={`${tooltipBg} border ${tooltipBorder} p-3 rounded shadow-lg max-w-xs backdrop-blur-sm`}>
                    <p className={`font-semibold ${tooltipText}`}>{displayName}</p>
                    {point.visibility !== undefined && (
                      <>
                        <p className={`text-xs ${isLight ? 'text-blue-600' : 'text-blue-400'} mt-1`}>Visibility: {point.visibility}%</p>
                        <p className={`text-xs ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>Maturity: {point.maturity}%</p>
                      </>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          
          {/* Hype Cycle Curve - these points don't have names */}
          <Scatter 
            data={curvePoints} 
            fill="none" 
            line={{ stroke: isLight ? '#9CA3AF' : '#4B5563', strokeWidth: 2 }}
            shape={() => null}
            isAnimationActive={false}
          />
          
          {/* Phase markers */}
          <Scatter data={phases} fill={isLight ? '#6B7280' : '#6B7280'} shape="circle">
            {phases.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={isLight ? '#6B7280' : '#6B7280'} />
            ))}
          </Scatter>
          
          {/* Current position - larger and colored */}
          <Scatter 
            data={[currentPosition]} 
            fill={isLight ? '#DC2626' : '#EF4444'} 
            shape="circle"
          >
            <Cell fill={isLight ? '#DC2626' : '#EF4444'} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      <div className={`text-xs ${textSecondary} ${cardBg} p-3 rounded border ${cardBorder} backdrop-blur-sm`}>
        <p><strong className={textAccent}>Analysis:</strong> {data.hypeCycle.analysis}</p>
        <p className="mt-1"><strong className={textAccent}>Methodology:</strong> Position calculated from news volume trends (visibility) and patent/commercial activity (maturity)</p>
      </div>
    </div>
  );
};

export default HypeCycleChart;