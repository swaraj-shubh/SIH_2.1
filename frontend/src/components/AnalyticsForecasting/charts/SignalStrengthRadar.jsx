import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SignalStrengthRadar = ({ data }) => {
  if (!data?.signalAnalysis?.signals) return null;
  
  const radarData = data.signalAnalysis.signals.slice(0, 6).map(signal => ({
    signal: signal.name.substring(0, 20),
    momentum: signal.momentum
  }));
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="signal" stroke="#9CA3AF" />
        <PolarRadiusAxis domain={[0, 100]} stroke="#9CA3AF" />
        <Radar name="Signal Momentum" dataKey="momentum" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #3B82F6', borderRadius: '8px', color: '#E5E7EB' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SignalStrengthRadar;