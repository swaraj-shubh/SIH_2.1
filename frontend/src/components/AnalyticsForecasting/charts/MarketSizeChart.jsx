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
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #3B82F6', borderRadius: '8px', color: '#E5E7EB' }} />
        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
        <Bar dataKey="value" name="Market Size ($B)" fill="#8B5CF6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketSizeChart;