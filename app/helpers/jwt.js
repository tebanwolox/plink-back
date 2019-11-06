const jwt = require('jsonwebtoken');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = ({ id, firstName, lastName }) =>
  jwt.sign({ id, firstName, lastName }, secret, { expiresIn: expirationToken });
