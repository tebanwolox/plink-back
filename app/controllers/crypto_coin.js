const { addCoin, getCoinsByUser } = require('../services/crypto_coin');
const { verifiedCrypto, convertCoins } = require('../services/breave_coin');
const { serializeCoins } = require('../serializers/coins');
const { orderArrayDes, orderArraysAsc } = require('../helpers/array');
const {
  common: {
    coins: { topNumber }
  }
} = require('../../config');
const errors = require('../errors');
const logger = require('../logger');

exports.createCoin = (req, res, next) => {
  logger.info('Start create coin');
  const { user } = req;
  const currency = req.body.currency.toUpperCase();
  return verifiedCrypto(currency)
    .then(response => {
      if (response.success) return addCoin(currency, user.id);
      throw errors.apiError('This is not a cryptocoin');
    })
    .then(coin => {
      logger.info('Finish create coin');
      return res.status(201).send({ coin });
    })
    .catch(next);
};

exports.listCoins = (req, res, next) => {
  logger.info('Start list coins');
  const { user } = req;
  return getCoinsByUser(user.id)
    .then(coins => convertCoins(coins, user.currency))
    .then(coins => serializeCoins(coins))
    .then(coins => {
      logger.info('Finish list coins');
      return res.send({ coins, currency: user.currency });
    })
    .catch(next);
};

exports.topCoins = (req, res, next) => {
  logger.info('Start list coins');
  const { user } = req.user;
  return getCoinsByUser(user.id)
    .then(coins => convertCoins(coins, user.currency))
    .then(convCoins => {
      const serialCoins = serializeCoins(convCoins);
      const orderCoins = orderArrayDes(serialCoins, 'price');
      const topCoins = orderCoins.slice(0, topNumber);
      return req.query.ord === 'asc' ? orderArraysAsc(topCoins, 'price') : topCoins;
    })
    .then(coins => {
      logger.info('Finish list coins');
      res.send({ coins, currency: user.currency });
    })
    .catch(next);
};
