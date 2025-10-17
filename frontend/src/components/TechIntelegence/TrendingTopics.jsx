import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingTopics = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const progressBg = isLight ? "bg-slate-300" : "bg-slate-600";
  const borderColor = isLight ? "border-slate-200" : "border-slate-700";

  return (
    <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${textAccent}`}>
        <TrendingUp className="w-5 h-5" />
        Trending Topics
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {data?.trendingTopics?.map((topic, idx) => (
          <div key={idx} className={`space-y-2 pb-3 border-b ${borderColor} last:border-0`}>
            <div className="flex items-center justify-between text-sm">
              <span className={`font-medium ${textPrimary}`}>{topic.name}</span>
              <span className={`${textAccent} font-bold`}>{topic.momentum}</span>
            </div>
            <div className={`${progressBg} rounded-full h-2`}>
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                style={{ width: `${topic.momentum}%` }}
              ></div>
            </div>
            <p className={`text-xs ${textSecondary}`}>{topic.description}</p>
            
            {topic.geographySpread && (
              <div className="mt-2 space-y-1">
                {topic.geographySpread.primary && topic.geographySpread.primary.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className={`text-xs ${isLight ? 'text-green-600' : 'text-green-400'} font-medium min-w-[60px]`}>Leading:</span>
                    <span className={`text-xs ${textSecondary}`}>{topic.geographySpread.primary.join(', ')}</span>
                  </div>
                )}
                {topic.geographySpread.secondary && topic.geographySpread.secondary.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className={`text-xs ${isLight ? 'text-blue-600' : 'text-blue-400'} font-medium min-w-[60px]`}>Active:</span>
                    <span className={`text-xs ${textSecondary}`}>{topic.geographySpread.secondary.join(', ')}</span>
                  </div>
                )}
                {topic.geographySpread.emerging && topic.geographySpread.emerging.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className={`text-xs ${isLight ? 'text-yellow-600' : 'text-yellow-400'} font-medium min-w-[60px]`}>Emerging:</span>
                    <span className={`text-xs ${textSecondary}`}>{topic.geographySpread.emerging.join(', ')}</span>
                  </div>
                )}
              </div>
            )}
            
            {topic.regionalActivity && topic.regionalActivity.length > 0 && (
              <div className="mt-2 space-y-1">
                {topic.regionalActivity.map((region, ridx) => (
                  <div key={ridx} className="flex items-start gap-2 text-xs">
                    <span className={`font-medium min-w-[100px] ${
                      region.intensity === 'High' ? (isLight ? 'text-red-600' : 'text-red-400') :
                      region.intensity === 'Medium' ? (isLight ? 'text-orange-600' : 'text-orange-400') :
                      (isLight ? 'text-yellow-600' : 'text-yellow-400')
                    }`}>
                      {region.region}:
                    </span>
                    <span className={textSecondary}>{region.focus}</span>
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