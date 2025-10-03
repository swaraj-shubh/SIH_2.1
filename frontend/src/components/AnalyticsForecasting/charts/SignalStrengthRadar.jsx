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
        <PolarGrid />
        <PolarAngleAxis dataKey="signal" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar name="Signal Momentum" dataKey="momentum" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SignalStrengthRadar;