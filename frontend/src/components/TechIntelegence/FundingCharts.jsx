import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Globe } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const FundingCharts = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const gridColor = isLight ? "#E5E7EB" : "#334155";
  const axisColor = isLight ? "#6B7280" : "#94a3b8";
  const tooltipBg = isLight ? "#FFFFFF" : "#1e293b";
  const tooltipBorder = isLight ? "#D1D5DB" : "#3b82f6";

  return (
    <>
      <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
          <DollarSign className="w-5 h-5" />
          Funding by Sector
        </h3>
        {data?.fundingInvestment?.topSectors && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.fundingInvestment.topSectors}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="sector" stroke={axisColor} style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
          <Globe className="w-5 h-5" />
          R&D Investment by Country
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data?.rdInvestmentByCountry?.slice(0, 8)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis type="number" stroke={axisColor} />
            <YAxis dataKey="country" type="category" stroke={axisColor} width={70} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}` }} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {data?.rdInvestmentByCountry?.slice(0, 8).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FundingCharts;