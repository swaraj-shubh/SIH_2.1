import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Globe, 
  Cpu, 
  BookOpen, 
  ArrowRight,
  BarChart3,
  AlertTriangle,
  Users,
  Zap,
  Clock,
  Target,
  FileText
} from 'lucide-react';

const DRDOIntroHomepage = ({ theme = 'dark' }) => {
  const features = [
    {
      icon: Globe,
      title: "Automated Data Aggregation",
      description: "Automatically collects and aggregates vast amounts of global data from news, research papers, patents worldwide"
    },
    {
      icon: Cpu,
      title: "AI-Powered Intelligence",
      description: "Advanced LLM models perform deep processing and high-level intelligence synthesis"
    },
    {
      icon: BarChart3,
      title: "Strategic Forecasting",
      description: "Generates S-curve, H-curve analysis and TRL progression for strategic planning"
    },
    {
      icon: AlertTriangle,
      title: "Real-time Threat Detection",
      description: "Early warning system for potential security risks and technology shifts"
    }
  ];

  const capabilities = [
    {
      icon: Zap,
      title: "Intelligent Classification",
      description: "AI/ML pipeline scores and classifies data into Funding Alerts, Key Players, Trending Topics"
    },
    {
      icon: Clock,
      title: "Accelerated Intelligence",
      description: "Reduces time from data discovery to actionable intelligence from months to near real-time"
    },
    {
      icon: Target,
      title: "Structured Reporting",
      description: "Generates rich multi-vector JSON reports and strategic summaries"
    },
    {
      icon: FileText,
      title: "Interactive Dashboard",
      description: "Comprehensive platform for easy consumption of analyzed intelligence"
    }
  ];

  const impactStats = [
    { number: "166.6M+", label: "Patent Analyzed" },
    // { number: "3.55M+", label: "Research Papers Analyzed" },
    { number: "45+", label: "Countries Monitored" },
    { number: "28", label: "Technology Domains" },
    { number: "99%", label: "Time Reduction" }
  ];

  const benefits = [
    {
      title: "Strategic Impact",
      points: [
        "Data-Driven Decisions for technology focus and procurement",
        "Upskills researchers from manual data gatherers to strategic analysts",
        "Strengthens indigenous defense R&D and strategic autonomy"
      ]
    },
    {
      title: "Operational Benefits", 
      points: [
        "Reduces thousands of manual research hours with automation",
        "Unified intelligence layer for fragmented R&D data",
        "Accelerates intelligence cycle to near real-time responses"
      ]
    },
    {
      title: "Economic Benefits",
      points: [
        "Significant cost and time savings for defense R&D",
        "Optimizes allocation of defense budgets and personnel",
        "Aligns with Aatmanirbhar Bharat national mission"
      ]
    }
  ];

  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight 
    ? "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" 
    : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900";
  
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textSecondary = isLight ? "text-slate-600" : "text-slate-400";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textBlue = isLight ? "text-slate-600" : "text-blue-200";
  
  const cardBg = isLight ? "bg-white" : "bg-slate-800/30";
  const cardBorder = isLight ? "border-slate-200" : "border-blue-500/20";
  const cardHover = isLight ? "hover:border-blue-300 hover:shadow-md" : "hover:border-blue-400/40";
  
  const statsBg = isLight ? "bg-white" : "bg-slate-800/30";
  const statsBorder = isLight ? "border-slate-200" : "border-blue-500/20";
  
  const benefitBg = isLight ? "bg-blue-50" : "bg-slate-700/20";
  const benefitHover = isLight ? "hover:bg-blue-100" : "hover:bg-slate-700/40";
  const benefitBorder = isLight ? "border-blue-100" : "";
  
  const footerBorder = isLight ? "border-slate-200 bg-white" : "border-slate-700/50";
  const footerText = isLight ? "text-slate-500" : "text-slate-400";

  const buttonPrimary = isLight 
    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md" 
    : "bg-blue-600 hover:bg-blue-700 text-white";
  
  const buttonSecondary = isLight 
    ? "border border-blue-500 text-blue-600 hover:bg-blue-50" 
    : "border border-blue-500 text-blue-400 hover:bg-blue-500/10";
  
  const heroGradient = isLight 
    ? "bg-gradient-to-r from-blue-600 to-cyan-500" 
    : "bg-gradient-to-r from-blue-400 to-cyan-300";
  
  const ctaGradient = isLight 
    ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg" 
    : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600";
  
  const iconBg = isLight ? "bg-blue-100" : "bg-blue-500/20";
  const iconColor = isLight ? "text-blue-600" : "text-blue-400";

  return (
    <div className={`min-h-screen ${background} ${textPrimary}`}>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
<div className="flex justify-center mb-8"> {/* Increased bottom margin for better spacing */}
  <div className="flex items-center gap-4">
    <img  
      src="/logo.svg"  
      alt="SangamAI Logo"  
      className="w-24 h-24 rounded-2xl shadow-lg"
    />
    {/* IMPORTANT: Update the fallback to match the new size and shape */}
    <div className={`${isLight ? 'bg-blue-500' : 'bg-blue-600'} w-24 h-24 p-4 rounded-2xl hidden items-center justify-center`}>
      <Shield className="w-16 h-16 text-white" />
    </div>
  </div>
</div>
          
<h1 className={`text-4xl md:text-5xl font-bold text-center mb-6 ${heroGradient} bg-clip-text text-transparent`}>
  SangamAI - DRDO Technology Intelligence Platform
</h1>
          
          <p className={`text-xl ${textBlue} mb-8 max-w-4xl mx-auto leading-relaxed`}>
            An automated platform providing comprehensive technology intelligence and forecasting for DRDO. 
            Significantly reduces workload for researchers and enables faster, data-driven strategic decision-making.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a href="/technology-intelligence" className={`${buttonPrimary} px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}>
              Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/analytics" className={`${buttonSecondary} px-8 py-3 rounded-lg font-semibold transition-colors`}>
              View Analytics
            </a>
          </div>
        </div>

        {/* Problem Statement */}
        {/* <div className={`${cardBg} ${cardBorder} rounded-2xl p-8 mb-16 ${isLight ? 'shadow-sm' : ''}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${textPrimary}`}>
            Addressing Critical Defense Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-2 gap-6">
            <div className={`p-6 ${benefitBg} rounded-lg ${benefitBorder}`}>
              <h3 className={`text-xl font-semibold mb-4 ${textAccent}`}>The Problem</h3>
              <ul className={`space-y-3 ${textSecondary}`}>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>Multiple layers of review lead to massive project delays (16% to 500% time overruns)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>Slow manual aggregation of 3.55M+ research papers, patents, and articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>Critical delay between data discovery and strategic action</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 ${benefitBg} rounded-lg ${benefitBorder}`}>
              <h3 className={`text-xl font-semibold mb-4 ${textAccent}`}>Our Solution</h3>
              <ul className={`space-y-3 ${textSecondary}`}>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>Automated aggregation from WorldNews API, Semantic Scholar API, and global sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>AI/ML pipeline for intelligent classification and scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${textAccent} mt-1`}>•</span>
                  <span>Real-time intelligence synthesis and strategic reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <div key={index} className={`text-center p-6 ${statsBg} rounded-xl ${statsBorder} ${isLight ? 'shadow-sm hover:shadow-md transition-shadow' : ''}`}>
              <div className={`text-3xl font-bold ${textAccent} mb-2`}>{stat.number}</div>
              <div className={textSecondary}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${textPrimary}`}>
            Core Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`${cardBg} ${cardBorder} rounded-xl p-6 text-center ${cardHover} transition-all ${isLight ? 'shadow-sm' : ''}`}>
                <div className={`${iconBg} p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center`}>
                  <feature.icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-3 ${textPrimary}`}>{feature.title}</h3>
                <p className={`${textSecondary} text-sm leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Capabilities */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${textPrimary}`}>
            Advanced Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className={`${cardBg} ${cardBorder} rounded-xl p-6 text-center ${cardHover} transition-all ${isLight ? 'shadow-sm' : ''}`}>
                <div className={`${iconBg} p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center`}>
                  <capability.icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-3 ${textPrimary}`}>{capability.title}</h3>
                <p className={`${textSecondary} text-sm leading-relaxed`}>{capability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`${cardBg} ${cardBorder} rounded-2xl p-8 mb-16 ${isLight ? 'shadow-sm' : ''}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${textPrimary}`}>
            Strategic Impact & Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className={`p-6 ${benefitBg} rounded-lg ${benefitBorder} ${benefitHover} transition-colors`}>
                <h3 className={`text-xl font-semibold mb-4 ${textAccent}`}>{benefit.title}</h3>
                <ul className={`space-y-2 ${textSecondary}`}>
                  {benefit.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-sm">
                      <span className={`${textAccent} mt-1`}>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Modules */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${textPrimary}`}>
            Explore Our Intelligence Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Technology Intelligence', 
                href: '/technology-intelligence', 
                icon: '🔍',
                description: 'Real-time monitoring and analysis of global defense technologies'
              },
              { 
                name: 'Analytics & Forecasting', 
                href: '/analytics', 
                icon: '📈',
                description: 'Advanced AI forecasting with S-curve and TRL analysis'
              },
              { 
                name: 'Patent Analysis', 
                href: '/patents', 
                icon: '📑',
                description: 'Comprehensive patent landscape and innovation tracking'
              },
              { 
                name: 'Research Publications', 
                href: '/publications', 
                icon: '📚',
                description: 'Global research papers and academic intelligence'
              }
            ].map((module, index) => (
              <a
                key={index}
                href={module.href}
                className={`group relative overflow-hidden ${cardBg} ${cardBorder} rounded-xl p-6 ${cardHover} transition-all duration-300 transform hover:scale-105 ${isLight ? 'shadow-sm hover:shadow-lg' : ''}`}
              >
                {/* Background gradient effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                <div className="relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className={`text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  
                  {/* Module title */}
                  <h3 className={`font-bold text-lg mb-3 ${textPrimary} group-hover:${textAccent} transition-colors duration-300`}>
                    {module.name}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm ${textSecondary} leading-relaxed mb-4`}>
                    {module.description}
                  </p>
                  
                  {/* CTA arrow with animation */}
                  <div className={`flex items-center justify-center gap-1 text-sm font-medium ${textAccent} group-hover:${isLight ? 'text-blue-700' : 'text-blue-300'} transition-colors duration-300`}>
                    {/* <span>Explore</span> */}
                    {/* <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" /> */}
                  </div>
                </div>
                
                {/* Subtle border animation */}
                <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/20 transition-all duration-300`}></div>
              </a>
            ))}
          </div>
          
          {/* Quick stats below modules */}
          <div className="mt-12 text-center">
            <div className={`inline-flex items-center gap-6 ${textSecondary} text-sm`}>
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-green-500' : 'bg-green-400'}`}></div>
                Real-time Data Updates
              </span>
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
                AI-Powered Insights
              </span>
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-purple-500' : 'bg-purple-400'}`}></div>
                Interactive Dashboards
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
            Ready to Transform Defense Intelligence?
          </h2>
          <p className={`${textBlue} mb-6 max-w-2xl mx-auto`}>
            Join the future of strategic defense technology intelligence. Reduce manual workload, 
            accelerate decision-making, and strengthen national security capabilities.
          </p>
          <a href="/technology-intelligence" className={`${ctaGradient} text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto w-fit`}>
            <TrendingUp className="w-5 h-5" />
            Launch Intelligence Dashboard
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t ${footerBorder} mt-20`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="SangamAI Logo" 
                className="w-6 h-6"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden">
                <Shield className={`w-6 h-6 ${iconColor}`} />
              </div>
              <span className={`font-semibold ${textPrimary}`}>SangamAI - DRDO Technology Intelligence</span>
            </div>
            <div className={`${footerText} text-sm`}>
              Empowering Strategic Defense Research & Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRDOIntroHomepage;