import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionalBreakdownChart = ({ data }) => {
  if (!data?.marketAnalysis?.regionalBreakdown) return null;
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.marketAnalysis.regionalBreakdown}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="region" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #3B82F6', borderRadius: '8px', color: '#E5E7EB' }} />
        <Legend wrapperStyle={{ color: '#E5E7EB' }} />
        <Bar dataKey="share" name="Market Share (%)" fill="#3B82F6" />
        <Bar dataKey="growth" name="Growth Rate (%)" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionalBreakdownChart;