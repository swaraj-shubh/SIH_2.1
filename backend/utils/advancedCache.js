// backend/utils/advancedCache.js

// Cache structure: Map of topic -> analysis results
const advancedAnalysisCache = new Map();
let isAnalyzingAdvanced = false;

// Cache expiry: 24 hours
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

export const setAdvancedAnalysisCache = (topic, data) => {
    const cacheEntry = {
        data,
        timestamp: Date.now()
    };
    advancedAnalysisCache.set(topic.toLowerCase(), cacheEntry);
    
    // Limit cache size to 50 topics
    if (advancedAnalysisCache.size > 50) {
        const firstKey = advancedAnalysisCache.keys().next().value;
        advancedAnalysisCache.delete(firstKey);
    }
};

export const getAdvancedAnalysisCache = (topic) => {
    const cacheEntry = advancedAnalysisCache.get(topic.toLowerCase());
    
    if (!cacheEntry) {
        return null;
    }
    
    // Check if cache has expired
    const age = Date.now() - cacheEntry.timestamp;
    if (age > CACHE_EXPIRY_MS) {
        advancedAnalysisCache.delete(topic.toLowerCase());
        return null;
    }
    
    return cacheEntry.data;
};

export const setAnalyzingStatusAdvanced = (status) => {
    isAnalyzingAdvanced = status;
};

export const getAnalyzingStatusAdvanced = () => {
    return isAnalyzingAdvanced;
};

export const clearAdvancedCache = () => {
    advancedAnalysisCache.clear();
    isAnalyzingAdvanced = false;
};

export const getAllCachedTopics = () => {
    const topics = [];
    for (const [topic, entry] of advancedAnalysisCache.entries()) {
        topics.push({
            topic,
            analyzedAt: new Date(entry.timestamp).toISOString(),
            newsCount: entry.data.metadata?.newsCount || 0,
            patentCount: entry.data.metadata?.patentCount || 0
        });
    }
    return topics.sort((a, b) => new Date(b.analyzedAt) - new Date(a.analyzedAt));
};