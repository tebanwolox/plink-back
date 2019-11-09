const { addCoin, getCoinsByUser } = require('../services/crypto_coin');
const { verifiedCrypto, convertCoins } = require('../services/breave_coin');
const { cryptoList } = require('../serializers/coins');
const errors = require('../errors');
const logger = require('../logger');

exports.createCoin = (req, res, next) => {
  logger.info('Start create coin');
  const { id } = req.user;
  const { currency } = req.body;
  return verifiedCrypto(currency)
    .then(response => {
      if (response.success) return addCoin(currency.toUpperCase(), id);
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
  const { id, currency } = req.user;
  return getCoinsByUser(id)
    .then(coins => convertCoins(coins, currency))
    .then(coins => cryptoList(coins))
    .then(coins => {
      logger.info('Finish list coins');
      return res.send({ coins });
    })
    .catch(next);
};
