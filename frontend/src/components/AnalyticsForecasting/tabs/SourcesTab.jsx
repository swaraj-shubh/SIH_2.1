import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const SourcesTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent News Articles ({data.newsArticles?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {(data.newsArticles ?? []).map((article, i) => (
            <div key={i} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{article.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
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
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Related Patents ({data.patents?.length ?? 0})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {(data.patents ?? []).map((patent, i) => (
            <div key={i} className="p-4 border rounded-lg hover:bg-gray-50">
              <h4 className="font-semibold text-sm mb-2">{patent.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{patent.abstract}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
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