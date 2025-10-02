import { clearAllCache, getCache } from "../utils/cache.js";

export const clearCache = (req, res) => {
    clearAllCache();
    res.status(200).json({ message: "Cache cleared successfully" });
};

export const getHealth = (req, res) => {
    const { analysisResultsCache, newsArticlesCache, isAnalyzing } = getCache();
    
    res.status(200).json({ 
        status: "healthy",
        cacheStatus: analysisResultsCache ? "available" : "empty",
        newsCache: newsArticlesCache ? newsArticlesCache.length : 0,
        isAnalyzing: isAnalyzing
    });
};