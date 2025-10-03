import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TRLProgressionChart = ({ data }) => {
  if (!data?.trlProgression?.timeline) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data.trlProgression.timeline}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={[0, 9]} ticks={[1,2,3,4,5,6,7,8,9]} />
        <Tooltip content={({ active, payload }) => {
          if (active && payload?.[0]) {
            return (
              <div className="bg-white p-3 border rounded shadow-lg">
                <p className="font-semibold">{payload[0].payload.year}</p>
                <p className="text-sm text-blue-600">TRL: {payload[0].value}</p>
                <p className="text-xs text-gray-600 mt-1">{payload[0].payload.milestone}</p>
              </div>
            );
          }
          return null;
        }} />
        <Legend />
        <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={3} name="TRL Level" dot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TRLProgressionChart;