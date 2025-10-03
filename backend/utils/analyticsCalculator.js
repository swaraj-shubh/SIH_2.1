// backend/utils/analyticsCalculator.js
/**
 * This module calculates REAL analytics from actual news and patent data
 * instead of relying on AI to fabricate numbers
 */

/**
 * Calculate S-Curve data from real news and patent activity over time
 */
export function calculateSCurveData(newsArticles, patents) {
    // Combine all items with dates
    const allItems = [
        ...newsArticles.map(n => ({ date: n.publish_date, type: 'news' })),
        ...patents.map(p => ({ date: p.publishDate, type: 'patent' }))
    ].filter(item => item.date);

    // Group by month and count cumulative activity
    const monthlyData = {};
    
    allItems.forEach(item => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { news: 0, patents: 0, total: 0 };
        }
        
        monthlyData[monthKey][item.type === 'news' ? 'news' : 'patents']++;
        monthlyData[monthKey].total++;
    });

    // Sort by date and calculate cumulative
    const sortedMonths = Object.keys(monthlyData).sort();
    let cumulative = 0;
    
    const dataPoints = sortedMonths.map(month => {
        cumulative += monthlyData[month].total;
        return {
            date: month,
            cumulative,
            monthly: monthlyData[month].total,
            news: monthlyData[month].news,
            patents: monthlyData[month].patents
        };
    });

    // Determine phase based on trend
    const phase = determineSCurvePhase(dataPoints);
    const adoptionRate = calculateAdoptionRate(dataPoints);

    return {
        phase,
        adoptionRate,
        dataPoints,
        analysis: generateSCurveAnalysis(phase, dataPoints)
    };
}

function determineSCurvePhase(dataPoints) {
    if (dataPoints.length < 6) return "Early/Emerging";

    // Calculate growth rate over last 6 months vs previous 6 months
    const recentMonths = dataPoints.slice(-6);
    const previousMonths = dataPoints.slice(-12, -6);

    const recentGrowth = recentMonths[recentMonths.length - 1]?.cumulative - recentMonths[0]?.cumulative;
    const previousGrowth = previousMonths.length > 0 
        ? previousMonths[previousMonths.length - 1]?.cumulative - previousMonths[0]?.cumulative 
        : 0;

    const growthAcceleration = previousGrowth > 0 ? (recentGrowth / previousGrowth) : 1;

    // Classify phase
    if (growthAcceleration > 1.5) return "Growth";
    if (growthAcceleration > 0.8) return "Maturity";
    if (growthAcceleration < 0.8) return "Decline";
    return "Growth";
}

function calculateAdoptionRate(dataPoints) {
    if (dataPoints.length < 2) return 0;

    const recent = dataPoints.slice(-3);
    const avgMonthlyActivity = recent.reduce((sum, d) => sum + d.monthly, 0) / recent.length;
    
    // Normalize to 0-100 scale (assuming 50+ articles/patents per month = 100)
    return Math.min(100, Math.round((avgMonthlyActivity / 50) * 100));
}

function generateSCurveAnalysis(phase, dataPoints) {
    const totalActivity = dataPoints[dataPoints.length - 1]?.cumulative || 0;
    const recentTrend = dataPoints.slice(-3).map(d => d.monthly).reduce((a, b) => a + b, 0) / 3;

    return `The technology is in the ${phase} phase with ${totalActivity} total mentions over the past year. ` +
           `Recent average monthly activity: ${Math.round(recentTrend)} items.`;
}

/**
 * Calculate Hype Cycle position from real visibility and maturity indicators
 */
export function calculateHypeCyclePosition(newsArticles, patents) {
    // Calculate visibility from news volume trends
    const visibility = calculateVisibilityScore(newsArticles);
    
    // Calculate maturity from patent progression and commercial indicators
    const maturity = calculateMaturityScore(patents, newsArticles);
    
    // Determine phase based on visibility and maturity
    const currentPhase = determineHypeCyclePhase(visibility, maturity);
    
    // Estimate time to mainstream based on maturity
    const timeToMainstream = estimateTimeToMainstream(maturity, patents);

    return {
        currentPhase,
        visibility,
        maturity,
        timeToMainstream,
        analysis: generateHypeCycleAnalysis(currentPhase, visibility, maturity)
    };
}

function calculateVisibilityScore(newsArticles) {
    if (newsArticles.length === 0) return 10;

    // Analyze news volume trend over past year
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

    const recentNews = newsArticles.filter(n => new Date(n.publish_date) > threeMonthsAgo).length;
    const olderNews = newsArticles.filter(n => {
        const date = new Date(n.publish_date);
        return date > sixMonthsAgo && date <= threeMonthsAgo;
    }).length;

    // Calculate trend
    const trend = olderNews > 0 ? recentNews / olderNews : 1;
    
    // Normalize: high recent activity + growing trend = high visibility
    const baseScore = Math.min(100, (recentNews / 20) * 100);
    const trendBonus = trend > 1.5 ? 20 : (trend > 1 ? 10 : 0);
    
    return Math.min(95, Math.round(baseScore + trendBonus));
}

function calculateMaturityScore(patents, newsArticles) {
    if (patents.length === 0) return 15;

    // Analyze patent progression and commercial indicators
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Recent patents indicate active development
    const recentPatents = patents.filter(p => new Date(p.publishDate) > oneYearAgo).length;
    
    // Look for commercial indicators in news (funding, product launches, deployments)
    const commercialKeywords = ['funding', 'investment', 'launch', 'deploy', 'commercial', 'production', 'market'];
    const commercialNews = newsArticles.filter(article => {
        const text = `${article.title} ${article.summary}`.toLowerCase();
        return commercialKeywords.some(kw => text.includes(kw));
    }).length;

    // Maturity score: patents show technical progress, commercial news shows market readiness
    const patentScore = Math.min(50, (recentPatents / 15) * 50);
    const commercialScore = Math.min(50, (commercialNews / 10) * 50);
    
    return Math.min(85, Math.round(patentScore + commercialScore));
}

function determineHypeCyclePhase(visibility, maturity) {
    // Map visibility/maturity to Gartner Hype Cycle phases
    if (visibility < 30 && maturity < 30) {
        return "Innovation Trigger";
    } else if (visibility > 60 && maturity < 40) {
        return "Peak of Inflated Expectations";
    } else if (visibility < 40 && maturity < 50) {
        return "Trough of Disillusionment";
    } else if (visibility > 40 && maturity > 40 && maturity < 70) {
        return "Slope of Enlightenment";
    } else if (maturity > 70) {
        return "Plateau of Productivity";
    }
    
    return "Slope of Enlightenment"; // Default
}

function estimateTimeToMainstream(maturity, patents) {
    // Based on patent activity and maturity level
    if (maturity < 30) return "5-10 years";
    if (maturity < 50) return "3-5 years";
    if (maturity < 70) return "2-3 years";
    return "Less than 2 years";
}

function generateHypeCycleAnalysis(phase, visibility, maturity) {
    const analyses = {
        "Innovation Trigger": "Early stage with emerging visibility. Technology is in research/prototype phase.",
        "Peak of Inflated Expectations": "High media attention but limited commercial maturity. Expect market correction.",
        "Trough of Disillusionment": "Media attention declining as reality sets in. Critical development period.",
        "Slope of Enlightenment": "Growing maturity with realistic expectations. Commercial applications emerging.",
        "Plateau of Productivity": "Mature technology with established market presence and proven use cases."
    };

    return analyses[phase] + ` Current visibility: ${visibility}%, Maturity: ${maturity}%.`;
}

/**
 * Calculate TRL progression from patent evidence
 */
export function calculateTRLProgression(patents, newsArticles) {
    // Analyze patents for TRL indicators
    const trlIndicators = analyzeTRLIndicators(patents, newsArticles);
    
    // Estimate current TRL
    const currentLevel = estimateCurrentTRL(trlIndicators);
    
    // Build timeline from patent dates
    const timeline = buildTRLTimeline(patents, newsArticles);
    
    return {
        currentLevel,
        levelDescription: getTRLDescription(currentLevel),
        evidence: trlIndicators.evidence,
        timeline
    };
}

function analyzeTRLIndicators(patents, newsArticles) {
    const indicators = {
        level: 1,
        evidence: [],
        hasPrototype: false,
        hasPilot: false,
        hasCommercial: false
    };

    // Keywords indicating different TRL levels
    const prototypeKeywords = ['prototype', 'demonstration', 'proof of concept', 'laboratory'];
    const pilotKeywords = ['pilot', 'trial', 'test', 'validation', 'field test'];
    const commercialKeywords = ['commercial', 'production', 'deployment', 'manufacturing', 'market'];

    const allText = [
        ...patents.map(p => `${p.title} ${p.abstract}`.toLowerCase()),
        ...newsArticles.map(n => `${n.title} ${n.summary}`.toLowerCase())
    ].join(' ');

    // Check for indicators
    if (prototypeKeywords.some(kw => allText.includes(kw))) {
        indicators.hasPrototype = true;
        indicators.evidence.push("Evidence of prototype development in patents/news");
    }

    if (pilotKeywords.some(kw => allText.includes(kw))) {
        indicators.hasPilot = true;
        indicators.evidence.push("Pilot programs or field testing mentioned");
    }

    if (commercialKeywords.some(kw => allText.includes(kw))) {
        indicators.hasCommercial = true;
        indicators.evidence.push("Commercial deployment or production indicators");
    }

    // Patent count indicates development activity
    if (patents.length > 20) {
        indicators.evidence.push(`${patents.length} patents filed showing active R&D`);
    }

    return indicators;
}

function estimateCurrentTRL(indicators) {
    // TRL scale: 1-9
    if (indicators.hasCommercial) return 8; // System complete and qualified
    if (indicators.hasPilot) return 6; // System/subsystem model or prototype demonstration
    if (indicators.hasPrototype) return 4; // Component validation in laboratory
    return 3; // Experimental proof of concept
}

function getTRLDescription(level) {
    const descriptions = {
        1: "Basic principles observed",
        2: "Technology concept formulated",
        3: "Experimental proof of concept",
        4: "Component validation in laboratory",
        5: "Component validation in relevant environment",
        6: "System/subsystem model demonstration",
        7: "System prototype demonstration",
        8: "System complete and qualified",
        9: "Actual system proven in operational environment"
    };
    return descriptions[level] || "Unknown TRL";
}

function buildTRLTimeline(patents, newsArticles) {
    // Group patents by year and estimate TRL progression
    const patentsByYear = {};
    
    patents.forEach(patent => {
        const year = new Date(patent.publishDate).getFullYear();
        if (!patentsByYear[year]) patentsByYear[year] = [];
        patentsByYear[year].push(patent);
    });

    const years = Object.keys(patentsByYear).sort();
    const timeline = [];

    // Build progressive timeline
    years.forEach((year, index) => {
        const yearInt = parseInt(year);
        const count = patentsByYear[year].length;
        
        // Estimate TRL based on year position and patent activity
        let level = 3 + Math.min(4, Math.floor(index * 1.5));
        let milestone = `${count} patents filed`;

        // Adjust based on patent content (simplified)
        const yearText = patentsByYear[year]
            .map(p => `${p.title} ${p.abstract}`.toLowerCase())
            .join(' ');

        if (yearText.includes('commercial') || yearText.includes('production')) {
            level = Math.max(level, 7);
            milestone = `Commercial development: ${count} patents`;
        } else if (yearText.includes('prototype') || yearText.includes('demonstration')) {
            level = Math.max(level, 5);
            milestone = `Prototype development: ${count} patents`;
        }

        timeline.push({ year: yearInt, level, milestone });
    });

    return timeline.length > 0 ? timeline : [
        { year: new Date().getFullYear() - 1, level: 3, milestone: "Initial research" },
        { year: new Date().getFullYear(), level: 4, milestone: "Ongoing development" }
    ];
}