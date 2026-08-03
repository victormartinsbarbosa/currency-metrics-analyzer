export function processCurrencyMetrics(currencies) {
    return currencies.map(c => {
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
    });
}

function calculateSpreadAverage(history) {
    const dailyRange = getDailyRange(history);
    const sum = sumArray(dailyRange);
    return average(sum, history);
}

function calculateVolatilityAverage(history) {
    const dailyPercentage = getDailyPercentage(history);
    const totalSum = sumArray(dailyPercentage);
    return average(totalSum, history);
}

function calculateBullishRatio(history) {
    if (!history || history.length === 0) return null;
    const bullishDays = getBullishDaysCount(history);
    const periodDays = history.length;
    const ratioPercentage = (bullishDays / periodDays) * 100;
    return ratioPercentage;
}

function processHistoryForBullishAverage(history) {
    const bullishHistory = filterBullishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bullishHistory);
    return calculateAverage(sanitizedHistory);
}

function processHistoryForBearishAverage(history) {
    const bearishHistory = filterBearishDays(history);
    const sanitizedHistory = sanitizeClosingPrices(bearishHistory);
    return calculateAverage(sanitizedHistory);
}

function processPeriodHigh(history) {
    return getMaxHigh(history);
}

function processPeriodLow(history) {
    return getMinLow(history);
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
        return null;
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