import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const SCurveChart = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const gridColor = isLight ? "#E5E7EB" : "#374151";
  const axisColor = isLight ? "#6B7280" : "#9CA3AF";
  const tooltipBg = isLight ? "bg-white" : "bg-slate-800";
  const tooltipBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const tooltipText = isLight ? "text-slate-800" : "text-white";

  if (!data?.sCurveData?.dataPoints || data.sCurveData.dataPoints.length === 0) {
    return (
      <div className={`flex items-center justify-center h-[300px] ${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder}`}>
        <p className={textSecondary}>Insufficient data for S-Curve analysis</p>
      </div>
    );
  }

  const { dataPoints, phase, adoptionRate } = data.sCurveData;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className={`text-sm font-medium ${textSecondary}`}>Phase: </span>
          <span className={`text-sm font-bold ${textAccent}`}>{phase}</span>
        </div>
        <div>
          <span className={`text-sm font-medium ${textSecondary}`}>Adoption Rate: </span>
          <span className={`text-sm font-bold ${isLight ? 'text-green-600' : 'text-green-400'}`}>{adoptionRate}%</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: axisColor }}
            angle={-45}
            textAnchor="end"
            height={80}
            stroke={axisColor}
          />
          <YAxis 
            yAxisId="cumulative"
            label={{ value: 'Cumulative Activity', angle: -90, position: 'insideLeft', fill: axisColor }}
            stroke={axisColor}
            tick={{ fill: axisColor }}
          />
          <YAxis 
            yAxisId="monthly"
            orientation="right"
            label={{ value: 'Monthly Activity', angle: 90, position: 'insideRight', fill: axisColor }}
            stroke={axisColor}
            tick={{ fill: axisColor }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className={`${tooltipBg} border ${tooltipBorder} p-3 rounded shadow-lg backdrop-blur-sm`}>
                    <p className={`font-semibold ${tooltipText}`}>{data.date}</p>
                    <p className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>Cumulative: {data.cumulative}</p>
                    <p className={`text-sm ${isLight ? 'text-green-600' : 'text-green-400'}`}>Monthly: {data.monthly}</p>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-blue-300'} mt-1`}>
                      News: {data.news} | Patents: {data.patents}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: isLight ? '#374151' : '#E5E7EB' }} />
          <Area 
            yAxisId="cumulative"
            type="monotone" 
            dataKey="cumulative" 
            stroke={isLight ? "#2563EB" : "#3b82f6"} 
            fill={isLight ? "#2563EB" : "#3b82f6"} 
            fillOpacity={0.3}
            name="Cumulative Activity" 
          />
          <Line
            yAxisId="monthly"
            type="monotone"
            dataKey="monthly"
            stroke={isLight ? "#059669" : "#10b981"}
            strokeWidth={2}
            dot={{ r: 3, fill: isLight ? "#059669" : "#10b981" }}
            name="Monthly Activity"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className={`text-xs ${textSecondary} ${cardBg} p-3 rounded border ${cardBorder} backdrop-blur-sm`}>
        <p><strong className={textAccent}>Analysis:</strong> {data.sCurveData.analysis}</p>
        <p className="mt-1"><strong className={textAccent}>Data Points:</strong> {dataPoints.length} months of activity tracked</p>
      </div>
    </div>
  );
};

export default SCurveChart;