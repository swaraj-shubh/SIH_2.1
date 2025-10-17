import React, { useState, useEffect } from 'react';
import { Loader, Database, RefreshCw } from 'lucide-react';

// Import components
import Header from '@/components/TechIntelegence/Header';
import StatsOverview from '../components/TechIntelegence/StatsOverview';
import NewsSection from '../components/TechIntelegence/NewsSection';
import TrendingTopics from '../components/TechIntelegence/TrendingTopics';
import SignalAnalysis from '../components/TechIntelegence/SignalAnalysis';
import MarketGrowth from '../components/TechIntelegence/MarketGrowth';
import EmergingTechnologies from '../components/TechIntelegence/EmergingTechnologies';
import KeyPlayers from '../components/TechIntelegence/KeyPlayers';
import FundingCharts from '../components/TechIntelegence/FundingCharts';
import ExecutiveSummary from '../components/TechIntelegence/ExecutiveSummary';
import Footer from '../components/TechIntelegence/Footer';

const TechIntelligenceDashboard = ({ theme = 'dark' }) => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
  const [data, setData] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [classifiedNews, setClassifiedNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNewsTab, setActiveNewsTab] = useState('all');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('all');

  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight 
    ? "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" 
    : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/50";
  const cardBorder = isLight ? "border-slate-300" : "border-blue-500/30";
  const buttonPrimary = isLight 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white";
  const buttonDisabled = isLight ? "bg-slate-400" : "bg-slate-600";
  const errorBg = isLight ? "bg-red-100 border-red-300" : "bg-red-500/20 border-red-500/50";
  const errorText = isLight ? "text-red-700" : "text-red-300";

  useEffect(() => {
    fetchAnalysisResults();
    fetchNewsArticles();
    fetchClassifiedNews();
    const interval = setInterval(checkAnalysisStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newsArticles.length > 0) {
      fetchNewsArticles(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchAnalysisResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/analysis-results`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setData(result.data);
        setLastUpdated(result.data.metadata?.lastUpdated);
      }
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Failed to fetch analysis results');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsArticles = async (category = 'all') => {
    try {
      const response = await fetch(`${API_BASE_URL}/news-articles?category=${category}&limit=100`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setNewsArticles(result.data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const fetchClassifiedNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/classified-news`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setClassifiedNews(result.data);
      }
    } catch (err) {
      console.error('Error fetching classified news:', err);
    }
  };

  const checkAnalysisStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis-status`);
      const status = await response.json();
      setAnalyzing(status.isAnalyzing);
      
      if (status.hasCache && !data) {
        fetchAnalysisResults();
      }
      if (status.hasNews && newsArticles.length === 0) {
        fetchNewsArticles();
      }
      if (status.hasClassified && !classifiedNews) {
        fetchClassifiedNews();
      }
    } catch (err) {
      console.error('Error checking status:', err);
    }
  };

  const triggerNewAnalysis = async () => {
    if (analyzing) return;
    
    try {
      setAnalyzing(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/trigger-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.data.metadata?.lastUpdated);
        await fetchNewsArticles();
        await fetchClassifiedNews();
      } else {
        throw new Error(result.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('Error triggering analysis:', err);
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getDisplayArticles = () => {
    if (!classifiedNews) return newsArticles;
    
    let articles = [];
    switch(activeNewsTab) {
      case 'trending':
        articles = classifiedNews.trendingTopics || [];
        break;
      case 'funding':
        articles = classifiedNews.fundingAlerts || [];
        break;
      case 'players':
        articles = classifiedNews.keyPlayers || [];
        break;
      default:
        articles = newsArticles;
    }

    // Apply topic filter
    if (selectedTopicFilter !== 'all') {
      articles = articles.filter(article => {
        const query = article.query?.toLowerCase() || '';
        const title = article.title?.toLowerCase() || '';
        const summary = article.summary?.toLowerCase() || '';
        const combined = query + ' ' + title + ' ' + summary;
        return combined.includes(selectedTopicFilter.toLowerCase());
      });
    }

    return articles;
  };

  if (loading && !data && newsArticles.length === 0) {
    return (
      <div className={`min-h-screen ${background} flex items-center justify-center`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 ${textAccent} animate-spin mx-auto mb-4`} />
          <p className={`${textPrimary} text-xl`}>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data && !loading && newsArticles.length === 0) {
    return (
      <div className={`min-h-screen ${background} flex items-center justify-center p-6`}>
        <div className={`${cardBg} backdrop-blur border ${cardBorder} rounded-lg p-8 max-w-2xl`}>
          <div className="text-center mb-6">
            <Database className={`w-20 h-20 ${textAccent} mx-auto mb-4`} />
            <h2 className={`text-3xl font-bold ${textPrimary} mb-3`}>DRDO Technology Intelligence Platform</h2>
            <p className={`${textSecondary} mb-6`}>Start comprehensive technology intelligence analysis</p>
          </div>
          
          {error && (
            <div className={`mb-6 ${errorBg} rounded-lg p-4`}>
              <p className={`${errorText} text-sm`}>{error}</p>
            </div>
          )}
          
          <button
            onClick={triggerNewAnalysis}
            disabled={analyzing}
            className={`w-full px-6 py-4 ${analyzing ? buttonDisabled : buttonPrimary} text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-3 text-lg`}
          >
            {analyzing ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                Analyzing... (1-2 minutes)
              </>
            ) : (
              <>
                <RefreshCw className="w-6 h-6" />
                Run New Analysis
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  const displayArticles = getDisplayArticles();

  return (
    <div className={`min-h-screen ${background} ${textPrimary} p-6`}>
      <Header 
        lastUpdated={lastUpdated}
        analyzing={analyzing}
        triggerNewAnalysis={triggerNewAnalysis}
        theme={theme}
      />

      {(newsArticles.length > 0 || classifiedNews) && (
        <NewsSection 
          newsArticles={displayArticles}
          classifiedNews={classifiedNews}
          activeNewsTab={activeNewsTab}
          setActiveNewsTab={setActiveNewsTab}
          selectedTopicFilter={selectedTopicFilter}
          setSelectedTopicFilter={setSelectedTopicFilter}
          formatDate={formatDate}
          theme={theme}
        />
      )}

      {data && (
        <>
          {/* <StatsOverview data={data} theme={theme} /> */}
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <TrendingTopics data={data} theme={theme} />
            <SignalAnalysis data={data} theme={theme} />
            <MarketGrowth data={data} theme={theme} />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <EmergingTechnologies data={data} theme={theme} />
            <KeyPlayers data={data} theme={theme} />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <FundingCharts data={data} theme={theme} />
          </div>

          <ExecutiveSummary data={data} theme={theme} />
        </>
      )}

      <Footer data={data} analyzing={analyzing} theme={theme} />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isLight ? '#f1f5f9' : '#1e293b'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isLight ? '#3b82f6' : '#3b82f6'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isLight ? '#2563eb' : '#2563eb'};
        }
      `}</style>
    </div>
  );
};

export default TechIntelligenceDashboard;














































// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { TrendingUp, Globe, DollarSign, Users, Activity, Rocket, Eye, Brain, RefreshCw, Loader, Database, ExternalLink, Newspaper, Clock, Filter, Building2 } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// const TechIntelligenceDashboard = () => {
//   const [data, setData] = useState(null);
//   const [newsArticles, setNewsArticles] = useState([]);
//   const [classifiedNews, setClassifiedNews] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [activeNewsTab, setActiveNewsTab] = useState('all');
//   const [selectedTopicFilter, setSelectedTopicFilter] = useState('all');

//   useEffect(() => {
//     fetchAnalysisResults();
//     fetchNewsArticles();
//     fetchClassifiedNews();
//     const interval = setInterval(checkAnalysisStatus, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (newsArticles.length > 0) {
//       fetchNewsArticles(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const fetchAnalysisResults = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`${API_BASE_URL}/analysis-results`);
//       const result = await response.json();
      
//       if (result.success && result.data) {
//         setData(result.data);
//         setLastUpdated(result.data.metadata?.lastUpdated);
//       }
//     } catch (err) {
//       console.error('Error fetching results:', err);
//       setError('Failed to fetch analysis results');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNewsArticles = async (category = 'all') => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/news-articles?category=${category}&limit=100`);
//       const result = await response.json();
      
//       if (result.success && result.data) {
//         setNewsArticles(result.data);
//       }
//     } catch (err) {
//       console.error('Error fetching news:', err);
//     }
//   };

//   const fetchClassifiedNews = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/classified-news`);
//       const result = await response.json();
      
//       if (result.success && result.data) {
//         setClassifiedNews(result.data);
//       }
//     } catch (err) {
//       console.error('Error fetching classified news:', err);
//     }
//   };

//   const checkAnalysisStatus = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/analysis-status`);
//       const status = await response.json();
//       setAnalyzing(status.isAnalyzing);
      
//       if (status.hasCache && !data) {
//         fetchAnalysisResults();
//       }
//       if (status.hasNews && newsArticles.length === 0) {
//         fetchNewsArticles();
//       }
//       if (status.hasClassified && !classifiedNews) {
//         fetchClassifiedNews();
//       }
//     } catch (err) {
//       console.error('Error checking status:', err);
//     }
//   };

//   const triggerNewAnalysis = async () => {
//     if (analyzing) return;
    
//     try {
//       setAnalyzing(true);
//       setError(null);
//       const response = await fetch(`${API_BASE_URL}/trigger-analysis`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       const result = await response.json();
      
//       if (response.ok) {
//         setData(result.data);
//         setLastUpdated(result.data.metadata?.lastUpdated);
//         await fetchNewsArticles();
//         await fetchClassifiedNews();
//       } else {
//         throw new Error(result.error || 'Analysis failed');
//       }
//     } catch (err) {
//       console.error('Error triggering analysis:', err);
//       setError(err.message);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const openArticle = (url) => {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffHours / 24);
    
//     if (diffHours < 1) return 'Just now';
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString();
//   };

//   const categories = [
//     { value: 'all', label: 'All News' },
//     { value: 'artificial', label: 'AI & ML' },
//     { value: 'quantum', label: 'Quantum' },
//     { value: 'semiconductor', label: 'Semiconductors' },
//     { value: 'biotechnology', label: 'Biotech' },
//     { value: 'Research', label: 'Research' }
//   ];

//   const topicCategories = [
//     { value: 'all', label: 'All Topics' },
//     { value: 'semiconductor', label: 'Semiconductor Manufacturing' },
//     { value: 'quantum', label: 'Quantum Computing' },
//     { value: 'artificial intelligence', label: 'AI Defense' },
//     { value: 'biotechnology', label: 'Biotechnology' },
//     { value: 'autonomous', label: 'Autonomous Systems' },
//     { value: 'cybersecurity', label: 'Cybersecurity' },
//     { value: 'hypersonic', label: 'Hypersonic Technology' },
//     { value: 'investment', label: 'Tech Investment' },
//     { value: 'partnership', label: 'Partnerships' }
//   ];

//   const getDisplayArticles = () => {
//     if (!classifiedNews) return newsArticles;
    
//     let articles = [];
//     switch(activeNewsTab) {
//       case 'trending':
//         articles = classifiedNews.trendingTopics || [];
//         break;
//       case 'funding':
//         articles = classifiedNews.fundingAlerts || [];
//         break;
//       case 'players':
//         articles = classifiedNews.keyPlayers || [];
//         break;
//       default:
//         articles = newsArticles;
//     }

//     // Apply topic filter
//     if (selectedTopicFilter !== 'all') {
//       articles = articles.filter(article => {
//         const query = article.query?.toLowerCase() || '';
//         const title = article.title?.toLowerCase() || '';
//         const summary = article.summary?.toLowerCase() || '';
//         const combined = query + ' ' + title + ' ' + summary;
//         return combined.includes(selectedTopicFilter.toLowerCase());
//       });
//     }

//     return articles;
//   };

//   const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

//   if (loading && !data && newsArticles.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
//           <p className="text-white text-xl">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!data && !loading && newsArticles.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
//         <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-8 max-w-2xl">
//           <div className="text-center mb-6">
//             <Database className="w-20 h-20 text-blue-400 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold text-white mb-3">DRDO Technology Intelligence Platform</h2>
//             <p className="text-slate-300 mb-6">Start comprehensive technology intelligence analysis</p>
//           </div>
          
//           {error && (
//             <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
//               <p className="text-red-300 text-sm">{error}</p>
//             </div>
//           )}
          
//           <button
//             onClick={triggerNewAnalysis}
//             disabled={analyzing}
//             className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-3 text-lg"
//           >
//             {analyzing ? (
//               <>
//                 <Loader className="w-6 h-6 animate-spin" />
//                 Analyzing... (1-2 minutes)
//               </>
//             ) : (
//               <>
//                 <RefreshCw className="w-6 h-6" />
//                 Run New Analysis
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const displayArticles = getDisplayArticles();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//               DRDO Technology Intelligence Platform
//             </h1>
//             <p className="text-blue-300">Real-Time Strategic Technology Analysis & News Monitoring</p>
//           </div>
//           <div className="flex items-center gap-4">
//             {lastUpdated && (
//               <div className="text-sm text-slate-400">
//                 <div className="font-medium">Last Updated</div>
//                 <div>{new Date(lastUpdated).toLocaleString()}</div>
//               </div>
//             )}
//             <button
//               onClick={triggerNewAnalysis}
//               disabled={analyzing}
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-2"
//             >
//               {analyzing ? (
//                 <>
//                   <Loader className="w-5 h-5 animate-spin" />
//                   Analyzing...
//                 </>
//               ) : (
//                 <>
//                   <RefreshCw className="w-5 h-5" />
//                   Refresh Analysis
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {(newsArticles.length > 0 || classifiedNews) && (
//         <div className="mb-6">
//           <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold flex items-center gap-2">
//                 <Newspaper className="w-6 h-6 text-blue-400" />
//                 Latest Technology News & Research
//                 <span className="text-sm font-normal text-slate-400 ml-2">
//                   ({displayArticles.length} articles)
//                 </span>
//               </h3>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-1">
//                   <button
//                     onClick={() => setActiveNewsTab('all')}
//                     className={`px-3 py-1.5 text-sm rounded transition-colors ${
//                       activeNewsTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
//                     }`}
//                   >
//                     All News
//                   </button>
//                   <button
//                     onClick={() => setActiveNewsTab('trending')}
//                     className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
//                       activeNewsTab === 'trending' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
//                     }`}
//                   >
//                     <TrendingUp className="w-4 h-4" />
//                     Trending ({classifiedNews?.trendingTopics?.length || 0})
//                   </button>
//                   <button
//                     onClick={() => setActiveNewsTab('funding')}
//                     className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
//                       activeNewsTab === 'funding' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
//                     }`}
//                   >
//                     <DollarSign className="w-4 h-4" />
//                     Funding ({classifiedNews?.fundingAlerts?.length || 0})
//                   </button>
//                   <button
//                     onClick={() => setActiveNewsTab('players')}
//                     className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-1 ${
//                       activeNewsTab === 'players' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
//                     }`}
//                   >
//                     <Building2 className="w-4 h-4" />
//                     Key Players ({classifiedNews?.keyPlayers?.length || 0})
//                   </button>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-4 h-4 text-slate-400" />
//                   <select
//                     value={selectedTopicFilter}
//                     onChange={(e) => setSelectedTopicFilter(e.target.value)}
//                     className="bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm"
//                   >
//                     {topicCategories.map(cat => (
//                       <option key={cat.value} value={cat.value}>{cat.label}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//               {displayArticles.map((article, idx) => (
//                 <div
//                   key={article.id || idx}
//                   onClick={() => openArticle(article.url)}
//                   className="bg-gradient-to-br from-slate-700/70 to-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500 transition-all cursor-pointer group h-fit"
//                 >
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className={`text-xs px-2 py-0.5 rounded font-medium ${
//                       article.source_type === 'news' 
//                         ? 'bg-blue-500/20 text-blue-300' 
//                         : 'bg-purple-500/20 text-purple-300'
//                     }`}>
//                       {article.source_type === 'news' ? 'News' : 'Research'}
//                     </span>
//                     <span className="text-xs px-2 py-0.5 rounded bg-slate-600 text-slate-300">
//                       {article.category}
//                     </span>
//                   </div>
                  
//                   <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
//                     {article.title}
//                   </h4>
                  
//                   <p className="text-xs text-slate-400 mb-3 line-clamp-4">
//                     {article.summary}
//                   </p>
                  
//                   {article.query && (
//                     <div className="mb-3 text-xs">
//                       <span className="text-slate-500">Topic: </span>
//                       <span className="text-cyan-400">{article.query}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center justify-between text-xs text-slate-500">
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       <span>{formatDate(article.publish_date)}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <span>Read More</span>
//                       <ExternalLink className="w-3 h-3" />
//                     </div>
//                   </div>
                  
//                   {article.author && article.author !== 'Unknown' && (
//                     <div className="mt-2 text-xs text-slate-500 truncate">
//                       By {article.author}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {data && (
//         <>
//           <div className="grid grid-cols-4 gap-4 mb-6">
//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-4 hover:border-blue-400 transition-colors">
//               <Globe className="w-5 h-5 text-blue-400 mb-2" />
//               <div className="text-3xl font-bold">{data?.rdInvestmentByCountry?.length || 0}</div>
//               <div className="text-sm text-slate-400">Countries Tracked</div>
//             </div>
//             <div className="bg-slate-800/50 backdrop-blur border border-green-500/30 rounded-lg p-4 hover:border-green-400 transition-colors">
//               <Rocket className="w-5 h-5 text-green-400 mb-2" />
//               <div className="text-3xl font-bold">{data?.emergingTechnologies?.length || 0}</div>
//               <div className="text-sm text-slate-400">Emerging Technologies</div>
//             </div>
//             <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-4 hover:border-purple-400 transition-colors">
//               <Users className="w-5 h-5 text-purple-400 mb-2" />
//               <div className="text-3xl font-bold">{data?.keyPlayers?.length || 0}</div>
//               <div className="text-sm text-slate-400">Key Players</div>
//             </div>
//             <div className="bg-slate-800/50 backdrop-blur border border-orange-500/30 rounded-lg p-4 hover:border-orange-400 transition-colors">
//               <DollarSign className="w-5 h-5 text-orange-400 mb-2" />
//               <div className="text-3xl font-bold">${data?.marketGrowth?.currentSize || 0}B</div>
//               <div className="text-sm text-slate-400">Current Market Size</div>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-6 mb-6">
//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-blue-400" />
//                 Trending Topics
//               </h3>
//               <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                 {data?.trendingTopics?.map((topic, idx) => (
//                   <div key={idx} className="space-y-2 pb-3 border-b border-slate-700 last:border-0">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="font-medium">{topic.name}</span>
//                       <span className="text-blue-400 font-bold">{topic.momentum}</span>
//                     </div>
//                     <div className="bg-slate-600 rounded-full h-2">
//                       <div 
//                         className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
//                         style={{ width: `${topic.momentum}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-slate-400">{topic.description}</p>
                    
//                     {topic.geographySpread && (
//                       <div className="mt-2 space-y-1">
//                         {topic.geographySpread.primary && topic.geographySpread.primary.length > 0 && (
//                           <div className="flex items-start gap-2">
//                             <span className="text-xs text-green-400 font-medium min-w-[60px]">Leading:</span>
//                             <span className="text-xs text-slate-300">{topic.geographySpread.primary.join(', ')}</span>
//                           </div>
//                         )}
//                         {topic.geographySpread.secondary && topic.geographySpread.secondary.length > 0 && (
//                           <div className="flex items-start gap-2">
//                             <span className="text-xs text-blue-400 font-medium min-w-[60px]">Active:</span>
//                             <span className="text-xs text-slate-300">{topic.geographySpread.secondary.join(', ')}</span>
//                           </div>
//                         )}
//                         {topic.geographySpread.emerging && topic.geographySpread.emerging.length > 0 && (
//                           <div className="flex items-start gap-2">
//                             <span className="text-xs text-yellow-400 font-medium min-w-[60px]">Emerging:</span>
//                             <span className="text-xs text-slate-300">{topic.geographySpread.emerging.join(', ')}</span>
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {topic.regionalActivity && topic.regionalActivity.length > 0 && (
//                       <div className="mt-2 space-y-1">
//                         {topic.regionalActivity.map((region, ridx) => (
//                           <div key={ridx} className="flex items-start gap-2 text-xs">
//                             <span className={`font-medium min-w-[100px] ${
//                               region.intensity === 'High' ? 'text-red-400' :
//                               region.intensity === 'Medium' ? 'text-orange-400' :
//                               'text-yellow-400'
//                             }`}>
//                               {region.region}:
//                             </span>
//                             <span className="text-slate-300">{region.focus}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-blue-400" />
//                 Signal Analysis
//               </h3>
//               <div className="space-y-3">
//                 {data?.signalAnalysis && (
//                   <>
//                     <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 p-3 rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Weak Signals</span>
//                         <span className="text-yellow-400 font-bold">{data.signalAnalysis.weakSignals?.length || 0}</span>
//                       </div>
//                       {data.signalAnalysis.weakSignals?.slice(0, 2).map((signal, idx) => (
//                         <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
//                       ))}
//                     </div>
//                     <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 p-3 rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Emerging Signals</span>
//                         <span className="text-blue-400 font-bold">{data.signalAnalysis.emergingSignals?.length || 0}</span>
//                       </div>
//                       {data.signalAnalysis.emergingSignals?.slice(0, 2).map((signal, idx) => (
//                         <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
//                       ))}
//                     </div>
//                     <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 p-3 rounded-lg">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Growing Signals</span>
//                         <span className="text-green-400 font-bold">{data.signalAnalysis.growingSignals?.length || 0}</span>
//                       </div>
//                       {data.signalAnalysis.growingSignals?.slice(0, 2).map((signal, idx) => (
//                         <p key={idx} className="text-xs text-slate-300 mt-1">• {signal.name}</p>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-blue-400" />
//                 Market Growth
//               </h3>
//               {data?.marketGrowth && (
//                 <div className="space-y-4">
//                   <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 p-4 rounded-lg text-center">
//                     <div className="text-xs text-slate-400 mb-1">Current (2024)</div>
//                     <div className="text-3xl font-bold text-blue-400">${data.marketGrowth.currentSize}B</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 p-4 rounded-lg text-center">
//                     <div className="text-xs text-slate-400 mb-1">Forecast 2030</div>
//                     <div className="text-3xl font-bold text-green-400">${data.marketGrowth.forecastedSize2030}B</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 p-4 rounded-lg text-center">
//                     <div className="text-xs text-slate-400 mb-1">CAGR</div>
//                     <div className="text-2xl font-bold text-purple-400">{data.marketGrowth.cagr}%</div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Rocket className="w-5 h-5 text-blue-400" />
//                 Emerging Technologies
//               </h3>
//               <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                 {data?.emergingTechnologies?.map((tech, idx) => (
//                   <div key={idx} className="bg-gradient-to-br from-slate-700/70 to-slate-700/30 p-4 rounded-lg border-l-4 border-blue-500">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="font-semibold text-sm">{tech.name}</span>
//                       <span className={`text-xs px-2 py-1 rounded ${
//                         tech.signalStrength === 'Strong' ? 'bg-green-500/20 text-green-300' :
//                         tech.signalStrength === 'Growing' ? 'bg-blue-500/20 text-blue-300' :
//                         'bg-yellow-500/20 text-yellow-300'
//                       }`}>
//                         {tech.signalStrength}
//                       </span>
//                     </div>
//                     <p className="text-xs text-slate-300 mb-3">{tech.description}</p>
//                     <div className="grid grid-cols-4 gap-2 text-xs mb-2">
//                       <div className="text-center">
//                         <div className="text-slate-400">Funding</div>
//                         <div className="text-green-400 font-bold">${tech.fundingEstimate}B</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-slate-400">Patents</div>
//                         <div className="text-purple-400 font-bold">{tech.patentCount}</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-slate-400">Maturity</div>
//                         <div className="text-orange-400 font-bold">{tech.maturityLevel}%</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-slate-400">Momentum</div>
//                         <div className="text-blue-400 font-bold">{tech.momentum}</div>
//                       </div>
//                     </div>
//                     <div className="bg-slate-600 rounded-full h-1.5">
//                       <div 
//                         className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full"
//                         style={{ width: `${tech.momentum}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Eye className="w-5 h-5 text-blue-400" />
//                 Key Players to Watch
//               </h3>
//               <div className="overflow-x-auto max-h-96 overflow-y-auto custom-scrollbar">
//                 <table className="w-full text-sm">
//                   <thead className="sticky top-0 bg-slate-800">
//                     <tr className="border-b border-blue-500/30">
//                       <th className="pb-2 text-left text-blue-400">Organization</th>
//                       <th className="pb-2 text-left text-blue-400">Region</th>
//                       <th className="pb-2 text-left text-blue-400">Investment</th>
//                       <th className="pb-2 text-left text-blue-400">Impact</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data?.keyPlayers?.map((player, idx) => (
//                       <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30">
//                         <td className="py-2 font-medium">{player.name}</td>
//                         <td className="py-2">{player.region}</td>
//                         <td className="py-2 text-green-400">${(player.investmentAmount/1000).toFixed(1)}B</td>
//                         <td className="py-2">
//                           <span className={`text-xs px-2 py-1 rounded ${
//                             player.impactLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
//                             'bg-orange-500/20 text-orange-300'
//                           }`}>
//                             {player.impactLevel}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <DollarSign className="w-5 h-5 text-blue-400" />
//                 Funding by Sector
//               </h3>
//               {data?.fundingInvestment?.topSectors && (
//                 <ResponsiveContainer width="100%" height={280}>
//                   <BarChart data={data.fundingInvestment.topSectors}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                     <XAxis dataKey="sector" stroke="#94a3b8" style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={60} />
//                     <YAxis stroke="#94a3b8" />
//                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
//                     <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>

//             <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-5">
//               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 R&D Investment by Country
//               </h3>
//               <ResponsiveContainer width="100%" height={280}>
//                 <BarChart data={data?.rdInvestmentByCountry?.slice(0, 8)} layout="vertical">
//                   <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                   <XAxis type="number" stroke="#94a3b8" />
//                   <YAxis dataKey="country" type="category" stroke="#94a3b8" width={70} />
//                   <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
//                   <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
//                     {data?.rdInvestmentByCountry?.slice(0, 8).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-6 mb-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <Brain className="w-6 h-6 text-blue-400" />
//               Executive Summary
//             </h3>
//             {data?.executiveSummary && (
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-lg font-semibold text-blue-400 mb-2">Overview</h4>
//                   <p className="text-slate-300 leading-relaxed">{data.executiveSummary.overview}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-green-400 mb-2">Key Findings</h4>
//                   <ul className="space-y-2">
//                     {data.executiveSummary.keyFindings?.map((finding, idx) => (
//                       <li key={idx} className="flex items-start gap-2 text-slate-300">
//                         <span className="text-green-400 mt-1">•</span>
//                         <span>{finding}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-purple-400 mb-2">Strategic Implications</h4>
//                   <p className="text-slate-300 leading-relaxed">{data.executiveSummary.strategicImplications}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-4">
//         <div className="flex items-center justify-between text-sm">
//           <div className="flex items-center gap-6 text-slate-400">
//             <span>Data Points: {data?.metadata?.dataPointsAnalyzed || 'N/A'}</span>
//             <span>Version: {data?.metadata?.analysisVersion || '1.0'}</span>
//             <span>Status: {analyzing ? 'Analyzing...' : 'Ready'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
//             <span className={analyzing ? 'text-yellow-400' : 'text-green-400'}>
//               {analyzing ? 'Analysis in Progress' : 'System Active'}
//             </span>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #1e293b;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #3b82f6;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #2563eb;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-4 {
//           display: -webkit-box;
//           -webkit-line-clamp: 4;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TechIntelligenceDashboard;
