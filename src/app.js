import { createCurrencyCard } from "./ui/cardComponent.js";
import { processCurrencyMetrics } from "./services/metrics.js";
import { rankingData } from "./services/ranking.js";
import { getCurrencyHistory } from "./api/awesomeApi.js";
import { createRankingSection } from "./ui/rankComponent.js";

export async function app() {

    const currencies = await getCurrencyHistory();
    console.log(currencies);

    const metrics = processCurrencyMetrics(currencies);
    renderRanking(metrics);
    renderCards(metrics);
}

function renderCards(metrics) {
    const container = document.getElementById('cards-container');
    container.innerHTML = metrics.map(c => createCurrencyCard(c)).join('');
}

function renderRanking(metrics) {

    const topRanking = rankingData(metrics);

    const container = document.getElementById('ranking-container');

    container.innerHTML = createRankingSection(topRanking);
}

app();