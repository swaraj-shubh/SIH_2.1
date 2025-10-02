export const dashboardData = {
  stats: [
    {
      label: "Total Technologies",
      value: "1,234",
      trend: 12,
      icon: "🔬",
      color: "bg-blue-100 text-blue-600"
    },
    {
      label: "Active Patents",
      value: "8,567",
      trend: 8,
      icon: "📑",
      color: "bg-green-100 text-green-600"
    },
    {
      label: "Research Publications",
      value: "23,456",
      trend: 15,
      icon: "📚",
      color: "bg-purple-100 text-purple-600"
    },
    {
      label: "TRL 7+ Technologies",
      value: "289",
      trend: 5,
      icon: "🚀",
      color: "bg-orange-100 text-orange-600"
    }
  ],
  technologies: [
    {
      id: 1,
      name: "Quantum Encryption",
      description: "Quantum-resistant cryptographic systems for secure communications",
      trl: 6,
      patents: 123,
      publications: 234,
      marketSize: "$1.2B",
      growthRate: 42,
      tags: ["Quantum", "Cybersecurity", "Encryption"]
    },
    {
      id: 2,
      name: "Synthetic Biology",
      description: "Engineered biological systems for defense and security applications",
      trl: 5,
      patents: 87,
      publications: 156,
      marketSize: "$0.9B",
      growthRate: 35,
      tags: ["Biotechnology", "Defense", "Engineering"]
    }
  ]
};

export const recentUpdates = [
  {
    type: "alert",
    title: "Breakthrough in Quantum Computing",
    description: "New research shows 50% improvement in quantum error correction",
    timestamp: "2 hours ago"
  },
  {
    type: "update",
    title: "Patent Filed for Advanced Materials",
    description: "DRDO laboratory files patent for new composite material",
    timestamp: "5 hours ago"
  },
  {
    type: "alert",
    title: "Emerging Technology Detected",
    description: "AI system detected new convergence in AI and biotechnology",
    timestamp: "1 day ago"
  },
  {
    type: "update",
    title: "Market Analysis Updated",
    description: "Latest market trends for cybersecurity technologies available",
    timestamp: "2 days ago"
  }
];