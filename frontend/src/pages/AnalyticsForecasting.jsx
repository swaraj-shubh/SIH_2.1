import React, { useState } from 'react';
import { Search, AlertCircle, BarChart3 } from 'lucide-react';

// Import components
import Header from '../components/AnalyticsForecasting/Header';
import OverviewCards from '../components/AnalyticsForecasting/OverviewCards';
import TabNavigation from '../components/AnalyticsForecasting/TabNavigation';
import TabContent from '../components/AnalyticsForecasting/TabContent';
import KeywordsSection from '../components/AnalyticsForecasting/KeywordsSection';
import ExportActions from '../components/AnalyticsForecasting/ExportActions';

const AnalyticsForecasting = ({ theme = 'dark' }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight 
    ? "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" 
    : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textBlue = isLight ? "text-slate-600" : "text-blue-300";
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/40";
  const cardBorder = isLight ? "border-slate-200" : "border-blue-800/30";
  
  const skeletonBg = isLight ? "bg-slate-200" : "bg-slate-700";
  const skeletonBorder = isLight ? "border-slate-300" : "border-blue-800/30";

  const handleSearch = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/advanced-analytics/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || 'Analysis failed');
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${background}`}>
      <Header 
        topic={topic}
        setTopic={setTopic}
        loading={loading}
        handleSearch={handleSearch}
        theme={theme}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className={`${isLight ? 'bg-red-50 border-red-300' : 'bg-red-900/40 border-red-700'} border rounded-lg p-4 mb-6 flex items-center gap-2 backdrop-blur-sm`}>
            <AlertCircle className={`h-5 w-5 ${isLight ? 'text-red-500' : 'text-red-400'}`} />
            <p className={isLight ? 'text-red-600' : 'text-red-200'}>{error}</p>
          </div>
        )}

        {!data || !loading && (
          <div className={`min-h-screen ${background}`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Overview Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`${cardBg} backdrop-blur-sm p-4 rounded-lg border ${skeletonBorder} animate-pulse`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-5 w-5 ${skeletonBg} rounded`}></div>
                      <div className={`h-4 w-24 ${skeletonBg} rounded`}></div>
                    </div>
                    <div className={`h-8 w-16 ${skeletonBg} rounded mb-2`}></div>
                    <div className={`h-3 w-32 ${skeletonBg} rounded`}></div>
                  </div>
                ))}
              </div>

              {/* Tabs Skeleton */}
              <div className={`${cardBg} backdrop-blur-sm rounded-lg border ${skeletonBorder} mb-6`}>
                <div className={`border-b ${skeletonBorder} flex overflow-x-auto`}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="px-6 py-3">
                      <div className={`h-4 w-20 ${skeletonBg} rounded animate-pulse`}></div>
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  {/* TRL Progression Skeleton */}
                  <div className="space-y-6">
                    <div>
                      <div className={`h-6 w-48 ${skeletonBg} rounded mb-4 animate-pulse`}></div>
                      <div className={`h-64 ${skeletonBg} rounded mb-4 animate-pulse`}></div>
                      <div className={`p-4 ${isLight ? 'bg-slate-100' : 'bg-slate-800/40'} rounded backdrop-blur-sm`}>
                        <div className={`h-4 w-20 ${skeletonBg} rounded mb-2 animate-pulse`}></div>
                        <div className="space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className={`h-4 w-4 ${skeletonBg} rounded mt-0.5 animate-pulse`}></div>
                              <div className={`h-3 w-full ${skeletonBg} rounded animate-pulse`}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Charts Row Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {[...Array(2)].map((_, i) => (
                        <div key={i}>
                          <div className={`h-6 w-40 ${skeletonBg} rounded mb-4 animate-pulse`}></div>
                          <div className={`h-64 ${skeletonBg} rounded mb-2 animate-pulse`}></div>
                          <div className={`h-3 w-full ${skeletonBg} rounded animate-pulse`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {data && (
          <>
            <OverviewCards data={data} topic={topic} theme={theme} />
            
            <div className={`${cardBg} backdrop-blur-sm rounded-lg border ${cardBorder} mb-6`}>
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
              <TabContent activeTab={activeTab} data={data} theme={theme} />
            </div>

            <KeywordsSection data={data} theme={theme} />
            <ExportActions data={data} topic={topic} theme={theme} />
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsForecasting;