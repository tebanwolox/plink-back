const jwt = require('jsonwebtoken');

const { secret } = require('../../config').common.session;

exports.getToken = payload => jwt.sign({ payload }, secret, { expiresIn: 3600 });
