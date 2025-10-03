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

const DRDOIntroHomepage = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            DRDO Technology Intelligence Platform
          </h1>
          
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced monitoring and analysis system for strategic defense technology intelligence. 
            Track global innovations, assess threats, and stay ahead in the technology landscape.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-slate-800/30 rounded-xl border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Comprehensive Technology Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/30 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-400/40 transition-colors">
                <div className="bg-blue-500/20 p-3 rounded-lg w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Domains */}
        <div className="bg-slate-800/30 border border-blue-500/20 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
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
              <div key={index} className="text-center p-4 bg-slate-700/20 rounded-lg hover:bg-slate-700/40 transition-colors">
                <div className="text-blue-400 font-medium">{domain}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ready to Explore Strategic Intelligence?
          </h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Access comprehensive technology analysis, threat assessments, and strategic insights 
            for defense research and development.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto">
            <TrendingUp className="w-5 h-5" />
            Launch Intelligence Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/50 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="font-semibold">DRDO Technology Intelligence</span>
            </div>
            <div className="text-slate-400 text-sm">
              Strategic Defense Research & Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRDOIntroHomepage;