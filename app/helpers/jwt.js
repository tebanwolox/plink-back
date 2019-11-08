const jwt = require('jsonwebtoken');

const { secret, expirationToken } = require('../../config').common.session;

exports.getToken = user => jwt.sign({ user }, secret, { expiresIn: expirationToken });

exports.verifiedToken = token => jwt.verify(token, secret);
