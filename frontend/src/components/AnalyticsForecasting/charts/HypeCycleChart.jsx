import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';

const HypeCycleChart = ({ data }) => {
  if (!data?.hypeCycle) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">Insufficient data for Hype Cycle analysis</p>
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
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-xs text-gray-600">Current Phase</p>
          <p className="text-sm font-bold text-blue-700">{data.hypeCycle.currentPhase}</p>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-xs text-gray-600">Time to Mainstream</p>
          <p className="text-sm font-bold text-green-700">{data.hypeCycle.timeToMainstream}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <p className="text-xs text-gray-600">Visibility Score</p>
          <p className="text-sm font-bold text-purple-700">{data.hypeCycle.visibility}%</p>
        </div>
        <div className="bg-orange-50 p-3 rounded">
          <p className="text-xs text-gray-600">Maturity Score</p>
          <p className="text-sm font-bold text-orange-700">{data.hypeCycle.maturity}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            domain={[0, 100]} 
            label={{ value: 'Time / Maturity →', position: 'bottom', offset: 0 }}
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            domain={[0, 100]} 
            label={{ value: 'Visibility / Expectations →', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 11 }}
          />
          <ZAxis range={[100, 400]} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const point = payload[0].payload;
                // Fixed: Add safety check for point.name
                const displayName = point.name ? point.name.replace('\n', ' ') : 'Location';
                return (
                  <div className="bg-white p-3 border rounded shadow-lg max-w-xs">
                    <p className="font-semibold text-gray-800">{displayName}</p>
                    {point.visibility !== undefined && (
                      <>
                        <p className="text-xs text-blue-600 mt-1">Visibility: {point.visibility}%</p>
                        <p className="text-xs text-orange-600">Maturity: {point.maturity}%</p>
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
            line={{ stroke: '#cbd5e1', strokeWidth: 2 }}
            shape={() => null}
            isAnimationActive={false}
          />
          
          {/* Phase markers */}
          <Scatter data={phases} fill="#94a3b8" shape="circle">
            {phases.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#94a3b8" />
            ))}
          </Scatter>
          
          {/* Current position - larger and colored */}
          <Scatter 
            data={[currentPosition]} 
            fill="#ef4444" 
            shape="circle"
          >
            <Cell fill="#ef4444" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
        <p><strong>Analysis:</strong> {data.hypeCycle.analysis}</p>
        <p className="mt-1"><strong>Methodology:</strong> Position calculated from news volume trends (visibility) and patent/commercial activity (maturity)</p>
      </div>
    </div>
  );
};

export default HypeCycleChart;