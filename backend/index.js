import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🚀 DRDO Technology Intelligence API Running"));

// --- CONFIGURATION ---
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WORLD_NEWS_API_KEY = process.env.WORLD_NEWS_API_KEY;

if (!GEMINI_API_KEY || !WORLD_NEWS_API_KEY) {
    console.error("FATAL: API keys are not configured in the .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Global cache variables
let analysisResultsCache = null;
let newsArticlesCache = null;
let classifiedNewsCache = null;
let isAnalyzing = false;

// --- NEWS CLASSIFICATION LOGIC ---
function classifyNews(articles) {
    const classified = {
        trendingTopics: [],
        fundingAlerts: [],
        keyPlayers: []
    };

    // Keywords for classification
    const fundingKeywords = ['funding', 'investment', 'raised', 'venture', 'series', 'capital', 'billion', 'million', 'fund', 'investor', 'valuation', 'ipo', 'acquisition', 'merger'];
    const playerKeywords = ['company', 'startup', 'corporation', 'organization', 'announced', 'launched', 'partnership', 'collaboration', 'agreement', 'deal', 'contract', 'nvidia', 'intel', 'google', 'microsoft', 'amazon', 'openai', 'anthropic'];
    const trendingKeywords = ['breakthrough', 'innovation', 'advancement', 'technology', 'research', 'development', 'discovered', 'ai', 'quantum', 'semiconductor', 'autonomous', 'cybersecurity'];

    articles.forEach(article => {
        const titleLower = article.title.toLowerCase();
        const summaryLower = article.summary.toLowerCase();
        const combined = titleLower + ' ' + summaryLower;

        let fundingScore = 0;
        let playerScore = 0;
        let trendingScore = 0;

        // Calculate scores
        fundingKeywords.forEach(keyword => {
            if (combined.includes(keyword)) fundingScore++;
        });

        playerKeywords.forEach(keyword => {
            if (combined.includes(keyword)) playerScore++;
        });

        trendingKeywords.forEach(keyword => {
            if (combined.includes(keyword)) trendingScore++;
        });

        // Classify based on highest score
        if (fundingScore > playerScore && fundingScore > trendingScore && fundingScore > 0) {
            classified.fundingAlerts.push(article);
        } else if (playerScore > trendingScore && playerScore > 0) {
            classified.keyPlayers.push(article);
        } else {
            classified.trendingTopics.push(article);
        }
    });

    return classified;
}

// --- NEWS AGGREGATION LOGIC ---
async function aggregateNewsData() {
    const searchQueries = [
        "semiconductor manufacturing technology",
        "quantum computing breakthrough",
        "artificial intelligence defense",
        "government R&D funding technology",
        "biotechnology patent innovation",
        "emerging technology trends",
        "technology investment funding",
        "autonomous systems military",
        "cybersecurity AI",
        "hypersonic technology",
        "startup funding artificial intelligence",
        "tech company partnership",
        "nvidia AI investment",
        "quantum computing startup"
    ];
    
    const allArticles = [];

    console.log("📰 Fetching news from World News API...");

    // Fetch News from World News API
    for (const query of searchQueries) {
        try {
            const response = await axios.get("https://api.worldnewsapi.com/search-news", {
                params: { 
                    text: query, 
                    language: "en", 
                    number: 10,
                    'sort': 'publish-time',
                    'sort-direction': 'DESC'
                },
                headers: { "x-api-key": WORLD_NEWS_API_KEY }
            });
            
            if (response.data.news) {
                allArticles.push(
                    ...response.data.news.map(article => ({
                        id: article.id,
                        title: article.title,
                        summary: article.summary || article.text?.substring(0, 300) || "No summary available",
                        text: article.text || "",
                        url: article.url,
                        image: article.image,
                        publish_date: article.publish_date,
                        author: article.author || article.authors?.[0] || "Unknown",
                        source_type: "news",
                        category: query.split(' ')[0],
                        query: query
                    }))
                );
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`Error fetching news for "${query}":`, error.message);
        }
    }

    // Fetch Research Papers from Semantic Scholar
    console.log("📚 Fetching research papers from Semantic Scholar...");
    
    const researchQueries = [
        "artificial intelligence defense",
        "quantum computing",
        "semiconductor technology",
        "biotechnology innovation"
    ];

    for (const query of researchQueries) {
        try {
            const response = await axios.get(
                "https://api.semanticscholar.org/graph/v1/paper/search",
                {
                    params: {
                        query,
                        limit: 8,
                        fields: "title,abstract,authors,year,publicationDate,url,citationCount"
                    }
                }
            );
            
            if (response.data.data) {
                allArticles.push(
                    ...response.data.data.map(paper => ({
                        id: `paper_${Math.random().toString(36).substr(2, 9)}`,
                        title: paper.title,
                        summary: paper.abstract?.substring(0, 300) || "No abstract available",
                        text: paper.abstract || "",
                        url: paper.url,
                        image: null,
                        publish_date: paper.publicationDate || `${paper.year}-01-01`,
                        author: paper.authors?.map(a => a.name).join(", ") || "Unknown",
                        source_type: "research",
                        category: "Research",
                        citations: paper.citationCount,
                        query: query
                    }))
                );
            }
        } catch (error) {
            console.error(`Error fetching papers for "${query}":`, error.message);
        }
    }

    // Remove duplicates
    const uniqueArticles = [];
    const seenTitles = new Set();
    
    for (const article of allArticles) {
        const titleKey = article.title.toLowerCase().substring(0, 50);
        if (!seenTitles.has(titleKey)) {
            seenTitles.add(titleKey);
            uniqueArticles.push(article);
        }
    }

    console.log(`✅ Aggregated ${uniqueArticles.length} unique articles`);
    
    // Classify news
    const classified = classifyNews(uniqueArticles);
    console.log(`📊 Classified: ${classified.trendingTopics.length} trending, ${classified.fundingAlerts.length} funding, ${classified.keyPlayers.length} players`);
    
    return { all: uniqueArticles, classified };
}

// --- ANALYSIS LOGIC ---
async function analyzeWithGemini(articles) {
    const articlesForAnalysis = articles
        .map(article => ({
            title: article.title,
            summary: article.summary,
            category: article.category,
            source_type: article.source_type,
            publish_date: article.publish_date,
            text: article.text?.substring(0, 500) || ""
        }))
        .slice(0, 150);

    const prompt = `You are an advanced Technology Intelligence Analyst for DRDO (Defence Research and Development Organisation). 

Analyze the following aggregated data from news articles and research publications to provide comprehensive strategic intelligence.

DATA TO ANALYZE:
${JSON.stringify(articlesForAnalysis, null, 2)}

Provide a comprehensive JSON response with the following exact structure:

{
  "executiveSummary": {
    "overview": "Brief 2-3 sentence overview of the current technology landscape",
    "keyFindings": ["finding 1", "finding 2", "finding 3", "finding 4"],
    "strategicImplications": "Key strategic implications for defense and technology sectors"
  },
  "trendingTopics": [
    {
      "name": "Topic name",
      "momentum": 85,
      "description": "Brief description",
      "relevance": "high/medium/low",
      "geographySpread": {
        "primary": ["USA", "China"],
        "secondary": ["UK", "Japan"],
        "emerging": ["India", "South Korea"]
      },
      "regionalActivity": [
        {"region": "North America", "intensity": "High", "focus": "AI chip development"},
        {"region": "Asia-Pacific", "intensity": "Medium", "focus": "Manufacturing scale-up"}
      ]
    }
  ],
  "emergingTechnologies": [
    {
      "name": "Technology name",
      "momentum": 78,
      "fundingEstimate": 2.3,
      "patentCount": 1250,
      "maturityLevel": 35,
      "signalStrength": "Strong/Growing/Emerging/Weak",
      "description": "Detailed description",
      "applications": ["app1", "app2"]
    }
  ],
  "signalAnalysis": [
    {
      "signal": "Name of the signal (e.g., 'Energy reuse in AI chips')",
      "category": "Weak | Emerging | Growing | Mainstream",
      "momentumScore": 0-100,
      "potentialImpact": "Low | Medium | High | Critical",
      "timeToMainstreamEstimate": "e.g., '6-12 months', '2-5 years', '>10 years'",
      "description": "Concise explanation of what this signal is and why it matters",
      "keyIndicators": [
        "Specific event, investment, or research paper that supports this signal",
        "Another supporting data point or headline"
      ],
      "strategicImplication": "Why this matters for defense and research - opportunities or threats"
    }
  ],
  "marketGrowth": {
    "currentSize": 125,
    "forecastedSize2030": 575,
    "cagr": 29.3,
    "keyDrivers": ["driver1", "driver2"],
    "regionalBreakdown": [
      {"region": "North America", "share": 42.6, "growth": 28}
    ]
  },
  "keyPlayers": [
    {
      "name": "Organization name",
      "region": "Country/Region",
      "investmentAmount": 5000,
      "focusArea": "Focus description",
      "impactLevel": "Critical/High/Medium",
      "recentDevelopments": "Recent activities"
    }
  ],
  "fundingInvestment": {
    "totalFunding": 35.6,
    "quarterlyGrowth": 14.1,
    "topSectors": [
      {"sector": "AI & ML", "amount": 15.7, "growth": 23.5}
    ],
    "majorDeals": [
      {
        "company": "Company name",
        "amount": 500,
        "stage": "Series C",
        "sector": "Defense AI",
        "date": "Sep 2024"
      }
    ]
  },
  "rdInvestmentByCountry": [
    {
      "country": "USA",
      "amount": 89.5,
      "growthRate": 12.3,
      "focusAreas": ["AI", "Quantum"]
    }
  ],
  "geopoliticalInsights": {
    "tensions": ["US-China tech competition"],
    "cooperations": ["EU AI Alliance"],
    "keyDevelopments": ["CHIPS Act implementation"]
  }
}

IMPORTANT: 
- For each trending topic, analyze the article content to identify which countries/regions are mentioned or involved
- Categorize countries into primary (leading), secondary (significant activity), and emerging (growing interest)
- Include regional activity breakdown with intensity levels and specific focus areas
- Return ONLY valid JSON. No markdown, no explanations, just the JSON object.`;

    try {
        console.log("🤖 Sending data to Gemini for analysis...");
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const cleanedJson = text.replace(/^```json\s*|```\s*$/g, "").trim();
        const parsedData = JSON.parse(cleanedJson);
        
        console.log("✅ Analysis completed successfully");
        return parsedData;
    } catch (error) {
        console.error("❌ Error during Gemini analysis:", error.message);
        throw new Error("Failed to get analysis from AI: " + error.message);
    }
}

// --- API ROUTES ---

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "healthy",
        cacheStatus: analysisResultsCache ? "available" : "empty",
        newsCache: newsArticlesCache ? newsArticlesCache.length : 0,
        isAnalyzing: isAnalyzing
    });
});

// Trigger new analysis
app.post("/api/trigger-analysis", async (req, res) => {
    if (isAnalyzing) {
        return res.status(409).json({ 
            error: "Analysis already in progress. Please wait." 
        });
    }

    try {
        isAnalyzing = true;
        console.log("🔄 Starting new analysis...");
        
        const { all, classified } = await aggregateNewsData();
        
        if (all.length === 0) {
            throw new Error("No data could be aggregated from sources");
        }

        // Cache both all and classified news
        newsArticlesCache = all;
        classifiedNewsCache = classified;

        const analysisResults = await analyzeWithGemini(all);

        analysisResultsCache = {
            ...analysisResults,
            metadata: {
                lastUpdated: new Date().toISOString(),
                dataPointsAnalyzed: all.length,
                analysisVersion: "1.0"
            }
        };

        isAnalyzing = false;
        console.log("✅ Analysis complete and cached");

        res.status(200).json({
            message: "Analysis complete and results are ready.",
            data: analysisResultsCache
        });
    } catch (error) {
        isAnalyzing = false;
        console.error("❌ Analysis failed:", error.message);
        res.status(500).json({ 
            error: error.message,
            details: "Failed to complete analysis. Check server logs."
        });
    }
});

// Get cached analysis results
app.get("/api/analysis-results", (req, res) => {
    if (analysisResultsCache) {
        res.status(200).json({
            success: true,
            data: analysisResultsCache
        });
    } else {
        res.status(200).json({
            success: false,
            message: "No analysis results available. Please trigger a new analysis.",
            data: null
        });
    }
});

// Get classified news articles
app.get("/api/classified-news", (req, res) => {
    if (classifiedNewsCache) {
        res.status(200).json({
            success: true,
            data: classifiedNewsCache
        });
    } else {
        res.status(200).json({
            success: false,
            message: "No classified news available. Please run analysis first.",
            data: {
                trendingTopics: [],
                fundingAlerts: [],
                keyPlayers: []
            }
        });
    }
});

// Get news articles (original endpoint for compatibility)
app.get("/api/news-articles", (req, res) => {
    const { category, limit = 50 } = req.query;
    
    if (newsArticlesCache) {
        let filteredNews = newsArticlesCache;
        
        if (category && category !== 'all') {
            filteredNews = newsArticlesCache.filter(article => 
                article.category.toLowerCase().includes(category.toLowerCase())
            );
        }
        
        filteredNews.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
        
        res.status(200).json({
            success: true,
            total: filteredNews.length,
            data: filteredNews.slice(0, parseInt(limit))
        });
    } else {
        res.status(200).json({
            success: false,
            message: "No news articles available. Please run analysis first.",
            data: []
        });
    }
});

// Get analysis status
app.get("/api/analysis-status", (req, res) => {
    res.status(200).json({
        isAnalyzing: isAnalyzing,
        hasCache: !!analysisResultsCache,
        hasNews: !!newsArticlesCache,
        hasClassified: !!classifiedNewsCache,
        newsCount: newsArticlesCache?.length || 0,
        lastUpdated: analysisResultsCache?.metadata?.lastUpdated || null
    });
});

// Clear cache
app.delete("/api/cache", (req, res) => {
    analysisResultsCache = null;
    newsArticlesCache = null;
    classifiedNewsCache = null;
    res.status(200).json({ message: "Cache cleared successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ 
        error: "Internal server error",
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: "Endpoint not found",
        availableEndpoints: [
            "GET /api/health",
            "POST /api/trigger-analysis",
            "GET /api/analysis-results",
            "GET /api/classified-news",
            "GET /api/news-articles?category=<category>&limit=<number>",
            "GET /api/analysis-status",
            "DELETE /api/cache"
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API endpoints ready`);
    console.log(`🔍 Trigger analysis: POST http://localhost:${PORT}/api/trigger-analysis`);
    console.log(`📈 Get results: GET http://localhost:${PORT}/api/analysis-results`);
    console.log(`📰 Get classified news: GET http://localhost:${PORT}/api/classified-news`);
});