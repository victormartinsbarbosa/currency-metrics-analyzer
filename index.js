async function fetchCurrencyQuotes() {

    const coins = ['USD', 'EUR', 'BTC'];

    const quoteRequests = coins.map(c => {
        return fetch(`https://economia.awesomeapi.com.br/json/daily/${c}-BRL/20`)
    })

    try {
        const responses = await Promise.all(quoteRequests);

        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.url}`);
            }
        });

        const rawData = await Promise.all(responses.map(response => response.json()));

        const currencies = rawData.map((c, index) => {
            return {
                name: coins[index],
                history: c
            }
        })

        const info = currencies.map(c => {
            return {
                coin: c.name,
                bullishAverage: processHistoryForBullishAverage(c.history),
                volatilityAverage: calculateVolatilityAverage(c.history)
            }
        })

        console.table(info);
    } catch (error) {
        console.error(`Error in one of the requests: ${error.message}`);
    }
}

function getDailyPercentage(history) {
    return history.map(q => {
        return {
            percentage: Math.abs(parseFloat(q.pctChange))
        }
    });
}

function percentageSum(historyPercentage) {
    return historyPercentage.reduce((acc, p) => {
        return acc + p.percentage;
    }, 0.0)
}

function volatilityAverage(percentageSum, history) {
    if (history.length === 0) {
        return 0;
    }
    return percentageSum / history.length;
}

function calculateVolatilityAverage(history) {
    const DailyPercentage = getDailyPercentage(history);
    const totalSum = percentageSum(DailyPercentage);
    return formatPercentage(volatilityAverage(totalSum, history));
}

function processHistoryForBullishAverage(history) {
    const bullishHistory = filterBullishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bullishHistory);
    return formatCurrency(calculateAverage(sanitizedHistory));
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

function formatPercentage(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
}

fetchCurrencyQuotes();