const { addCoin, getCoinsByUser } = require('../services/crypto_coin');
const { verifiedCrypto, convertCoins } = require('../services/breave_coin');
const { serializeCoins, orderCoinsAsc } = require('../serializers/coins');
const { topCoins } = require('../../config').common.coins;
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
      return res.send({ coins });
    })
    .catch(next);
};

exports.topCoins = (req, res, next) => {
  logger.info('Start list coins');
  const { user } = req.user;
  return getCoinsByUser(user.id)
    .then(coins => convertCoins(coins, user.currency))
    .then(coins => serializeCoins(coins))
    .then(coins => orderCoinsAsc(coins))
    .then(orderCrypto => {
      const coins = orderCrypto.slice(0, topCoins);
      logger.info('Finish list coins');
      return res.send({ coins });
    })
    .catch(next);
};
