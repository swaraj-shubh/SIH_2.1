// backend/controllers/advancedAnalyticsController.js
import { 
    generateRelatedKeywords,
    fetchNewsForKeywords,
    fetchPatentsForKeywords,
    performAdvancedAnalysis 
} from "../services/advancedAnalyticsService.js";
import { 
    setAdvancedAnalysisCache, 
    getAdvancedAnalysisCache,
    setAnalyzingStatusAdvanced 
} from "../utils/advancedCache.js";

export const searchAndAnalyzeTopic = async (req, res) => {
    const { topic } = req.body;
    
    if (!topic || topic.trim().length === 0) {
        return res.status(400).json({ 
            error: "Topic is required" 
        });
    }

    const cachedResult = getAdvancedAnalysisCache(topic);
    if (cachedResult) {
        return res.status(200).json({
            message: "Returning cached analysis",
            data: cachedResult,
            cached: true
        });
    }

    try {
        setAnalyzingStatusAdvanced(true);
        console.log(`🔍 Starting advanced analysis for topic: "${topic}"`);
        
        // Step 1: Generate related keywords using Gemini
        console.log("🤖 Generating related keywords...");
        const keywords = await generateRelatedKeywords(topic);
        console.log(`✅ Generated ${keywords.length} keywords:`, keywords);

        // Step 2: Fetch news articles
        console.log("📰 Fetching news articles...");
        const newsArticles = await fetchNewsForKeywords([topic, ...keywords]);
        console.log(`✅ Fetched ${newsArticles.length} news articles`);

        // Step 3: Fetch patents
        console.log("📜 Fetching patents...");
        const patents = await fetchPatentsForKeywords([topic, ...keywords]);
        console.log(`✅ Fetched ${patents.length} patents`);

        // Step 4: Perform advanced analysis with Gemini
        console.log("📊 Performing advanced analysis...");
        const analysisResults = await performAdvancedAnalysis({
            topic,
            keywords,
            newsArticles,
            patents
        });

        const finalResult = {
            topic,
            keywords,
            metadata: {
                analyzedAt: new Date().toISOString(),
                newsCount: newsArticles.length,
                patentCount: patents.length
            },
            newsArticles: newsArticles.slice(0, 20), // Top 20 most recent
            patents: patents.slice(0, 20), // Top 20 most relevant
            analysis: analysisResults
        };

        setAdvancedAnalysisCache(topic, finalResult);
        setAnalyzingStatusAdvanced(false);
        
        console.log("✅ Advanced analysis complete");

        res.status(200).json({
            message: "Analysis complete",
            data: finalResult,
            cached: false
        });

    } catch (error) {
        setAnalyzingStatusAdvanced(false);
        console.error("❌ Advanced analysis failed:", error.message);
        res.status(500).json({ 
            error: error.message,
            details: "Failed to complete advanced analysis"
        });
    }
};

export const getAnalysisHistory = (req, res) => {
    const { getAllCachedTopics } = require("../utils/advancedCache.js");
    const history = getAllCachedTopics();
    
    res.status(200).json({
        success: true,
        count: history.length,
        topics: history
    });
};