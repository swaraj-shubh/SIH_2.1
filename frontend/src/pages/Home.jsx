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
  Users
} from 'lucide-react';

const DRDOIntroHomepage = ({ theme = 'dark' }) => {
  const features = [
    {
      icon: Globe,
      title: "Global Tech Monitoring",
      description: "Track emerging technologies and research worldwide in real-time"
    },
    {
      icon: Cpu,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze technology trends and threats"
    },
    {
      icon: BarChart3,
      title: "Strategic Intelligence",
      description: "Comprehensive insights for defense planning and decision making"
    },
    {
      icon: AlertTriangle,
      title: "Threat Detection",
      description: "Early warning system for potential security risks and vulnerabilities"
    }
  ];

  const quickStats = [
    { number: "45+", label: "Countries Monitored" },
    { number: "28", label: "Technology Domains" },
    { number: "150+", label: "Daily Analysis" },
    { number: "12", label: "Active Alerts" }
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
  
  const domainBg = isLight ? "bg-blue-50" : "bg-slate-700/20";
  const domainHover = isLight ? "hover:bg-blue-100" : "hover:bg-slate-700/40";
  const domainBorder = isLight ? "border-blue-100" : "";
  
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
  const shieldBg = isLight ? "bg-blue-500 shadow-lg" : "bg-blue-600";
  const shieldColor = isLight ? "text-blue-500" : "text-blue-400";

  return (
    <div className={`min-h-screen ${background} ${textPrimary}`}>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`${shieldBg} p-4 rounded-2xl`}>
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold mb-6 ${heroGradient} bg-clip-text text-transparent`}>
            DRDO Technology Intelligence Platform
          </h1>
          
          <p className={`text-xl ${textBlue} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Advanced monitoring and analysis system for strategic defense technology intelligence. 
            Track global innovations, assess threats, and stay ahead in the technology landscape.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className={`${buttonPrimary} px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}>
              Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className={`${buttonSecondary} px-8 py-3 rounded-lg font-semibold transition-colors`}>
              Learn More
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {quickStats.map((stat, index) => (
            <div key={index} className={`text-center p-6 ${statsBg} rounded-xl ${statsBorder} ${isLight ? 'shadow-sm hover:shadow-md transition-shadow' : ''}`}>
              <div className={`text-3xl font-bold ${textAccent} mb-2`}>{stat.number}</div>
              <div className={textSecondary}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${textPrimary}`}>
            Comprehensive Technology Intelligence
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

        {/* Technology Domains */}
        <div className={`${cardBg} ${cardBorder} rounded-2xl p-8 mb-16 ${isLight ? 'shadow-sm' : ''}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${textPrimary}`}>
            Key Technology Domains
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Quantum Computing",
              "Artificial Intelligence", 
              "Semiconductors",
              "Cybersecurity",
              "Hypersonic Systems",
              "Biotechnology",
              "Space Technology",
              "Advanced Materials"
            ].map((domain, index) => (
              <div key={index} className={`text-center p-4 ${domainBg} rounded-lg ${domainHover} transition-colors ${domainBorder}`}>
                <div className={`${textAccent} font-medium`}>{domain}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
            Ready to Explore Strategic Intelligence?
          </h2>
          <p className={`${textBlue} mb-6 max-w-2xl mx-auto`}>
            Access comprehensive technology analysis, threat assessments, and strategic insights 
            for defense research and development.
          </p>
          <button className={`${ctaGradient} text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto`}>
            <TrendingUp className="w-5 h-5" />
            Launch Intelligence Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t ${footerBorder} mt-20`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className={`w-6 h-6 ${shieldColor}`} />
              <span className={`font-semibold ${textPrimary}`}>DRDO Technology Intelligence</span>
            </div>
            <div className={`${footerText} text-sm`}>
              Strategic Defense Research & Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRDOIntroHomepage;