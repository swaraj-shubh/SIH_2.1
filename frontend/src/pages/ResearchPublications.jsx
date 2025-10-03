import React, { useState } from 'react';
import { FileText, Users, Calendar, ExternalLink, Download, Search, Filter, BookOpen } from 'lucide-react';
import { ieeeData } from '../mockData/ieee';

const ResearchPublications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

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

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Journals': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Magazines': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Conferences': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              IEEE Research Publications
            </h1>
          </div>
          <p className="text-blue-300">Latest research papers and academic publications from IEEE</p>
        </div>

        {/* Stats and Filters */}
        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{filteredArticles.length} of {ieeeData.total_records} publications</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span>Latest: {Math.max(...ieeeData.articles.map(a => a.publication_year))}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64"
                />
              </div>

              {/* Content Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
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
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
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
              className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(article.content_type)}`}>
                      {article.content_type}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                      {article.publication_year}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Users className="w-4 h-4" />
                    <span className="line-clamp-1">{article.authors}</span>
                  </div>

                  <p className="text-sm text-slate-300 mb-2">
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
                      className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                  {article.keywords[0]?.kwd.length > 4 && (
                    <span className="text-xs text-slate-500">
                      +{article.keywords[0].kwd.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Dropdown for Details */}
              <details className="group/details">
                <summary className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 font-medium mb-3 list-none flex items-center gap-1">
                  View Abstract & Details ›
                </summary>
                
                <div className="mt-4 space-y-4 border-t border-slate-700 pt-4">
                  {/* Abstract */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">Abstract</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {article.abstract}
                    </p>
                  </div>

                  {/* All Keywords */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.keywords.map((kwGroup, gIdx) => (
                      <div key={gIdx}>
                        <h5 className="text-xs font-semibold text-slate-400 mb-2">{kwGroup.type}</h5>
                        <div className="flex flex-wrap gap-1">
                          {kwGroup.kwd.map((keyword, kIdx) => (
                            <span
                              key={kIdx}
                              className="text-xs bg-slate-700/70 text-slate-300 px-2 py-1 rounded"
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
                    <span className="text-slate-400">DOI: </span>
                    <span className="text-cyan-400 font-mono">{article.doi}</span>
                  </div>
                </div>
              </details>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <button
                  onClick={() => openInNewTab(article.html_url)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on IEEE
                </button>
                
                <button
                  onClick={() => openInNewTab(article.pdf_url)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
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
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No publications found matching your criteria</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPublications;