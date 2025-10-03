import React from 'react';

const ExportActions = ({ data, topic }) => {
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(topic || 'analysis').replace(/\s+/g, '_')}_analysis.json`;
    a.click();
  };

  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={handleExportJSON}
        className="px-4 py-2 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors backdrop-blur-sm"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export JSON
      </button>

      <button
        onClick={() => window.print()}
        className="px-4 py-2 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors backdrop-blur-sm"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print Report
      </button>
    </div>
  );
};

export default ExportActions;