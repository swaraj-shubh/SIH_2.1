// backend/services/advancedAnalyticsService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { GEMINI_API_KEY, WORLD_NEWS_API_KEY, LENS_API_KEY, LENS_API_URL } from "../config/index.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateRelatedKeywords(topic) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const prompt = `Given the technology topic: "${topic}"

Generate 8-12 highly relevant search keywords and phrases that would help find:
1. Latest news articles about this technology
2. Recent patents in this domain
3. Research publications

Return ONLY a JSON array of keyword strings. No explanations, just the array.
Example format: ["keyword1", "keyword phrase 2", "keyword3"]

Focus on:
- Technical terms and variants
- Related technologies
- Application domains
- Key industry terms`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        const cleanedText = text.replace(/^```json\s*|```\s*$/g, "").trim();
        const keywords = JSON.parse(cleanedText);
        
        return keywords.slice(0, 12);
    } catch (error) {
        console.error("Error generating keywords:", error.message);
        return [topic]; // Fallback to original topic
    }
}

export async function fetchNewsForKeywords(keywords) {
    const allArticles = [];
    const maxPerKeyword = 5;

    for (const keyword of keywords.slice(0, 5)) {
        try {
            const response = await axios.get("https://api.worldnewsapi.com/search-news", {
                params: { 
                    text: keyword, 
                    language: "en", 
                    number: maxPerKeyword,
                    'sort': 'publish-time',
                    'sort-direction': 'DESC'
                },
                headers: { "x-api-key": WORLD_NEWS_API_KEY }
            });
            
            if (response.data.news) {
                allArticles.push(...response.data.news.map(article => ({
                    id: article.id,
                    title: article.title,
                    summary: article.summary || article.text?.substring(0, 300) || "",
                    text: article.text || "",
                    url: article.url,
                    image: article.image,
                    publish_date: article.publish_date,
                    author: article.author || article.authors?.[0] || "Unknown",
                    source: article.source_country || "Unknown",
                    relevanceScore: calculateRelevance(article, keywords)
                })));
            }
            
            await new Promise(resolve => setTimeout(resolve, 600));
        } catch (error) {
            console.error(`Error fetching news for "${keyword}":`, error.message);
        }
    }

    const unique = Array.from(new Map(allArticles.map(a => [a.title, a])).values());
    return unique.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
}

export async function fetchPatentsForKeywords(keywords) {
    const allPatents = [];
    
    try {
        const currentDate = new Date();
        const twoYearsAgo = new Date(currentDate);
        twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);
        const dateThreshold = twoYearsAgo.toISOString().split('T')[0];

        console.log('=== Patent Search Debug ===');
        console.log('Keywords:', keywords.slice(0, 5));
        console.log('Date threshold:', dateThreshold);

        const requestBody = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "bool": {
                                "should": [
                                    ...keywords.slice(0, 5).map(kw => ({
                                        "match": { "title": { "query": kw, "boost": 2 } }
                                    })),
                                    ...keywords.slice(0, 5).map(kw => ({
                                        "match": { "abstract": { "query": kw } }
                                    }))
                                ],
                                "minimum_should_match": 1
                            }
                        }
                    ],
                    "filter": [
                        {
                            "range": {
                                "date_published": { "gte": dateThreshold }
                            }
                        }
                    ]
                }
            },
            "size": 100,
            "sort": [{ "date_published": "desc" }],
            // ✅ Fixed: removed invalid top-level fields "title" and "parties"
            "include": [
                "lens_id",
                "date_published",
                "abstract.text",
                "biblio.invention_title.text",
                "biblio.publication_reference",
                "biblio.parties.applicants",
                "biblio.parties.inventors"
            ]
        };

        const apiUrl = new URL(LENS_API_URL);
        apiUrl.pathname = '/patent/search';

        console.log('API URL:', apiUrl.toString());
        console.log('Request Body:', JSON.stringify(requestBody, null, 2));

        const config = {
            headers: {
                'Authorization': `Bearer ${LENS_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        };

        const response = await axios.post(apiUrl.toString(), requestBody, config);
        
        console.log('=== Patent Response ===');
        console.log('Status:', response.status);
        console.log('Total patents found:', response.data?.total || 0);
        console.log('Patents returned:', response.data?.data?.length || 0);
        
        if (response.data && response.data.data) {
            allPatents.push(...response.data.data.map(patent => {
                const title = patent.biblio?.invention_title?.[0]?.text || "No title";
                const abstractText = patent.abstract?.[0]?.text || "No abstract";

                const applicants = (patent.biblio?.parties?.applicants || [])
                    .map(a => a.extracted_name || a.name || "")
                    .filter(Boolean)
                    .join(", ") || "Unknown";

                const inventors = (patent.biblio?.parties?.inventors || [])
                    .map(i => i.extracted_name || i.name || "")
                    .filter(Boolean)
                    .join(", ") || "Unknown";

                const jurisdiction = patent.biblio?.publication_reference?.jurisdiction || "Unknown";

                return {
                    id: patent.lens_id,
                    title,
                    abstract: abstractText,
                    publishDate: patent.date_published,
                    applicants,
                    inventors,
                    jurisdiction,
                    relevanceScore: calculateRelevance({ title, text: abstractText }, keywords)
                };
            }));
        }
    } catch (error) {
        console.error("=== Patent Fetch Error ===");
        console.error("Error message:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response data:", JSON.stringify(error.response.data, null, 2));
        }
    }

    return allPatents.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function calculateRelevance(item, keywords) {
    const text = `${item.title} ${item.summary || item.text || ""}`.toLowerCase();
    let score = 0;
    
    keywords.forEach(keyword => {
        const kw = keyword.toLowerCase();
        const titleMatches = (item.title?.toLowerCase().match(new RegExp(kw, 'g')) || []).length;
        const textMatches = (text.match(new RegExp(kw, 'g')) || []).length;
        
        score += titleMatches * 3 + textMatches;
    });
    
    return score;
}

export async function performAdvancedAnalysis(data) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const analysisData = {
        topic: data.topic,
        keywords: data.keywords,
        recentNews: data.newsArticles.slice(0, 30).map(a => ({
            title: a.title,
            date: a.publish_date,
            summary: a.summary?.substring(0, 200)
        })),
        recentPatents: data.patents.slice(0, 200).map(p => ({
            title: p.title,
            date: p.publishDate,
            abstract: p.abstract?.substring(0, 200)
        }))
    };

    const prompt = `You are an expert technology analyst. Analyze the following data about "${data.topic}" and provide comprehensive analytics.

DATA:
${JSON.stringify(analysisData, null, 2)}

Provide a JSON response with this EXACT structure:

{
  "trlProgression": {
    "currentLevel": 7,
    "levelDescription": "Description of current TRL",
    "evidence": ["Evidence point 1", "Evidence point 2"],
    "timeline": [
      {"year": 2020, "level": 4, "milestone": "Lab prototype"},
      {"year": 2022, "level": 6, "milestone": "Pilot testing"},
      {"year": 2024, "level": 7, "milestone": "Field deployment"}
    ]
  },
  "sCurveData": {
    "phase": "Growth/Maturity/Decline",
    "adoptionRate": 45,
    "dataPoints": [
      {"date": "2020-01", "cumulative": 5},
      {"date": "2021-01", "cumulative": 25},
      {"date": "2022-01", "cumulative": 65},
      {"date": "2023-01", "cumulative": 120},
      {"date": "2024-01", "cumulative": 180}
    ],
    "analysis": "Current adoption phase analysis"
  },
  "hypeCycle": {
    "currentPhase": "Innovation Trigger | Peak of Inflated Expectations | Trough of Disillusionment | Slope of Enlightenment | Plateau of Productivity",
    "visibility": 75,
    "maturity": 45,
    "timeToMainstream": "2-5 years",
    "analysis": "Current position in hype cycle"
  },
  "marketAnalysis": {
    "currentSize": 15.5,
    "projectedSize2030": 87.3,
    "cagr": 31.2,
    "growthDrivers": ["Driver 1", "Driver 2"],
    "regionalBreakdown": [
      {"region": "North America", "share": 42, "growth": 28},
      {"region": "Asia Pacific", "share": 35, "growth": 35}
    ],
    "keyPlayers": ["Company 1", "Company 2"],
    "marketTrends": ["Trend 1", "Trend 2"]
  },
  "signalAnalysis": {
    "signals": [
      {
        "name": "Signal name",
        "strength": "Weak/Emerging/Strong/Dominant",
        "momentum": 65,
        "description": "What this signal indicates",
        "implications": "Strategic implications",
        "timeframe": "Near-term/Mid-term/Long-term"
      }
    ],
    "emergingPatterns": ["Pattern 1", "Pattern 2"],
    "disruptivePotential": "Low/Medium/High/Critical"
  },
  "convergenceDetection": {
    "convergingTechnologies": [
      {
        "name": "Technology name",
        "synergy": "Description of synergy",
        "applications": ["Application 1", "Application 2"],
        "maturity": 60
      }
    ],
    "crossSectorImpact": ["Sector 1", "Sector 2"],
    "integrationOpportunities": ["Opportunity 1", "Opportunity 2"]
  },
  "strategicInsights": {
    "opportunities": ["Opportunity 1", "Opportunity 2"],
    "threats": ["Threat 1", "Threat 2"],
    "recommendations": ["Recommendation 1", "Recommendation 2"],
    "investmentAreas": ["Area 1", "Area 2"]
  }
}

Base your analysis on:
1. Patent filing trends and technological advancement evidence
2. News coverage patterns and sentiment
3. Timeline of developments
4. Market activity and investment patterns

Return ONLY valid JSON. No markdown, no code blocks, just the JSON object.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        
        const cleanedJson = text.replace(/^```json\s*|```\s*$/g, "").trim();
        const analysis = JSON.parse(cleanedJson);
        
        return analysis;
    } catch (error) {
        console.error("Error in advanced analysis:", error.message);
        throw new Error("Failed to generate analysis: " + error.message);
    }
}
