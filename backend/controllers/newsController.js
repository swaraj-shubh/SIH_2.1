import { getCache } from "../utils/cache.js";

export const getClassifiedNews = (req, res) => {
    const { classifiedNewsCache } = getCache();
    
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
};

export const getNewsArticles = (req, res) => {
    const { category, limit = 50 } = req.query;
    const { newsArticlesCache } = getCache();
    
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
};