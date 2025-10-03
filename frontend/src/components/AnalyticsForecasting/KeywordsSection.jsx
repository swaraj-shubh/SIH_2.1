import React from 'react';

const KeywordsSection = ({ data }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg border border-blue-500/30 p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">Generated Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {(data?.keywords ?? []).map((keyword, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-full text-sm font-medium text-blue-300"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsSection;