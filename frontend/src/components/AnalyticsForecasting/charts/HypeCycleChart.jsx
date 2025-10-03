import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HypeCycleChart = ({ data }) => {
  if (!data?.hypeCycle) return null;

  const phases = [
    { name: 'Innovation\nTrigger', x: 10, y: 20 },
    { name: 'Peak of\nExpectations', x: 30, y: 90 },
    { name: 'Trough of\nDisillusionment', x: 50, y: 30 },
    { name: 'Slope of\nEnlightenment', x: 70, y: 60 },
    { name: 'Plateau of\nProductivity', x: 90, y: 80 }
  ];

  const currentPhaseMap = {
    'Innovation Trigger': 0,
    'Peak of Inflated Expectations': 1,
    'Trough of Disillusionment': 2,
    'Slope of Enlightenment': 3,
    'Plateau of Productivity': 4
  };

  const currentIndex = currentPhaseMap[data.hypeCycle.currentPhase] ?? 0;
  const currentPosition = phases[currentIndex] ?? phases[0];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
        <YAxis type="number" dataKey="y" domain={[0, 100]} label={{ value: 'Visibility', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={({ active, payload }) => {
          if (active && payload?.[0]) {
            return (
              <div className="bg-white p-2 border rounded shadow">
                <p className="text-xs font-semibold">{payload[0].payload.name.replace('\n', ' ')}</p>
              </div>
            );
          }
          return null;
        }} />
        <Scatter data={phases} fill="#cbd5e1" shape="circle" />
        <Scatter data={[{ ...currentPosition, name: 'Current Position' }]} fill="#ef4444" shape="circle" r={8} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default HypeCycleChart;