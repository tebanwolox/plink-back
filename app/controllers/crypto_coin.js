const logger = require('../logger');
const { addCoin } = require('../services/crypto_coin');
const { verifiedCrypto } = require('../services/breave_coin');
const errors = require('../errors');

exports.createCoin = (req, res, next) => {
  logger.info('Start create coin');
  const { user } = req;
  const currency = req.body.currency.toUpperCase();
  return verifiedCrypto(currency)
    .then(response => {
      if (response.success) return addCoin(currency, user.id);
      return next(errors.badRequest('This is not a cryptocoin'));
    })
    .then(coin => res.status(201).send({ coin }))
    .catch(next);
};