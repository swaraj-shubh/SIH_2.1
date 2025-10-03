import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Search, TrendingUp, FileText, Activity, Zap, GitMerge, Target, AlertCircle, ChevronRight, ExternalLink, Calendar, BarChart3 } from 'lucide-react';

const AdvancedAnalyticsDashboard = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/advanced-analytics/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || 'Analysis failed');
      }

      const result = await response.json();
      // Backend returns { message, data, cached }
      setData(result.data);
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Chart subcomponents ---------- */

  const TRLProgressionChart = ({ data }) => {
    if (!data?.trlProgression?.timeline) return null;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.trlProgression.timeline}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 9]} ticks={[1,2,3,4,5,6,7,8,9]} />
          <Tooltip content={({ active, payload }) => {
            if (active && payload?.[0]) {
              return (
                <div className="bg-white p-3 border rounded shadow-lg">
                  <p className="font-semibold">{payload[0].payload.year}</p>
                  <p className="text-sm text-blue-600">TRL: {payload[0].value}</p>
                  <p className="text-xs text-gray-600 mt-1">{payload[0].payload.milestone}</p>
                </div>
              );
            }
            return null;
          }} />
          <Legend />
          <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={3} name="TRL Level" dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const SCurveChart = ({ data }) => {
    if (!data?.sCurveData?.dataPoints) return null;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data.sCurveData.dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cumulative" stroke="#10b981" fill="#10b98130" name="Cumulative Adoption" />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const HypeCycleChart = ({ data }) => {
    if (!data?.hypeCycle) return null;

    const phases = [
      { name: 'Innovation\nTrigger', x: 10, y: 20 },
      { name: 'Peak of\nExpectations', x: 30, y: 90 },
      { name: 'Trough of\nDisillusionment', x: 50, y: 30 },
      { name: 'Slope of\nEnlightenment', x: 70, y: 60 },
      { name: 'Plateau of\nProductivity', x: 90, y: 80 }
    ];

    const currentPhaseMap = {
      'Innovation Trigger': 0,
      'Peak of Inflated Expectations': 1,
      'Trough of Disillusionment': 2,
      'Slope of Enlightenment': 3,
      'Plateau of Productivity': 4
    };

    const currentIndex = currentPhaseMap[data.hypeCycle.currentPhase] ?? 0;
    const currentPosition = phases[currentIndex] ?? phases[0];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
          <YAxis type="number" dataKey="y" domain={[0, 100]} label={{ value: 'Visibility', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={({ active, payload }) => {
            if (active && payload?.[0]) {
              return (
                <div className="bg-white p-2 border rounded shadow">
                  <p className="text-xs font-semibold">{payload[0].payload.name.replace('\n', ' ')}</p>
                </div>
              );
            }
            return null;
          }} />
          <Scatter data={phases} fill="#cbd5e1" shape="circle" />
          <Scatter data={[{ ...currentPosition, name: 'Current Position' }]} fill="#ef4444" shape="circle" r={8} />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  const MarketSizeChart = ({ data }) => {
    if (!data?.marketAnalysis) return null;

    const marketData = [
      { year: '2024', value: data.marketAnalysis.currentSize, label: 'Current' },
      { year: '2030', value: data.marketAnalysis.projectedSize2030, label: 'Projected' }
    ];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={marketData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Market Size ($B)" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const RegionalBreakdownChart = ({ data }) => {
    if (!data?.marketAnalysis?.regionalBreakdown) return null;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.marketAnalysis.regionalBreakdown}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="share" name="Market Share (%)" fill="#3b82f6" />
          <Bar dataKey="growth" name="Growth Rate (%)" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const SignalStrengthRadar = ({ data }) => {
    if (!data?.signalAnalysis?.signals) return null;
    const radarData = data.signalAnalysis.signals.slice(0, 6).map(signal => ({
      signal: signal.name.substring(0, 20),
      momentum: signal.momentum
    }));
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="signal" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar name="Signal Momentum" dataKey="momentum" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  const ConvergenceNetwork = ({ data }) => {
    if (!data?.convergenceDetection?.convergingTechnologies) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.convergenceDetection.convergingTechnologies.slice(0, 4).map((tech, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">{tech.name}</h4>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {tech.maturity}% Mature
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2">{tech.synergy}</p>
            <div className="flex flex-wrap gap-1">
              {tech.applications?.slice(0, 3)?.map((app, i) => (
                <span key={i} className="text-xs bg-white px-2 py-1 rounded border">
                  {app}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ---------------------- Render ---------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics & Forecasting</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter technology topic (e.g., Quantum Computing, AI in Healthcare)"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !topic.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-20">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Ready to Analyze</h2>
            <p className="text-gray-500">Enter a technology topic to begin comprehensive analysis</p>
          </div>
        )}

        {data && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Current TRL</span>
                </div>
                <p className="text-2xl font-bold">{data.analysis?.trlProgression?.currentLevel ?? 'N/A'}</p>
                <p className="text-xs text-gray-500 mt-1">{data.analysis?.trlProgression?.levelDescription?.substring(0, 50)}</p>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Adoption Phase</span>
                </div>
                <p className="text-2xl font-bold">{data.analysis?.sCurveData?.phase ?? 'N/A'}</p>
                <p className="text-xs text-gray-500 mt-1">{data.analysis?.sCurveData?.adoptionRate ?? 0}% Adoption Rate</p>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Market Size</span>
                </div>
                <p className="text-2xl font-bold">${data.analysis?.marketAnalysis?.currentSize ?? 'N/A'}B</p>
                <p className="text-xs text-gray-500 mt-1">{data.analysis?.marketAnalysis?.cagr ?? 'N/A'}% CAGR</p>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-600">Data Sources</span>
                </div>
                <p className="text-2xl font-bold">
                  {( (data.metadata?.newsCount ?? 0) + (data.metadata?.patentCount ?? 0) )}
                </p>
                <p className="text-xs text-gray-500 mt-1">{data.metadata?.newsCount ?? 0} News, {data.metadata?.patentCount ?? 0} Patents</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border mb-6">
              <div className="border-b flex overflow-x-auto">
                {['overview', 'market', 'signals', 'convergence', 'insights', 'sources'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        TRL Progression Tracking
                      </h3>
                      <TRLProgressionChart data={data.analysis} />
                      <div className="mt-4 p-4 bg-gray-50 rounded">
                        <h4 className="font-semibold text-sm mb-2">Evidence</h4>
                        <ul className="space-y-1">
                          {(data.analysis?.trlProgression?.evidence ?? []).map((ev, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                              {ev}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          S-Curve Analysis
                        </h3>
                        <SCurveChart data={data.analysis} />
                        <p className="text-sm text-gray-600 mt-2">{data.analysis?.sCurveData?.analysis}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Hype Cycle Position
                        </h3>
                        <HypeCycleChart data={data.analysis} />
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-gray-600">Time to Mainstream:</span>
                          <span className="font-semibold">{data.analysis?.hypeCycle?.timeToMainstream}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'market' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Market Size & Growth</h3>
                      <MarketSizeChart data={data.analysis} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Regional Breakdown</h3>
                      <RegionalBreakdownChart data={data.analysis} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-3">Growth Drivers</h4>
                        <ul className="space-y-2">
                          {(data.analysis?.marketAnalysis?.growthDrivers ?? []).map((driver, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 text-green-600" />
                              {driver}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-3">Key Players</h4>
                        <div className="flex flex-wrap gap-2">
                          {(data.analysis?.marketAnalysis?.keyPlayers ?? []).map((player, i) => (
                            <span key={i} className="px-3 py-1 bg-white border rounded-full text-sm">
                              {player}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'signals' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Signal Momentum</h3>
                      <SignalStrengthRadar data={data.analysis} />
                    </div>

                    <div className="space-y-4">
                      {(data.analysis?.signalAnalysis?.signals ?? []).map((signal, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{signal.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                signal.strength === 'Strong' ? 'bg-green-100 text-green-700' :
                                signal.strength === 'Emerging' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {signal.strength}
                              </span>
                              <span className="text-xs text-gray-500">{signal.timeframe}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
                          <p className="text-sm text-gray-700 italic">{signal.implications}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Disruptive Potential</h4>
                      <p className="text-2xl font-bold text-red-700">{data.analysis?.signalAnalysis?.disruptivePotential ?? 'N/A'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'convergence' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <GitMerge className="h-5 w-5" />
                        Converging Technologies
                      </h3>
                      <ConvergenceNetwork data={data.analysis} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-3 text-blue-900">Cross-Sector Impact</h4>
                        <div className="flex flex-wrap gap-2">
                          {(data.analysis?.convergenceDetection?.crossSectorImpact ?? []).map((sector, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold mb-3 text-purple-900">Integration Opportunities</h4>
                        <ul className="space-y-2">
                          {(data.analysis?.convergenceDetection?.integrationOpportunities ?? []).slice(0, 5).map((opp, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 text-purple-600" />
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'insights' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-900 mb-4 text-lg">Opportunities</h3>
                        <ul className="space-y-3">
                          {(data.analysis?.strategicInsights?.opportunities ?? []).map((opp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-6 w-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-green-700">{i + 1}</span>
                              </div>
                              <span className="text-sm text-gray-700">{opp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                        <h3 className="font-semibold text-red-900 mb-4 text-lg">Threats</h3>
                        <ul className="space-y-3">
                          {(data.analysis?.strategicInsights?.threats ?? []).map((threat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{threat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-900 mb-4 text-lg">Strategic Recommendations</h3>
                      <div className="space-y-3">
                        {(data.analysis?.strategicInsights?.recommendations ?? []).map((rec, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded border">
                            <span className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {i + 1}
                            </span>
                            <p className="text-sm text-gray-700">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-900 mb-4 text-lg">Investment Focus Areas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {(data.analysis?.strategicInsights?.investmentAreas ?? []).map((area, i) => (
                          <div key={i} className="p-3 bg-white rounded border text-center">
                            <p className="text-sm font-medium text-gray-700">{area}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sources' && (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* Keywords Section */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Generated Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {(data?.keywords ?? []).map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Export & Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  const jsonStr = JSON.stringify(data, null, 2);
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${(topic || 'analysis').replace(/\s+/g, '_')}_analysis.json`;
                  a.click();
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export JSON
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;