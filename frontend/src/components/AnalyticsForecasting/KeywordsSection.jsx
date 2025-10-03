import React from 'react';

const KeywordsSection = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Generated Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {(data?.keywords ?? []).map((keyword, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsSection;