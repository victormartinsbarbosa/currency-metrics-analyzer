async function fetchCurrencyQuotes() {
    const quoteRequests = [
        fetch('https://economia.awesomeapi.com.br/json/daily/USD-BRL/20'),
        fetch('https://economia.awesomeapi.com.br/json/daily/EUR-BRL/20'),
        fetch('https://economia.awesomeapi.com.br/json/daily/BTC-BRL/20')
    ];

    try {
        const responses = await Promise.all(quoteRequests);

        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.url}`);
            }
        });

        const rawData = await Promise.all(responses.map(response => response.json()));

        const [usdHistory, eurHistory, btcHistory] = rawData;

        const usdAverageBullishPrice = processHistoryForBullishAverage(usdHistory);
        const eurAverageBullishPrice = processHistoryForBullishAverage(eurHistory);
        const btcAverageBullishPrice = processHistoryForBullishAverage(btcHistory);

        console.log('Average Closing Price - Bullish Trend (Last 20 Days)');
        console.log(`Bullish Average (USD/BRL): ${formatCurrency(usdAverageBullishPrice)}`);
        console.log(`Bullish Average (EUR/BRL): ${formatCurrency(eurAverageBullishPrice)}`);
        console.log(`Bullish Average (BTC/BRL): ${formatCurrency(btcAverageBullishPrice)}`);

    } catch (error) {
        console.error(`Error in one of the requests: ${error.message}`);
    }
}

function processHistoryForBullishAverage(history) {
    const bullishHistory = filterBullishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bullishHistory);
    return calculateAverage(sanitizedHistory);
}

function filterBullishDays(quotes) {
    return quotes.filter(quote => parseFloat(quote.pctChange) > 0);
}

function sanitizeClosingPrices(quotes) {
    return quotes.map(quote => {
        return {
            closingPrice: parseFloat(quote.bid)
        };
    });
}

function calculateAverage(items) {
    const totalSum = items.reduce((accumulator, item) => {
        return accumulator + item.closingPrice;
    }, 0);

    if (totalSum === 0 || items.length === 0) {
        return 0;
    }

    return totalSum / items.length;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

fetchCurrencyQuotes();