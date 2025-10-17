import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionalBreakdownChart = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const gridColor = isLight ? "#E5E7EB" : "#374151";
  const axisColor = isLight ? "#6B7280" : "#9CA3AF";
  const tooltipBg = isLight ? "#FFFFFF" : "#1E293B";
  const tooltipBorder = isLight ? "#D1D5DB" : "#3B82F6";
  const tooltipText = isLight ? "#374151" : "#E5E7EB";
  const legendColor = isLight ? "#374151" : "#E5E7EB";

  if (!data?.marketAnalysis?.regionalBreakdown) return null;
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.marketAnalysis.regionalBreakdown}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="region" stroke={axisColor} />
        <YAxis stroke={axisColor} />
        <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText }} />
        <Legend wrapperStyle={{ color: legendColor }} />
        <Bar dataKey="share" name="Market Share (%)" fill={isLight ? "#2563EB" : "#3B82F6"} />
        <Bar dataKey="growth" name="Growth Rate (%)" fill={isLight ? "#059669" : "#10B981"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionalBreakdownChart;