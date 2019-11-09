const request = require('request-promise');

const { braveCoinEnpoint, braveHost, braveApiKey } = require('../../config').common.braveCoin;
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
    logger.error('Error trying to coin API');
    throw errors.apiError(err.message);
  });
};

exports.verifiedCrypto = coin => exports.getApi(`${braveCoinEnpoint}/ticker?coin=${coin}`, 'GET');
