const { addCoin, getCoinsByUser } = require('../services/crypto_coin');
const { verifiedCrypto, convertCoins } = require('../services/breave_coin');
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
    .then(response => {
      console.log(response);
      return res.send(response);
    })
    .catch(next);
};
