import { createCurrencyCard } from "./ui/cardComponent.js";
import { processCurrencyMetrics } from "./services/metrics.js";
import { getCurrencyHistory } from "./api/awesomeApi.js";

export async function app() {

    const currencies = await getCurrencyHistory();

    renderCards(currencies);
}

function renderCards(currencies) {

    const metrics = processCurrencyMetrics(currencies);

    const container = document.getElementById('cards-container')
    container.innerHTML = metrics.map(c => createCurrencyCard(c)).join('');
}

app();