import React from 'react';
import { Newspaper, TrendingUp, DollarSign, Building2, Filter, Clock, ExternalLink } from 'lucide-react';

const NewsSection = ({ 
  newsArticles, 
  classifiedNews, 
  activeNewsTab, 
  setActiveNewsTab, 
  selectedTopicFilter, 
  setSelectedTopicFilter,
  formatDate,
  theme = 'dark'
}) => {
  // Theme-specific styles
  const isLight = theme === 'light';
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const buttonBg = isLight ? "bg-slate-200" : "bg-slate-700/50";
  const buttonActive = isLight ? "bg-blue-600 text-white" : "bg-blue-600 text-white";
  const buttonInactive = isLight ? "text-slate-600 hover:text-slate-800" : "text-slate-300 hover:text-white";
  const articleCardBg = isLight ? "bg-gradient-to-br from-slate-100 to-slate-50" : "bg-gradient-to-br from-slate-700/70 to-slate-700/30";
  const articleBorder = isLight ? "border-slate-300" : "border-slate-600";
  const articleHover = isLight ? "hover:border-blue-400" : "hover:border-blue-500";
  const selectBg = isLight ? "bg-white border-slate-300" : "bg-slate-700 border-slate-600";

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

  const getBadgeStyle = (type) => {
    if (isLight) {
      return type === 'news' 
        ? 'bg-blue-100 text-blue-700' 
        : 'bg-purple-100 text-purple-700';
    } else {
      return type === 'news' 
        ? 'bg-blue-500/20 text-blue-300' 
        : 'bg-purple-500/20 text-purple-300';
    }
  };

  const getCategoryBadgeStyle = () => {
    return isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-600 text-slate-300';
  };

  return (
    <div className="mb-6">
      <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-2xl font-bold flex items-center gap-2 ${textPrimary}`}>
            <Newspaper className={`w-6 h-6 ${textAccent}`} />
            Latest Technology News & Research
            <span className={`text-sm font-normal ${textSecondary} ml-2`}>
              ({newsArticles.length} articles)
            </span>
          </h3>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${buttonBg} rounded-lg p-1`}>
              <button
                onClick={() => setActiveNewsTab('all')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  activeNewsTab === 'all' ? buttonActive : buttonInactive
                }`}
              >
                All News
              </button>
              <button
                onClick={() => setActiveNewsTab('trending')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'trending' ? buttonActive : buttonInactive
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending ({classifiedNews?.trendingTopics?.length || 0})
              </button>
              <button
                onClick={() => setActiveNewsTab('funding')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'funding' ? buttonActive : buttonInactive
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Funding ({classifiedNews?.fundingAlerts?.length || 0})
              </button>
              <button
                onClick={() => setActiveNewsTab('players')}
                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
                  activeNewsTab === 'players' ? buttonActive : buttonInactive
                }`}
              >
                <Building2 className="w-4 h-4" />
                Key Players ({classifiedNews?.keyPlayers?.length || 0})
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Filter className={`w-4 h-4 ${textSecondary}`} />
              <select
                value={selectedTopicFilter}
                onChange={(e) => setSelectedTopicFilter(e.target.value)}
                className={`${selectBg} rounded px-3 py-1.5 text-sm ${textPrimary}`}
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
              className={`${articleCardBg} rounded-lg p-4 border ${articleBorder} ${articleHover} transition-all group h-fit`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${getBadgeStyle(article.source_type)}`}>
                  {article.source_type === 'news' ? 'News' : 'Research'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${getCategoryBadgeStyle()}`}>
                  {article.category}
                </span>
              </div>
              
              <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${textPrimary}`}>
                {article.title}
              </h4>
              
              <details className="group/details">
                <summary className={`cursor-pointer text-xs ${textAccent} hover:${isLight ? 'text-blue-500' : 'text-blue-300'} font-medium mb-2 list-none`}>
                  View Details ›
                </summary>
                <div className="mt-2 space-y-2">
                  <p className={`text-xs ${textSecondary}`}>
                    {article.summary}
                  </p>
                  
                  {article.query && (
                    <div className="text-xs">
                      <span className={textSecondary}>Topic: </span>
                      <span className={isLight ? 'text-cyan-600' : 'text-cyan-400'}>{article.query}</span>
                    </div>
                  )}
                </div>
              </details>
              
              <div className={`flex items-center justify-between text-xs ${textSecondary} mt-3`}>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(article.publish_date)}</span>
                </div>
                <button 
                  onClick={() => openArticle(article.url)}
                  className={`flex items-center gap-1 ${textAccent} hover:${isLight ? 'text-blue-500' : 'text-blue-300'} transition-colors`}
                >
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              
              {article.author && article.author !== 'Unknown' && (
                <div className={`mt-2 text-xs ${textSecondary} truncate`}>
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