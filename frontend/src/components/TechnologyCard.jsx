import React from 'react';

const TechnologyCard = ({ technology, detailed = false }) => {
  const getTrlColor = (trl) => {
    if (trl >= 7) return '#10b981';
    if (trl >= 4) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="technology-card">
      <div className="tech-header">
        <h3>{technology.name}</h3>
        <span className="domain-tag">{technology.domain}</span>
      </div>
      
      <div className="tech-metrics">
        <div className="metric">
          <span className="metric-label">TRL</span>
          <div className="trl-indicator">
            <div 
              className="trl-progress" 
              style={{ 
                width: `${(technology.trl / 9) * 100}%`,
                backgroundColor: getTrlColor(technology.trl)
              }}
            ></div>
            <span className="trl-value">{technology.trl}/9</span>
          </div>
        </div>
        
        <div className="metric">
          <span className="metric-label">Market Size</span>
          <span className="metric-value">{technology.marketSize}</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Growth Rate</span>
          <span className="metric-value positive">{technology.growthRate}</span>
        </div>
      </div>

      {detailed && (
        <div className="tech-details">
          <p className="tech-description">{technology.description}</p>
          <div className="tech-tags">
            {technology.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div className="tech-actions">
        <button className="btn-primary">View Details</button>
        <button className="btn-secondary">Track</button>
      </div>
    </div>
  );
};

export default TechnologyCard;