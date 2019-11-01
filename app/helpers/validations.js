const { PASS_REG_EX, CURRENCY } = require('../constants');
const errors = require('../errors');

exports.passwordValidate = pass => PASS_REG_EX.test(pass);

exports.validateCoin = coin => CURRENCY.includes(coin);

exports.validateUser = user =>
  new Promise((resolve, reject) => {
    if (exports.passwordValidate(user.password) && exports.validateCoin(user.currency)) resolve();
    else reject(errors.createUserError('User schema error'));
  });
