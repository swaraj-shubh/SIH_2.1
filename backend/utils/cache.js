// Global cache variables
export let analysisResultsCache = null;
export let newsArticlesCache = null;
export let classifiedNewsCache = null;
export let isAnalyzing = false;

export const setAnalysisCache = (analysis, news, classified) => {
    analysisResultsCache = analysis;
    newsArticlesCache = news;
    classifiedNewsCache = classified;
};

export const setAnalyzingStatus = (status) => {
    isAnalyzing = status;
};

export const clearAllCache = () => {
    analysisResultsCache = null;
    newsArticlesCache = null;
    classifiedNewsCache = null;
    isAnalyzing = false;
};

export const getCache = () => ({
    analysisResultsCache,
    newsArticlesCache,
    classifiedNewsCache,
    isAnalyzing
});