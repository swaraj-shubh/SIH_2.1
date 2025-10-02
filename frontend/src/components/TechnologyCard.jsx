import React from 'react';

const TechnologyCard = ({ technology }) => {
  const getTRLColor = (trl) => {
    const colors = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-red-200 text-red-800',
      3: 'bg-orange-100 text-orange-800',
      4: 'bg-orange-200 text-orange-800',
      5: 'bg-yellow-100 text-yellow-800',
      6: 'bg-yellow-200 text-yellow-800',
      7: 'bg-green-100 text-green-800',
      8: 'bg-green-200 text-green-800',
      9: 'bg-green-300 text-green-800',
    };
    return colors[trl] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{technology.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTRLColor(technology.trl)}`}>
            TRL {technology.trl}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{technology.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Patents</span>
            <span className="font-medium">{technology.patents}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Publications</span>
            <span className="font-medium">{technology.publications}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Market Size</span>
            <span className="font-medium">{technology.marketSize}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Growth Rate</span>
            <span className={`font-medium ${technology.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {technology.growthRate}%
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-1">
            {technology.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyCard;