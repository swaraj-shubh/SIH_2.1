import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const SourcesTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Recent News Articles ({data.newsArticles?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {(data.newsArticles ?? []).map((article, i) => (
            <div key={i} className="p-4 border border-blue-500/30 rounded-lg bg-slate-800/40 backdrop-blur-sm hover:bg-slate-700/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 text-white">{article.title}</h4>
                  <p className="text-xs text-blue-200 mb-2">{article.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-blue-300">
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
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-400">Related Patents ({data.patents?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {(data.patents ?? []).map((patent, i) => (
            <div key={i} className="p-4 border border-blue-500/30 rounded-lg bg-slate-800/40 backdrop-blur-sm hover:bg-slate-700/40 transition-colors">
              <h4 className="font-semibold text-sm mb-2 text-white">{patent.title}</h4>
              <p className="text-xs text-blue-200 mb-2">{patent.abstract}</p>
              <div className="flex flex-wrap gap-3 text-xs text-blue-300">
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