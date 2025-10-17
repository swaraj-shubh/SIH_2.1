import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const Header = ({ topic, setTopic, loading, handleSearch, theme = 'dark' }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Theme-specific styles
  const isLight = theme === 'light';
  
  const background = isLight ? "bg-slate-100" : "bg-slate-800/50";
  const border = isLight ? "border-slate-300" : "border-blue-800/30";
  const textPrimary = isLight ? "text-slate-800" : "text-white";
  const textAccent = isLight ? "text-blue-600" : "text-blue-400";
  const textSecondary = isLight ? "text-slate-600" : "text-blue-300";
  const inputBg = isLight ? "bg-white" : "bg-slate-700/50";
  const inputBorder = isLight ? "border-slate-300" : "border-blue-800/30";
  const inputText = isLight ? "text-slate-800" : "text-white";
  const inputPlaceholder = isLight ? "placeholder-slate-500" : "placeholder-blue-200";
  const dropdownBg = isLight ? "bg-white" : "bg-slate-800";
  const dropdownBorder = isLight ? "border-slate-300" : "border-blue-800/30";
  const dropdownText = isLight ? "text-slate-700" : "text-blue-100";
  const dropdownHover = isLight ? "hover:bg-blue-100" : "hover:bg-blue-600/30";
  const chipBg = isLight ? "bg-slate-200" : "bg-slate-700/50";
  const chipHover = isLight ? "hover:bg-blue-200" : "hover:bg-blue-600/40";
  const chipBorder = isLight ? "border-slate-300" : "border-blue-800/30";
  const chipText = isLight ? "text-slate-700" : "text-blue-200";

  const searchSuggestions = [
    'Quantum Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Defense Technology',
    'Semiconductors',
    '5G Technology',
    'Internet of Things',
    'Blockchain',
    'Cryptocurrency',
    'Autonomous Vehicles',
    'Robotics',
    'Augmented Reality',
    'Virtual Reality',
    'Biotechnology',
    'Gene Editing',
    'Renewable Energy',
    'Solar Power',
    'Wind Energy',
    'Energy Storage',
    'Battery Technology',
    'Electric Vehicles',
    'Space Technology',
    'Satellite Communications',
    'Drone Technology',
    'Edge Computing',
    'Cloud Computing',
    'Big Data Analytics',
    'Natural Language Processing',
    'Computer Vision',
    'Neural Networks',
    'Deep Learning',
    'Quantum Cryptography',
    'Post-Quantum Cryptography',
    'Zero Trust Architecture',
    'Cyber Threat Intelligence',
    'Advanced Materials',
    'Nanotechnology',
    'Graphene Technology',
    '3D Printing',
    'Additive Manufacturing',
    'Smart Cities',
    'Digital Twins',
    'Metaverse',
    'Web3',
    'Decentralized Finance',
    'Neurotechnology',
    'Brain-Computer Interfaces',
    'Precision Medicine',
    'Telemedicine',
    'Digital Health',
    'Wearable Technology',
    'Smart Grids',
    'Hydrogen Fuel Cells',
    'Nuclear Fusion',
    'Carbon Capture',
    'Climate Tech',
    'AgriTech',
    'Vertical Farming',
    'Food Technology',
    'Supply Chain Technology',
    'Logistics Automation',
    'Industrial IoT',
    'Digital Transformation',
    'Quantum Sensors',
    'Photonics',
    'LiDAR Technology',
    'Autonomous Systems',
    'Swarm Robotics',
    'Explainable AI',
    'Federated Learning',
    'Homomorphic Encryption',
    'Post-Silicon Computing',
    'Neuromorphic Computing',
    'Optical Computing',
    'DNA Data Storage',
    'Quantum Internet',
    '6G Technology',
    'Terahertz Communications',
    'Smart Materials',
    'Self-Healing Materials',
    'Programmable Matter',
    'Digital Therapeutics',
    'Synthetic Biology',
    'Lab-Grown Meat',
    'Vertical Takeoff Aircraft',
    'Hyperloop Technology',
    'Ocean Cleanup Technology',
    'Water Purification',
    'Desalination Technology'
  ];

  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion);
    setShowSuggestions(false);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(topic.toLowerCase())
  );

  const displaySuggestions = topic.trim() ? filteredSuggestions : searchSuggestions.slice(0, 8);

  return (
    <div className={`${background} backdrop-blur-sm border-b ${border} sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className={`text-2xl font-bold ${textAccent} mb-4`}>Advanced Analytics & Forecasting</h1>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-3 h-5 w-5 ${textSecondary}`} />
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter technology topic (e.g., Quantum Computing, AI in Healthcare)"
              className={`w-full pl-10 pr-10 py-2 ${inputBg} border ${inputBorder} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${inputText} ${inputPlaceholder} backdrop-blur-sm`}
            />
            
            {searchSuggestions.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className={`absolute right-3 top-3 ${textSecondary} hover:${textAccent}`}
              >
                {showSuggestions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}

            {showSuggestions && displaySuggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 ${dropdownBg} border ${dropdownBorder} rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-20 backdrop-blur-sm`}>
                <div className="p-2">
                  <div className={`text-xs font-semibold ${textSecondary} px-2 py-1`}>
                    {topic.trim() ? 'Matching Topics' : 'Popular Topics'}
                  </div>
                  {displaySuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-2 ${dropdownHover} rounded-md text-sm ${dropdownText} hover:text-white transition-colors`}
                    >
                      {suggestion}
                    </button>
                  ))}
                  
                  {!topic.trim() && searchSuggestions.length > 8 && (
                    <div className={`text-xs ${textSecondary} px-4 py-2 border-t ${dropdownBorder} mt-2`}>
                      Type to see more topics...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            disabled={loading || !topic.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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

        <div className="mt-3">
          <div className={`text-xs font-semibold ${textSecondary} mb-2`}>Quick searches:</div>
          <div className="flex flex-wrap gap-2">
            {searchSuggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-1 ${chipBg} ${chipHover} ${chipText} rounded-full text-xs font-medium transition-colors backdrop-blur-sm border ${chipBorder}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showSuggestions && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default Header;