import express from "express";
import { 
    triggerAnalysis, 
    getAnalysisResults, 
    getAnalysisStatus 
} from "../controllers/analysisController.js";
import { 
    getClassifiedNews, 
    getNewsArticles 
} from "../controllers/newsController.js";
import { 
    clearCache, 
    getHealth 
} from "../controllers/cacheController.js";
import { getPatentsByBatch } from '../controllers/patentController.js';


const router = express.Router();
// Patents routes
router.get('/patents/:batch', getPatentsByBatch);

// Health check
router.get("/health", getHealth);

// Analysis routes
router.post("/trigger-analysis", triggerAnalysis);
router.get("/analysis-results", getAnalysisResults);
router.get("/analysis-status", getAnalysisStatus);

// News routes
router.get("/classified-news", getClassifiedNews);
router.get("/news-articles", getNewsArticles);

// Cache routes
router.delete("/cache", clearCache);

// 404 handler for API routes
router.use((req, res) => {
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

export default router;