import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Globe } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const FundingCharts = ({ data }) => {
  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-400" />
          Funding by Sector
        </h3>
        {data?.fundingInvestment?.topSectors && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.fundingInvestment.topSectors}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="sector" stroke="#94a3b8" style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          R&D Investment by Country
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data?.rdInvestmentByCountry?.slice(0, 8)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="country" type="category" stroke="#94a3b8" width={70} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
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