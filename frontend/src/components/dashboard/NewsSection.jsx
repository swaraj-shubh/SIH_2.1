import React from 'react';
import { Newspaper, TrendingUp, DollarSign, Building2, Filter, Clock, ExternalLink } from 'lucide-react';

const NewsSection = ({ 
  newsArticles, 
  classifiedNews, 
  activeNewsTab, 
  setActiveNewsTab, 
  selectedTopicFilter, 
  setSelectedTopicFilter,
  formatDate 
}) => {
  const topicCategories = [
    { value: 'all', label: 'All Topics' },
    { value: 'semiconductor', label: 'Semiconductor Manufacturing' },
    { value: 'quantum', label: 'Quantum Computing' },
    { value: 'artificial intelligence', label: 'AI Defense' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'autonomous', label: 'Autonomous Systems' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'hypersonic', label: 'Hypersonic Technology' },
    { value: 'investment', label: 'Tech Investment' },
    { value: 'partnership', label: 'Partnerships' }
  ];

  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mb-6">
      <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-400" />
            Latest Technology News & Research
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({newsArticles.length} articles)
            </span>
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={() => setActiveNewsTab('all')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  activeNewsTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                All News
              </button>
              <button
                onClick={() => setActiveNewsTab('trending')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'trending' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending ({classifiedNews?.trendingTopics?.length || 0})
              </button>
              <button
                onClick={() => setActiveNewsTab('funding')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'funding' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Funding ({classifiedNews?.fundingAlerts?.length || 0})
              </button>
              <button
                onClick={() => setActiveNewsTab('players')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'players' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Key Players ({classifiedNews?.keyPlayers?.length || 0})
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedTopicFilter}
                onChange={(e) => setSelectedTopicFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm"
              >
                {topicCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {newsArticles.map((article, idx) => (
            <div
              key={article.id || idx}
              onClick={() => openArticle(article.url)}
              className="bg-gradient-to-br from-slate-700/70 to-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500 transition-all cursor-pointer group h-fit"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  article.source_type === 'news' 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {article.source_type === 'news' ? 'News' : 'Research'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-600 text-slate-300">
                  {article.category}
                </span>
              </div>
              
              <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {article.title}
              </h4>
              
              <p className="text-xs text-slate-400 mb-3 line-clamp-4">
                {article.summary}
              </p>
              
              {article.query && (
                <div className="mb-3 text-xs">
                  <span className="text-slate-500">Topic: </span>
                  <span className="text-cyan-400">{article.query}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(article.publish_date)}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
              
              {article.author && article.author !== 'Unknown' && (
                <div className="mt-2 text-xs text-slate-500 truncate">
                  By {article.author}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;