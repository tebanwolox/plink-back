const jwt = require('jsonwebtoken');

const { secret } = require('../../config').common.session;

exports.getToken = ({ id, firstName, lastName }) =>
  jwt.sign({ id, firstName, lastName }, secret, { expiresIn: 3600 });
