const { addCoin, getCoinsByUser } = require('../services/crypto_coin');
const { verifiedCrypto, convertCoins } = require('../services/breave_coin');
const { serializeCoins } = require('../serializers/coins');
const { orderArrays } = require('../helpers/array');
const { topNumber } = require('../../config').common.coins;
const errors = require('../errors');
const logger = require('../logger');

exports.createCoin = (req, res, next) => {
  logger.info('Start create coin');
  const { id } = req.user;
  const { currency } = req.body;
  return verifiedCrypto(currency)
    .then(response => {
      if (response.success) return addCoin(currency.toUpperCase(), id);
      throw errors.badRequest('This is not a cryptocoin');
    })
    .then(coin => {
      logger.info('Finish create coin');
      return res.status(201).send({ coin });
    })
    .catch(next);
};

exports.listCoins = (req, res, next) => {
  logger.info('Start list coins');
  const { id, currency } = req.user;
  return getCoinsByUser(id)
    .then(coins => convertCoins(coins, currency))
    .then(coins => serializeCoins(coins))
    .then(coins => {
      logger.info('Finish list coins');
      return res.send({ coins, currency });
    })
    .catch(next);
};

exports.topCoins = (req, res, next) => {
  logger.info('Start top list coins');
  const { id, currency } = req.user;
  const { ord, limit } = req.query;
  return getCoinsByUser(id)
    .then(coins => convertCoins(coins, currency))
    .then(convCoins => {
      const serialCoins = serializeCoins(convCoins);
      const orderCoins = orderArrays(serialCoins, 'price');
      const topCoins = orderCoins.slice(0, limit ? limit : topNumber);
      return ord === 'asc' ? orderArrays(topCoins, 'price', ord) : topCoins;
    })
    .then(coins => {
      logger.info('Finish top list coins');
      return res.send({ coins, currency });
    })
    .catch(next);
};
