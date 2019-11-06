const { CryptoCoin } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.addCoin = (currency, userId) =>
  CryptoCoin.create({ currency, userId }).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.databaseError('Error with data base'));
  });
