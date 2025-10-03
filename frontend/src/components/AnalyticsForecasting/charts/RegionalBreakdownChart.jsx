import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionalBreakdownChart = ({ data }) => {
  if (!data?.marketAnalysis?.regionalBreakdown) return null;
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.marketAnalysis.regionalBreakdown}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="share" name="Market Share (%)" fill="#3b82f6" />
        <Bar dataKey="growth" name="Growth Rate (%)" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionalBreakdownChart;