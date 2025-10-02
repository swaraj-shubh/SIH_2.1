import { CLASSIFICATION_KEYWORDS } from "../utils/constants.js";

export function classifyNews(articles) {
    const classified = {
        trendingTopics: [],
        fundingAlerts: [],
        keyPlayers: []
    };

    articles.forEach(article => {
        const titleLower = article.title.toLowerCase();
        const summaryLower = article.summary.toLowerCase();
        const combined = titleLower + ' ' + summaryLower;

        let fundingScore = 0;
        let playerScore = 0;
        let trendingScore = 0;

        // Calculate scores
        CLASSIFICATION_KEYWORDS.funding.forEach(keyword => {
            if (combined.includes(keyword)) fundingScore++;
        });

        CLASSIFICATION_KEYWORDS.players.forEach(keyword => {
            if (combined.includes(keyword)) playerScore++;
        });

        CLASSIFICATION_KEYWORDS.trending.forEach(keyword => {
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