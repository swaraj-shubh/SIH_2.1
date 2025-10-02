import axios from "axios";
import { WORLD_NEWS_API_KEY } from "../config/index.js";
import { SEARCH_QUERIES, RESEARCH_QUERIES } from "../utils/constants.js";
import { classifyNews } from "./classificationService.js";

export async function aggregateNewsData() {
    const allArticles = [];

    console.log("📰 Fetching news from World News API...");

    // Fetch News from World News API
    for (const query of SEARCH_QUERIES) {
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

    for (const query of RESEARCH_QUERIES) {
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