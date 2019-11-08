const jwt = require('jsonwebtoken');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = payload => jwt.sign({ payload }, secret, { expiresIn: expirationToken });

exports.verifiedToken = token => jwt.verify(token, secret);
