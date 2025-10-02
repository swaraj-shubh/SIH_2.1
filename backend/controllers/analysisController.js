import { aggregateNewsData } from "../services/newsService.js";
import { analyzeWithGemini } from "../services/analysisService.js";
import { 
    setAnalysisCache, 
    setAnalyzingStatus, 
    getCache 
} from "../utils/cache.js";

export const triggerAnalysis = async (req, res) => {
    const { isAnalyzing } = getCache();
    
    if (isAnalyzing) {
        return res.status(409).json({ 
            error: "Analysis already in progress. Please wait." 
        });
    }

    try {
        setAnalyzingStatus(true);
        console.log("🔄 Starting new analysis...");
        
        const { all, classified } = await aggregateNewsData();
        
        if (all.length === 0) {
            throw new Error("No data could be aggregated from sources");
        }

        const analysisResults = await analyzeWithGemini(all);

        const analysisWithMetadata = {
            ...analysisResults,
            metadata: {
                lastUpdated: new Date().toISOString(),
                dataPointsAnalyzed: all.length,
                analysisVersion: "1.0"
            }
        };

        setAnalysisCache(analysisWithMetadata, all, classified);
        setAnalyzingStatus(false);
        
        console.log("✅ Analysis complete and cached");

        res.status(200).json({
            message: "Analysis complete and results are ready.",
            data: analysisWithMetadata
        });
    } catch (error) {
        setAnalyzingStatus(false);
        console.error("❌ Analysis failed:", error.message);
        res.status(500).json({ 
            error: error.message,
            details: "Failed to complete analysis. Check server logs."
        });
    }
};

export const getAnalysisResults = (req, res) => {
    const { analysisResultsCache } = getCache();
    
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
};

export const getAnalysisStatus = (req, res) => {
    const { isAnalyzing, analysisResultsCache, newsArticlesCache, classifiedNewsCache } = getCache();
    
    res.status(200).json({
        isAnalyzing: isAnalyzing,
        hasCache: !!analysisResultsCache,
        hasNews: !!newsArticlesCache,
        hasClassified: !!classifiedNewsCache,
        newsCount: newsArticlesCache?.length || 0,
        lastUpdated: analysisResultsCache?.metadata?.lastUpdated || null
    });
};