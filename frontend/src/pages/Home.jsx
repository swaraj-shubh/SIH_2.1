import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Telescope, 
  BarChart3, 
  FileText, 
  BookOpen,
  Shield,
  Cpu,
  TrendingUp,
  Database,
  Target,
  Zap,
  Users,
  Globe
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Unified Data Aggregation",
      description: "Integrate data from patents, research publications, industry reports, and market trends in one platform"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "AI-Powered Forecasting",
      description: "Advanced analytics for TRL progression, S-curve analysis, and technology convergence detection"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Intelligence",
      description: "Continuous monitoring and instant updates on emerging technologies and market shifts"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategic Decision Support",
      description: "Data-driven insights for technology adoption, development, and investment decisions"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Technology Scouting",
      description: "Comprehensive coverage of international patents, research, and industry developments"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Intelligence",
      description: "Track market size, growth trends, and competitive landscape analysis"
    }
  ];

  const capabilities = [
    {
      title: "Patent Analysis",
      icon: <FileText className="h-6 w-6" />,
      description: "Comprehensive patent mapping and trend analysis across global databases"
    },
    {
      title: "Research Intelligence",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Academic publication tracking and citation analysis for breakthrough detection"
    },
    {
      title: "Technology Forecasting",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Predictive modeling for technology readiness levels and market adoption"
    },
    {
      title: "Competitive Analysis",
      icon: <Users className="h-6 w-6" />,
      description: "Monitor competitor activities, investments, and technology portfolios"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-2xl">
                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DRDO
              </span>
              <br />
              Technology Intelligence Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transforming scattered technology intelligence into comprehensive, real-time strategic insights for national security and technological supremacy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/technology-intelligence"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Platform
                <Telescope className="inline ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/analytics"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
              >
                View Analytics
                <BarChart3 className="inline ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower DRDO laboratories with automated, comprehensive technology intelligence 
              and forecasting capabilities, enabling data-driven strategic decisions for national defense 
              and technological advancement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    National Security Focus
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dedicated to enhancing India's defense capabilities through cutting-edge 
                    technology intelligence and strategic foresight.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Technological Sovereignty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enabling self-reliance in critical defense technologies through comprehensive 
                    market and competitor intelligence.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Key Objectives</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Automate technology scouting and intelligence gathering
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Provide real-time forecasting and trend analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Enable data-driven strategic decision making
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Reduce technology adoption risks and timelines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Capabilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced AI-powered features designed specifically for defense technology intelligence requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Analysis Modules
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border-2 border-transparent group-hover:border-blue-500">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-blue-600 dark:text-blue-400">
                      {capability.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Technology Intelligence?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start exploring comprehensive technology insights and strategic forecasts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Launch Dashboard
              </Link>
              <Link
                to="/technology-intelligence"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Explore Technologies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Shield className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-xl font-bold">DRDO Technology Intelligence</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering national security through advanced technology intelligence and strategic foresight
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2024 Defence Research and Development Organisation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;