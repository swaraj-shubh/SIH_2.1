import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SCurveChart = ({ data }) => {
  if (!data?.sCurveData?.dataPoints) return null;
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data.sCurveData.dataPoints}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="cumulative" stroke="#10b981" fill="#10b98130" name="Cumulative Adoption" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SCurveChart;