import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SignalStrengthRadar = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const gridColor = isLight ? "#E5E7EB" : "#374151";
  const axisColor = isLight ? "#6B7280" : "#9CA3AF";
  const tooltipBg = isLight ? "#FFFFFF" : "#1E293B";
  const tooltipBorder = isLight ? "#D1D5DB" : "#3B82F6";
  const tooltipText = isLight ? "#374151" : "#E5E7EB";

  if (!data?.signalAnalysis?.signals) return null;
  
  const radarData = data.signalAnalysis.signals.slice(0, 6).map(signal => ({
    signal: signal.name.substring(0, 20),
    momentum: signal.momentum
  }));
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="signal" stroke={axisColor} />
        <PolarRadiusAxis domain={[0, 100]} stroke={axisColor} />
        <Radar name="Signal Momentum" dataKey="momentum" stroke={isLight ? "#7C3AED" : "#8B5CF6"} fill={isLight ? "#7C3AED" : "#8B5CF6"} fillOpacity={0.6} />
        <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SignalStrengthRadar;