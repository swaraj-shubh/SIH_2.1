import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const SourcesTab = ({ data, theme = 'dark' }) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-200";
  const textTertiary = isLight ? "text-slate-500" : "text-blue-300";
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const hoverBg = isLight ? "hover:bg-slate-100" : "hover:bg-slate-700/40";
  const linkColor = isLight ? "text-blue-600 hover:text-blue-500" : "text-blue-400 hover:text-blue-300";

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Recent News Articles ({data.newsArticles?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {(data.newsArticles ?? []).map((article, i) => (
            <div key={i} className={`p-4 border ${cardBorder} rounded-lg ${cardBg} backdrop-blur-sm ${hoverBg} transition-colors`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className={`font-semibold text-sm mb-1 ${textPrimary}`}>{article.title}</h4>
                  <p className={`text-xs ${textSecondary} mb-2`}>{article.summary}</p>
                  <div className={`flex items-center gap-3 text-xs ${textTertiary}`}>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publish_date).toLocaleDateString()}
                    </span>
                    <span>{article.author}</span>
                  </div>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkColor} transition-colors`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-semibold mb-4 ${textAccent}`}>Related Patents ({data.patents?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {(data.patents ?? []).map((patent, i) => (
            <div key={i} className={`p-4 border ${cardBorder} rounded-lg ${cardBg} backdrop-blur-sm ${hoverBg} transition-colors`}>
              <h4 className={`font-semibold text-sm mb-2 ${textPrimary}`}>{patent.title}</h4>
              <p className={`text-xs ${textSecondary} mb-2`}>{patent.abstract}</p>
              <div className="flex flex-wrap gap-3 text-xs ${textTertiary}">
                <span>Date: {new Date(patent.publishDate).toLocaleDateString()}</span>
                <span>Applicant: {patent.applicants}</span>
                <span>Jurisdiction: {patent.jurisdiction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesTab;