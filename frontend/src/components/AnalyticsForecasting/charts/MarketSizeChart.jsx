import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketSizeChart = ({ data }) => {
  if (!data?.marketAnalysis) return null;

  const marketData = [
    { year: '2024', value: data.marketAnalysis.currentSize, label: 'Current' },
    { year: '2030', value: data.marketAnalysis.projectedSize2030, label: 'Projected' }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={marketData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Market Size ($B)" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketSizeChart;