import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const SCurveChart = ({ data }) => {
  if (!data?.sCurveData?.dataPoints || data.sCurveData.dataPoints.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-slate-800/40 backdrop-blur-sm rounded-lg border border-blue-500/30">
        <p className="text-blue-300">Insufficient data for S-Curve analysis</p>
      </div>
    );
  }

  const { dataPoints, phase, adoptionRate } = data.sCurveData;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium text-blue-300">Phase: </span>
          <span className="text-sm font-bold text-blue-400">{phase}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-blue-300">Adoption Rate: </span>
          <span className="text-sm font-bold text-green-400">{adoptionRate}%</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            angle={-45}
            textAnchor="end"
            height={80}
            stroke="#9CA3AF"
          />
          <YAxis 
            yAxisId="cumulative"
            label={{ value: 'Cumulative Activity', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            yAxisId="monthly"
            orientation="right"
            label={{ value: 'Monthly Activity', angle: 90, position: 'insideRight', fill: '#9CA3AF' }}
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-800 border border-blue-500/30 p-3 rounded shadow-lg backdrop-blur-sm">
                    <p className="font-semibold text-white">{data.date}</p>
                    <p className="text-sm text-blue-400">Cumulative: {data.cumulative}</p>
                    <p className="text-sm text-green-400">Monthly: {data.monthly}</p>
                    <p className="text-xs text-blue-300 mt-1">
                      News: {data.news} | Patents: {data.patents}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          <Area 
            yAxisId="cumulative"
            type="monotone" 
            dataKey="cumulative" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.3}
            name="Cumulative Activity" 
          />
          <Line
            yAxisId="monthly"
            type="monotone"
            dataKey="monthly"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3, fill: '#10b981' }}
            name="Monthly Activity"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="text-xs text-blue-300 bg-slate-800/40 p-3 rounded border border-blue-500/30 backdrop-blur-sm">
        <p><strong className="text-blue-400">Analysis:</strong> {data.sCurveData.analysis}</p>
        <p className="mt-1"><strong className="text-blue-400">Data Points:</strong> {dataPoints.length} months of activity tracked</p>
      </div>
    </div>
  );
};

export default SCurveChart;