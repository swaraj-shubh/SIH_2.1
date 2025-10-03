import React from 'react';
import { Activity, TrendingUp, Target, FileText } from 'lucide-react';

const OverviewCards = ({ data, topic }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">Current TRL</span>
        </div>
        <p className="text-2xl font-bold">{data.analysis?.trlProgression?.currentLevel ?? 'N/A'}</p>
        <p className="text-xs text-gray-500 mt-1">{data.analysis?.trlProgression?.levelDescription?.substring(0, 50)}</p>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">Adoption Phase</span>
        </div>
        <p className="text-2xl font-bold">{data.analysis?.sCurveData?.phase ?? 'N/A'}</p>
        <p className="text-xs text-gray-500 mt-1">{data.analysis?.sCurveData?.adoptionRate ?? 0}% Adoption Rate</p>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-purple-600" />
          <span className="text-sm text-gray-600">Market Size</span>
        </div>
        <p className="text-2xl font-bold">${data.analysis?.marketAnalysis?.currentSize ?? 'N/A'}B</p>
        <p className="text-xs text-gray-500 mt-1">{data.analysis?.marketAnalysis?.cagr ?? 'N/A'}% CAGR</p>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-orange-600" />
          <span className="text-sm text-gray-600">Data Sources</span>
        </div>
        <p className="text-2xl font-bold">
          {((data.metadata?.newsCount ?? 0) + (data.metadata?.patentCount ?? 0))}
        </p>
        <p className="text-xs text-gray-500 mt-1">{data.metadata?.newsCount ?? 0} News, {data.metadata?.patentCount ?? 0} Patents</p>
      </div>
    </div>
  );
};

export default OverviewCards;