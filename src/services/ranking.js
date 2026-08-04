export function rankingData(metrics) {

    if (!metrics || metrics.length === 0) return null;

    const sorted = [...metrics].toSorted((a, b) => b.bullishAverage - a.bullishAverage);
    const volatilitySorted = [...metrics].toSorted((a, b) => b.volatilityAverage - a.volatilityAverage);
    const ratioSorted = [...metrics].toSorted((a, b) => b.bullishRatio - a.bullishRatio);
    return {
        topBullish: sorted[0],
        topVolatility: volatilitySorted[0],
        topDominance: ratioSorted[0]
    }
}