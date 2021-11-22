const BASE_URL = 'https://data.fixer.io/api/';
const API_KEY = '5857585e5a0c3594cb1802d8c55b296a';

function fetchConversionRates() {
  const FETCH_ENDPOINT = `${BASE_URL}latest?access_key=${API_KEY}`;
  console.log('FETCH_ENDPOINT', FETCH_ENDPOINT);

  return new Promise(function (resolve, _reject) {
    fetch(FETCH_ENDPOINT)
      .then(response => response.json())
      .then(json => {
        if (json) {
          const rates = json.rates;
          const baseName = json.base;
          rates[baseName] = 1;
          const rateKeys = Object.keys(rates).sort();
          resolve({
            lastUpdated: Date.now(),
            byId: rates,
            allIds: rateKeys,
          });
        }
      })
      .catch(err => {
        console.log('Error fetching rates: ', err);
        resolve(null);
      });
  });
}

function convertCurrency(from, to, amount) {
  const CONVERT_ENDPONINT = `${BASE_URL}convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;
  console.log('CONVERT_ENDPONINT', CONVERT_ENDPONINT);

  return new Promise(function (resolve, _reject) {
    fetch(CONVERT_ENDPONINT)
      .then(response => response.json())
      .then(json => {
        if (json) {
          console.log('json', json);
          const result = json.result;
          resolve(result);
        }
      })
      .catch(err => {
        console.log('Error converting rates: ', err);
        resolve(null);
      });
  });
}

function getHistoricalRates(_date, from, to) {
  const HISTORICAL_RATES_ENDPOINT = `${BASE_URL}${_date}?access_key=${API_KEY}&base=${from}&symbols=${to}`;
  console.log('HISTORICAL_RATES_ENDPOINT', HISTORICAL_RATES_ENDPOINT);

  return new Promise(function (resolve, _reject) {
    fetch(HISTORICAL_RATES_ENDPOINT)
      .then(response => response.json())
      .then(json => {
        if (json) {
          const rates = json.rates;
          resolve(rates[to]);
        }
      })
      .catch(err => {
        console.log('Error getting time series: ', err);
        resolve(null);
      });
  });
}

const currencyService = {
  fetchConversionRates,
  convertCurrency,
  getHistoricalRates,
};

export default currencyService;
