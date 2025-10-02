import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingTopics = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        Trending Topics
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {data?.trendingTopics?.map((topic, idx) => (
          <div key={idx} className="space-y-2 pb-3 border-b border-slate-700 last:border-0">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{topic.name}</span>
              <span className="text-blue-400 font-bold">{topic.momentum}</span>
            </div>
            <div className="bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                style={{ width: `${topic.momentum}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400">{topic.description}</p>
            
            {topic.geographySpread && (
              <div className="mt-2 space-y-1">
                {topic.geographySpread.primary && topic.geographySpread.primary.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-green-400 font-medium min-w-[60px]">Leading:</span>
                    <span className="text-xs text-slate-300">{topic.geographySpread.primary.join(', ')}</span>
                  </div>
                )}
                {topic.geographySpread.secondary && topic.geographySpread.secondary.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-blue-400 font-medium min-w-[60px]">Active:</span>
                    <span className="text-xs text-slate-300">{topic.geographySpread.secondary.join(', ')}</span>
                  </div>
                )}
                {topic.geographySpread.emerging && topic.geographySpread.emerging.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-yellow-400 font-medium min-w-[60px]">Emerging:</span>
                    <span className="text-xs text-slate-300">{topic.geographySpread.emerging.join(', ')}</span>
                  </div>
                )}
              </div>
            )}
            
            {topic.regionalActivity && topic.regionalActivity.length > 0 && (
              <div className="mt-2 space-y-1">
                {topic.regionalActivity.map((region, ridx) => (
                  <div key={ridx} className="flex items-start gap-2 text-xs">
                    <span className={`font-medium min-w-[100px] ${
                      region.intensity === 'High' ? 'text-red-400' :
                      region.intensity === 'Medium' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`}>
                      {region.region}:
                    </span>
                    <span className="text-slate-300">{region.focus}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;