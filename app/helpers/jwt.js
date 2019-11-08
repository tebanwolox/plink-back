const jwt = require('jsonwebtoken');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = ({ id, firstName, lastName, currency }) =>
  jwt.sign({ id, firstName, lastName, currency }, secret, { expiresIn: expirationToken });

exports.verifiedToken = token => jwt.verify(token, secret);
