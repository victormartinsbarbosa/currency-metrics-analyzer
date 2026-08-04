export async function getCurrencyHistory(coins = ['USD', 'EUR', 'BTC'], days = 20) {

    const quoteRequests = coins.map(c => {
        return fetch(`https://economia.awesomeapi.com.br/json/daily/${c}-BRL/${days}`);
    });

    try {

        const res = await Promise.all(quoteRequests);

        res.forEach(res => {
            if (!res.ok) {
                throw new Error(`Request failed: ${res.url}`);
            }
        });

        const rawData = await Promise.all(res.map(res => res.json()));

        console.log(rawData);

        const currencies = rawData.map((c, index) => {
            return {
                name: coins[index],
                nameExtensive: c.name,
                history: c
            }
        });

        console.log(currencies)

        const currencyCache = {
            updatedAt: new Date().toISOString(),
            currencies
        }

        localStorage.setItem('currency_cache', JSON.stringify(currencyCache));

        return currencies;

    } catch (error) {
        console.error(`Error in one of the requests: ${error.message}`);
        const cachedData = localStorage.getItem('currency_cache');
        if (cachedData) {
            return JSON.parse(cachedData).currencies;
        } else {
            return [];
        }
    }
}