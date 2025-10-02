import React, { useState, useEffect } from 'react';
import { Loader, Database, RefreshCw } from 'lucide-react';

// Import components
import Header from '@/components/dashboard/Header';
import StatsOverview from '../components/dashboard/StatsOverview';
import NewsSection from '../components/dashboard/NewsSection';
import TrendingTopics from '../components/dashboard/TrendingTopics';
import SignalAnalysis from '../components/dashboard/SignalAnalysis';
import MarketGrowth from '../components/dashboard/MarketGrowth';
import EmergingTechnologies from '../components/dashboard/EmergingTechnologies';
import KeyPlayers from '../components/dashboard/KeyPlayers';
import FundingCharts from '../components/dashboard/FundingCharts';
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary';
import Footer from '../components/dashboard/Footer';

const API_BASE_URL = 'http://localhost:5000/api';

const TechIntelligenceDashboard = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data && !loading && newsArticles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-lg p-8 max-w-2xl">
          <div className="text-center mb-6">
            <Database className="w-20 h-20 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">DRDO Technology Intelligence Platform</h2>
            <p className="text-slate-300 mb-6">Start comprehensive technology intelligence analysis</p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          <button
            onClick={triggerNewAnalysis}
            disabled={analyzing}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-3 text-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <Header 
        lastUpdated={lastUpdated}
        analyzing={analyzing}
        triggerNewAnalysis={triggerNewAnalysis}
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
        />
      )}

      {data && (
        <>
          <StatsOverview data={data} />
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <TrendingTopics data={data} />
            <SignalAnalysis data={data} />
            <MarketGrowth data={data} />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <EmergingTechnologies data={data} />
            <KeyPlayers data={data} />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <FundingCharts data={data} />
          </div>

          <ExecutiveSummary data={data} />
        </>
      )}

      <Footer data={data} analyzing={analyzing} />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default TechIntelligenceDashboard;