import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketSizeChart = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const gridColor = isLight ? "#E5E7EB" : "#374151";
  const axisColor = isLight ? "#6B7280" : "#9CA3AF";
  const tooltipBg = isLight ? "#FFFFFF" : "#1E293B";
  const tooltipBorder = isLight ? "#D1D5DB" : "#3B82F6";
  const tooltipText = isLight ? "#374151" : "#E5E7EB";
  const legendColor = isLight ? "#374151" : "#E5E7EB";

  if (!data?.marketAnalysis) return null;

  const marketData = [
    { year: '2024', value: data.marketAnalysis.currentSize, label: 'Current' },
    { year: '2030', value: data.marketAnalysis.projectedSize2030, label: 'Projected' }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={marketData}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="year" stroke={axisColor} />
        <YAxis stroke={axisColor} label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft', fill: axisColor }} />
        <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText }} />
        <Legend wrapperStyle={{ color: legendColor }} />
        <Bar dataKey="value" name="Market Size ($B)" fill={isLight ? "#7C3AED" : "#8B5CF6"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketSizeChart;