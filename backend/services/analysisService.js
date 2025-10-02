import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, geminiConfig } from "../config/index.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: geminiConfig.model });

export async function analyzeWithGemini(articles) {
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