const axios = require('axios');

const { braveCoinEnpoint, braveHost, braveApiKey } = require('../../config/index').common.braveCoin;
const errors = require('../errors');
const logger = require('../logger');

const instance = axios.create({
  baseURL: braveCoinEnpoint,
  headers: {
    'x-rapidapi-host': braveHost,
    'x-rapidapi-key': braveApiKey
  }
});

exports.verifiedCrypto = coin =>
  instance
    .get(`/ticker?coin=${coin}`)
    .then(res => res.data)
    .catch(err => {
      logger.error('Error trying to consume the API');
      throw errors.apiError(err.message);
    });
