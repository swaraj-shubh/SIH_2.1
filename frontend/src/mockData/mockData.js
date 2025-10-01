// Mock data for technologies
export const technologies = [
  {
    id: 1,
    name: 'Quantum Computing',
    domain: 'Computing',
    trl: 6,
    marketSize: '$1.2B',
    growthRate: '+25%',
    description: 'Advanced computing using quantum-mechanical phenomena',
    tags: ['Emerging', 'High-Potential', 'Government-Funded']
  },
  {
    id: 2,
    name: 'AI & Machine Learning',
    domain: 'Artificial Intelligence',
    trl: 8,
    marketSize: '$15.7B',
    growthRate: '+35%',
    description: 'Advanced algorithms and neural networks',
    tags: ['Mature', 'Rapid-Growth', 'Commercial']
  },
  {
    id: 3,
    name: 'Advanced Biotechnology',
    domain: 'Biotech',
    trl: 5,
    marketSize: '$8.9B',
    growthRate: '+18%',
    description: 'Genetic engineering and synthetic biology',
    tags: ['Emerging', 'Research-Intensive']
  }
];

// Mock chart data
export const dashboardCharts = {
  trlDistribution: {
    labels: ['TRL 1-3', 'TRL 4-6', 'TRL 7-9'],
    datasets: [
      {
        label: 'Technologies',
        data: [15, 45, 40],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
      }
    ]
  },
  marketForecast: {
    labels: ['2023', '2024', '2025', '2026'],
    datasets: [
      {
        label: 'Market Size ($B)',
        data: [45, 58, 72, 89],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }
    ]
  },
  // --- ADDED MISSING DATA ---
  domainDistribution: {
    labels: ['AI/ML', 'Quantum', 'Biotech', 'Materials', 'Energy'],
    datasets: [
      {
        label: 'Technologies by Domain',
        data: [35, 20, 18, 15, 12],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']
      }
    ]
  },
  emergingSignals: {
    labels: ['Weak Signals', 'Moderate Signals', 'Strong Signals', 'Breakthroughs'],
    datasets: [
        {
            label: 'Signal Strength',
            data: [65, 59, 80, 81],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
        }
    ]
  }
};

export const analyticsCharts = {
  sCurve: {
    labels: ['Research', 'Development', 'Growth', 'Maturity'],
    datasets: [
      {
        label: 'Adoption Rate',
        data: [10, 45, 75, 90],
        borderColor: '#8b5cf6'
      }
    ]
  },
  hypeCycle: {
    labels: ['Innovation', 'Peak', 'Trough', 'Slope', 'Plateau'],
    datasets: [
      {
        label: 'Expectations',
        data: [20, 85, 30, 50, 65],
        borderColor: '#f59e0b'
      }
    ]
  },
  // --- ADDED MISSING DATA ---
  trlProgression: {
    labels: ['2022', '2023', '2024', '2025 Est.'],
    datasets: [
      {
        label: 'Average TRL',
        data: [4.5, 5.1, 6.2, 6.8],
        borderColor: '#10b981'
      }
    ]
  },
  convergence: {
    labels: ['AI', 'IoT', 'Blockchain', '5G', 'Biotech', 'Nanotech'],
    datasets: [
      {
        label: 'Convergence with Quantum',
        data: [8, 7, 4, 6, 5, 7],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)'
      }
    ]
  },
  marketProjection: {
    labels: ['2025', '2027', '2030'],
    datasets: [
      {
        label: 'Projected Market Size ($B)',
        data: [1.8, 3.5, 7.2],
        backgroundColor: '#3b82f6'
      }
    ]
  },
  signalAnalysis: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Emerging Trend Signals',
        data: [120, 150, 135, 180],
        borderColor: '#8b5cf6'
      }
    ]
  }
};

// Mock patent data
export const patents = [
  {
    id: 1,
    title: 'Quantum Encryption Method',
    assignee: 'Quantum Tech Inc.',
    country: 'US',
    filingDate: '2023-01-15',
    technology: 'Quantum Computing'
  }
];

export const patentCharts = {
  trends: {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Patents Filed',
        data: [120, 185, 240, 310, 398],
        borderColor: '#3b82f6'
      }
    ]
  },
  // --- ADDED MISSING DATA ---
  countryDistribution: {
    labels: ['USA', 'China', 'EU', 'Japan', 'S. Korea'],
    datasets: [
      {
        label: 'Patents by Country',
        data: [42, 28, 15, 8, 7],
        backgroundColor: '#10b981'
      }
    ]
  },
  topAssignees: {
    labels: ['Quantum Inc.', 'Govt Labs', 'MegaCorp', 'Tech University'],
    datasets: [
      {
        label: 'Top Assignees',
        data: [35, 25, 20, 20],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }
    ]
  },
  technologyDistribution: {
    labels: ['Encryption', 'Hardware', 'Algorithms', 'Error Correction', 'Networking'],
    datasets: [
      {
        label: 'Patent Technology Focus',
        data: [9, 8, 6, 7, 5],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)'
      }
    ]
  }
};

// Table data
export const technologyTableData = technologies;
export const patentTableData = patents;


// Research Publications Mock Data
export const publications = [
  {
    id: 1,
    title: 'Advanced Quantum Computing Algorithms for Machine Learning',
    authors: ['Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Prof. Michael Chen'],
    journal: 'Nature Quantum Information',
    date: '2024-01-15',
    citations: 42,
    impact: 25.6,
    domain: 'Quantum Computing',
    abstract: 'This paper explores novel quantum algorithms...',
    link: 'https://example.com/paper1'
  },
  {
    id: 2,
    title: 'Synthetic Biology Approaches to Sustainable Energy',
    authors: ['Dr. Anjali Patel', 'Dr. James Wilson', 'Dr. Li Zhang'],
    journal: 'Science Advances',
    date: '2024-01-10',
    citations: 28,
    impact: 14.2,
    domain: 'Biotechnology',
    abstract: 'Innovative synthetic biology methods for biofuel production...',
    link: 'https://example.com/paper2'
  },
  {
    id: 3,
    title: 'Neuromorphic Computing with Memristor Crossbars',
    authors: ['Dr. Sanjay Gupta', 'Dr. Emily Roberts', 'Prof. Tanaka Hiroshi'],
    journal: 'IEEE Transactions on Neural Networks',
    date: '2024-01-05',
    citations: 35,
    impact: 8.7,
    domain: 'Advanced Computing',
    abstract: 'Hardware implementation of neural networks using memristor technology...',
    link: 'https://example.com/paper3'
  }
];

export const publicationCharts = {
  trends: {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Publications',
        data: [850, 920, 1100, 1250, 1420],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }
    ]
  },
  institutions: {
    labels: ['MIT', 'Stanford', 'IIT', 'Cambridge', 'ETH Zurich'],
    datasets: [
      {
        label: 'Publications',
        data: [245, 198, 156, 142, 128],
        backgroundColor: '#8b5cf6'
      }
    ]
  },
  domainDistribution: {
    labels: ['AI/ML', 'Quantum', 'Biotech', 'Materials', 'Energy'],
    datasets: [
      {
        label: 'Publications',
        data: [35, 20, 18, 15, 12],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']
      }
    ]
  },
  citationImpact: {
    labels: ['AI/ML', 'Quantum', 'Biotech', 'Materials', 'Energy', 'Robotics'],
    datasets: [
      {
        label: 'Citation Impact',
        data: [85, 92, 78, 65, 58, 72],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)'
      }
    ]
  },
  collaborationMap: {
    labels: ['Intra-Institute', 'National', 'International', 'Industry-Academia'],
    datasets: [
      {
        label: 'Collaboration Types',
        data: [25, 35, 28, 12],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)'
      }
    ]
  }
};

export const publicationTableData = publications;
