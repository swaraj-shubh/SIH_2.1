import React, { useMemo, useState, useEffect } from 'react';
import { FileText, Users, Calendar, ExternalLink, Download, Search, Filter, Shield, BookOpen } from 'lucide-react';
import { ieeeData } from '../mockData/ieee';

const ResearchPublications = ({ theme = 'dark' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [openItem, setOpenItem] = React.useState(ieeeData.articles[0].doi);

  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight 
    ? "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" 
    : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textTertiary = isLight ? "text-slate-500" : "text-slate-400";
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const cardHover = isLight ? "hover:border-blue-400" : "hover:border-blue-400";
  
  const inputBg = isLight ? "bg-white" : "bg-slate-700";
  const inputBorder = isLight ? "border-slate-300" : "border-slate-600";
  const inputFocus = isLight ? "focus:border-blue-500" : "focus:border-blue-500";
  
  const statsBg = isLight ? "bg-slate-100" : "bg-slate-800/50";
  const statsBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  
  const badgeBg = isLight ? "bg-slate-200" : "bg-slate-700/50";
  const badgeText = isLight ? "text-slate-700" : "text-slate-300";
  
  const buttonPrimary = isLight 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white";
  
  const buttonSecondary = isLight 
    ? "text-blue-600 hover:text-blue-500" 
    : "text-blue-400 hover:text-blue-300";

  // Extract unique years and content types for filters
  const years = ['all', ...new Set(ieeeData.articles.map(article => article.publication_year))].sort((a, b) => b - a);
  const contentTypes = ['all', ...new Set(ieeeData.articles.map(article => article.content_type))];

  // Filter articles based on search and filters
  const filteredArticles = ieeeData.articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keywords.some(kwGroup => 
        kwGroup.kwd.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

    const matchesType = selectedType === 'all' || article.content_type === selectedType;
    const matchesYear = selectedYear === 'all' || article.publication_year === selectedYear;

    return matchesSearch && matchesType && matchesYear;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTypeColor = (type) => {
    if (isLight) {
      switch (type) {
        case 'Journals': return 'bg-blue-100 text-blue-700 border-blue-300';
        case 'Magazines': return 'bg-purple-100 text-purple-700 border-purple-300';
        case 'Conferences': return 'bg-green-100 text-green-700 border-green-300';
        default: return 'bg-slate-100 text-slate-700 border-slate-300';
      }
    } else {
      switch (type) {
        case 'Journals': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        case 'Magazines': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        case 'Conferences': return 'bg-green-500/20 text-green-300 border-green-500/30';
        default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${background} flex items-center justify-center p-6`}>
        <div className="text-center">
          {/* Animated Logo/Icon */}
          <div className="relative mb-8">
            <div className={`w-20 h-20 ${isLight ? 'bg-blue-500' : 'bg-blue-600'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Loading Animation */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${isLight ? 'from-blue-600 to-cyan-500' : 'from-blue-400 to-cyan-300'} bg-clip-text text-transparent mb-4`}>
              Loading IEEE Research Papers
            </h1>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 ${isLight ? 'bg-blue-500' : 'bg-blue-400'} rounded-full animate-bounce`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`w-64 mx-auto ${isLight ? 'bg-slate-200' : 'bg-slate-700'} rounded-full h-2 mb-2`}>
            <div className={`bg-gradient-to-r ${isLight ? 'from-blue-500 to-cyan-400' : 'from-blue-500 to-cyan-400'} h-2 rounded-full animate-pulse`}></div>
          </div>
          
          {/* Subtle Status Message */}
          <p className={`${isLight ? 'text-slate-600' : 'text-slate-500'} text-sm`}>
            have patience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${background} ${textPrimary} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className={`w-8 h-8 ${textAccent}`} />
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${isLight ? 'from-blue-600 to-cyan-500' : 'from-blue-400 to-cyan-300'} bg-clip-text text-transparent`}>
              IEEE Research Publications
            </h1>
          </div>
          <p className={textSecondary}>Latest research papers and academic publications from IEEE</p>
        </div>

        {/* Stats and Filters */}
        <div className={`${statsBg} backdrop-blur border ${statsBorder} rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className={`w-4 h-4 ${textAccent}`} />
                <span>{filteredArticles.length} of {ieeeData.total_records} publications</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${isLight ? 'text-green-600' : 'text-green-400'}`} />
                <span>Latest: {Math.max(...ieeeData.articles.map(a => a.publication_year))}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className={`w-4 h-4 ${textTertiary} absolute left-3 top-1/2 transform -translate-y-1/2`} />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${inputBg} border ${inputBorder} rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none ${inputFocus} w-64 ${textPrimary}`}
                />
              </div>

              {/* Content Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm focus:outline-none ${inputFocus} ${textPrimary}`}
              >
                {contentTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`${inputBg} border ${inputBorder} rounded-lg px-3 py-2 text-sm focus:outline-none ${inputFocus} ${textPrimary}`}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredArticles.map((article, idx) => (
            <div
              key={article.article_number}
              className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-6 ${cardHover} transition-all group`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(article.content_type)}`}>
                      {article.content_type}
                    </span>
                    <span className={`text-xs ${textTertiary} ${badgeBg} px-2 py-1 rounded`}>
                      {article.publication_year}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:${textAccent} transition-colors`}>
                    {article.title}
                  </h3>

                  <div className={`flex items-center gap-2 text-sm ${textTertiary} mb-3`}>
                    <Users className="w-4 h-4" />
                    <span className="line-clamp-1">{article.authors}</span>
                  </div>

                  <p className={`text-sm ${textSecondary} mb-2`}>
                    {article.publication_title}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {article.keywords[0]?.kwd.slice(0, 4).map((keyword, kIdx) => (
                    <span
                      key={kIdx}
                      className={`text-xs ${badgeBg} ${badgeText} px-2 py-1 rounded`}
                    >
                      {keyword}
                    </span>
                  ))}
                  {article.keywords[0]?.kwd.length > 4 && (
                    <span className={`text-xs ${textTertiary}`}>
                      +{article.keywords[0].kwd.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Dropdown for Details */}
              <details className="group/details">
                <summary className={`cursor-pointer text-sm ${buttonSecondary} hover:${buttonSecondary.replace('hover:', '')} font-medium mb-3 list-none flex items-center gap-1`}>
                  View Abstract & Details ›
                </summary>
                
                <div className={`mt-4 space-y-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-700'} pt-4`}>
                  {/* Abstract */}
                  <div>
                    <h4 className={`text-sm font-semibold ${isLight ? 'text-cyan-600' : 'text-cyan-400'} mb-2`}>Abstract</h4>
                    <p className={`text-sm ${textSecondary} leading-relaxed`}>
                      {article.abstract}
                    </p>
                  </div>

                  {/* All Keywords */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.keywords.map((kwGroup, gIdx) => (
                      <div key={gIdx}>
                        <h5 className={`text-xs font-semibold ${textTertiary} mb-2`}>{kwGroup.type}</h5>
                        <div className="flex flex-wrap gap-1">
                          {kwGroup.kwd.map((keyword, kIdx) => (
                            <span
                              key={kIdx}
                              className={`text-xs ${isLight ? 'bg-slate-100' : 'bg-slate-700/70'} ${textSecondary} px-2 py-1 rounded`}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DOI */}
                  <div className="text-sm">
                    <span className={textTertiary}>DOI: </span>
                    <span className={`${isLight ? 'text-cyan-600' : 'text-cyan-400'} font-mono`}>{article.doi}</span>
                  </div>
                </div>
              </details>

              {/* Actions */}
              <div className={`flex items-center justify-between pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-700'}`}>
                <button
                  onClick={() => openInNewTab(article.html_url)}
                  className={`flex items-center gap-2 ${buttonSecondary} transition-colors text-sm`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View on IEEE
                </button>
                
                <button
                  onClick={() => openInNewTab(article.pdf_url)}
                  className={`flex items-center gap-2 ${buttonPrimary} px-4 py-2 rounded-lg transition-colors text-sm`}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <FileText className={`w-16 h-16 ${isLight ? 'text-slate-400' : 'text-slate-600'} mx-auto mb-4`} />
            <p className={`${textTertiary} text-lg`}>No publications found matching your criteria</p>
            <p className={`${textTertiary} text-sm mt-2`}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPublications;