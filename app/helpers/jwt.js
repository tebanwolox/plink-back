const jwt = require('jsonwebtoken');

const errors = require('../errors');
const logger = require('../logger');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = ({ id, firstName, lastName, currency }) =>
  jwt.sign({ id, firstName, lastName, currency }, secret, { expiresIn: expirationToken });

exports.verifiedToken = token =>
  jwt.verify(token, secret, (err, decode) => {
    if (err || !decode.id) {
      logger.error('Invalid token');
      throw errors.authError('Invalid token');
    }
    return decode;
  });
