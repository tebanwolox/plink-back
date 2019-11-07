const logger = require('../logger');
const { addCoin } = require('../services/crypto_coin');

exports.createCoin = (req, res, next) => {
  logger.info('Start create coin');
  const { user } = req;
  return addCoin(req.body.currency, user.id)
    .then(coin => res.status(201).send({ coin }))
    .catch(next);
};
