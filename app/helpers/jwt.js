const jwt = require('jsonwebtoken');

const errors = require('../errors');
const logger = require('../logger');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = user => jwt.sign({ user }, secret, { expiresIn: expirationToken });

exports.verifiedToken = token =>
  jwt.verify(token, secret, (err, decode) => {
    if (err || !decode.user.id) {
      logger.error(err.message);
      throw errors.authError('Invalid token');
    }
    return decode;
  });
