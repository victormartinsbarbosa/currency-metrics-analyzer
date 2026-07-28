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
                bearishAverage: processHistoryForBearishAverage(c.history),
                bullishDays: getBullishDaysCount(c.history),
                bearishDays: getBearishDaysCount(c.history),
                bullishRatio: calculateBullishRatio(c.history),
                volatilityAverage: calculateVolatilityAverage(c.history),
                spreadAverage: calculateSpreadAverage(c.history),
                periodHigh: processPeriodHigh(c.history),
                periodLow: processPeriodLow(c.history)
            }
        })

        console.table(info);
    } catch (error) {
        console.error(`Error in one of the requests: ${error.message}`);
    }
}

function calculateSpreadAverage(history) {
    const dailyRange = getDailyRange(history);
    const sum = sumArray(dailyRange);
    return formatPercentage(average(sum, history));
}

function calculateVolatilityAverage(history) {
    const dailyPercentage = getDailyPercentage(history);
    const totalSum = sumArray(dailyPercentage);
    return formatPercentage(average(totalSum, history));
}

function calculateBullishRatio(history) {
    if (!history || history.length === 0) return 'N/A';
    const bullishDays = getBullishDaysCount(history);
    const periodDays = history.length;
    const ratioPercentage = (bullishDays / periodDays) * 100;
    return formatPercentage(ratioPercentage);
}

function processHistoryForBullishAverage(history) {
    const bullishHistory = filterBullishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bullishHistory);
    return formatCurrency(calculateAverage(sanitizedHistory));
}

function processHistoryForBearishAverage(history) {
    const bearishHistory = filterBearishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bearishHistory);
    return formatCurrency(calculateAverage(sanitizedHistory));
}

function processPeriodHigh(history) {
    return formatCurrency(getMaxHigh(history));
}

function processPeriodLow(history) {
    return formatCurrency(getMinLow(history));
}

function getBullishDaysCount(history) {
    return filterBullishDays(history).length;
}

function getBearishDaysCount(history) {
    return filterBearishDays(history).length;
}

function getDailyRange(history) {
    return history.map(q => {
        let high = parseFloat(q.high);
        let low = parseFloat(q.low);
        return (high - low) / low * 100;
    })
}


function getDailyPercentage(history) {
    return history.map(q => {
        return Math.abs(parseFloat(q.pctChange))
    });
}

function filterBullishDays(quotes) {
    return quotes.filter(quote => parseFloat(quote.pctChange) > 0);
}

function filterBearishDays(quotes) {
    return quotes.filter(quote => parseFloat(quote.pctChange) < 0)
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
        return 'N/A';
    }

    return totalSum / items.length;
}

function sumArray(numbers) {
    return numbers.reduce((acc, q) => {
        return acc + q;
    }, 0)
}

function average(sum, history) {
    if (history.length === 0) {
        return 0;
    }
    return sum / history.length;
}

function getMaxHigh(history) {

    if (history.length === 0) {
        return 0;
    }

    return history.reduce((acc, q) => {
        return Math.max(acc, parseFloat(q.high));
    }, parseFloat(history[0].high))
}

function getMinLow(history) {

    if (history.length === 0) {
        return 0;
    }

    return history.reduce((acc, q) => {
        return Math.min(acc, parseFloat(q.low));
    }, parseFloat(history[0].low))
}

function formatCurrency(value) {
    if (value === 'N/A') {
        return value;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatPercentage(value) {
    if (value === 'N/A') {
        return value;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
}

fetchCurrencyQuotes();