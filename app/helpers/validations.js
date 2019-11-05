const { CURRENCY } = require('../constants');

exports.validateCoin = coin => CURRENCY.includes(coin);
