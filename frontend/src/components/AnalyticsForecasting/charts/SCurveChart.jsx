import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const SCurveChart = ({ data }) => {
  if (!data?.sCurveData?.dataPoints || data.sCurveData.dataPoints.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">Insufficient data for S-Curve analysis</p>
      </div>
    );
  }

  const { dataPoints, phase, adoptionRate } = data.sCurveData;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium text-gray-600">Phase: </span>
          <span className="text-sm font-bold text-blue-600">{phase}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-600">Adoption Rate: </span>
          <span className="text-sm font-bold text-green-600">{adoptionRate}%</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            yAxisId="cumulative"
            label={{ value: 'Cumulative Activity', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="monthly"
            orientation="right"
            label={{ value: 'Monthly Activity', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-semibold text-gray-800">{data.date}</p>
                    <p className="text-sm text-blue-600">Cumulative: {data.cumulative}</p>
                    <p className="text-sm text-green-600">Monthly: {data.monthly}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      News: {data.news} | Patents: {data.patents}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Area 
            yAxisId="cumulative"
            type="monotone" 
            dataKey="cumulative" 
            stroke="#3b82f6" 
            fill="#3b82f630" 
            name="Cumulative Activity" 
          />
          <Line
            yAxisId="monthly"
            type="monotone"
            dataKey="monthly"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Monthly Activity"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
        <p><strong>Analysis:</strong> {data.sCurveData.analysis}</p>
        <p className="mt-1"><strong>Data Points:</strong> {dataPoints.length} months of activity tracked</p>
      </div>
    </div>
  );
};

export default SCurveChart;