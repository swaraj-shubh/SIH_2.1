import React from 'react';

const KeywordsSection = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight ? "bg-white" : "bg-slate-800/40";
  const border = isLight ? "border-slate-200" : "border-blue-500/30";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const keywordBg = isLight 
    ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-300 text-blue-700" 
    : "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30 text-blue-300";

  return (
    <div className={`${background} backdrop-blur-sm rounded-lg border ${border} p-6 mb-6`}>
      <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Generated Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {(data?.keywords ?? []).map((keyword, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 ${keywordBg} border rounded-full text-sm font-medium`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsSection;