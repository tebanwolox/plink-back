const request = require('request-promise');

const { braveCoinEnpoint, braveHost, braveApiKey } = require('../../config/index').common.braveCoin;
const errors = require('../errors');
const logger = require('../logger');

exports.getApi = (uri, method) => {
  const options = {
    method,
    uri,
    headers: {
      'x-rapidapi-host': braveHost,
      'x-rapidapi-key': braveApiKey
    },
    json: true
  };
  return request(options).catch(err => {
    logger.error('Error trying to consume album API');
    throw errors.apiError(err.message);
  });
};

exports.verifiedCrypto = coin => exports.getApi(`${braveCoinEnpoint}/ticker?coin=${coin}`, 'GET');

exports.convertCoins = (coins, userCoin) =>
  Promise.all(
    coins.map(coin =>
      exports.getApi(`${braveCoinEnpoint}/convert?qty=1&from=${coin.currency}&to=${userCoin}`, 'GET')
    )
  );
