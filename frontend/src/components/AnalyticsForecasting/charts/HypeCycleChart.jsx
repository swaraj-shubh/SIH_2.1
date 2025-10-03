import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';

const HypeCycleChart = ({ data }) => {
  if (!data?.hypeCycle) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-slate-800/40 backdrop-blur-sm rounded-lg border border-blue-500/30">
        <p className="text-blue-300">Insufficient data for Hype Cycle analysis</p>
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
        <div className="bg-blue-500/20 p-3 rounded border border-blue-500/30 backdrop-blur-sm">
          <p className="text-xs text-blue-300">Current Phase</p>
          <p className="text-sm font-bold text-blue-400">{data.hypeCycle.currentPhase}</p>
        </div>
        <div className="bg-green-500/20 p-3 rounded border border-green-500/30 backdrop-blur-sm">
          <p className="text-xs text-green-300">Time to Mainstream</p>
          <p className="text-sm font-bold text-green-400">{data.hypeCycle.timeToMainstream}</p>
        </div>
        <div className="bg-purple-500/20 p-3 rounded border border-purple-500/30 backdrop-blur-sm">
          <p className="text-xs text-purple-300">Visibility Score</p>
          <p className="text-sm font-bold text-purple-400">{data.hypeCycle.visibility}%</p>
        </div>
        <div className="bg-orange-500/20 p-3 rounded border border-orange-500/30 backdrop-blur-sm">
          <p className="text-xs text-orange-300">Maturity Score</p>
          <p className="text-sm font-bold text-orange-400">{data.hypeCycle.maturity}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, 100]} 
            label={{ value: 'Time / Maturity →', position: 'bottom', offset: 0, fill: '#9CA3AF' }}
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            stroke="#9CA3AF"
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            domain={[0, 100]} 
            label={{ value: 'Visibility / Expectations →', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            stroke="#9CA3AF"
          />
          <ZAxis range={[100, 400]} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                // Fixed: Add safety check for point.name
                const displayName = point.name ? point.name.replace('\n', ' ') : 'Location';
                return (
                  <div className="bg-slate-800 border border-blue-500/30 p-3 rounded shadow-lg max-w-xs backdrop-blur-sm">
                    <p className="font-semibold text-white">{displayName}</p>
                    {point.visibility !== undefined && (
                      <>
                        <p className="text-xs text-blue-400 mt-1">Visibility: {point.visibility}%</p>
                        <p className="text-xs text-orange-400">Maturity: {point.maturity}%</p>
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
            line={{ stroke: '#4B5563', strokeWidth: 2 }}
            shape={() => null}
            isAnimationActive={false}
          />
          
          {/* Phase markers */}
          <Scatter data={phases} fill="#6B7280" shape="circle">
            {phases.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#6B7280" />
            ))}
          </Scatter>
          
          {/* Current position - larger and colored */}
          <Scatter 
            data={[currentPosition]} 
            fill="#EF4444" 
            shape="circle"
          >
            <Cell fill="#EF4444" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      <div className="text-xs text-blue-300 bg-slate-800/40 p-3 rounded border border-blue-500/30 backdrop-blur-sm">
        <p><strong className="text-blue-400">Analysis:</strong> {data.hypeCycle.analysis}</p>
        <p className="mt-1"><strong className="text-blue-400">Methodology:</strong> Position calculated from news volume trends (visibility) and patent/commercial activity (maturity)</p>
      </div>
    </div>
  );
};

export default HypeCycleChart;