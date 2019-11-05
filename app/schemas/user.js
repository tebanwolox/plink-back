const { validateCoin } = require('../helpers/validations');
const { PASS_REG_EX } = require('../constants');

exports.signUpSchema = {
  firstName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'firstName is invalid'
    }
  },
  lastName: {
    isLength: {
      options: { min: 2 },
      errorMessage: 'lastName is invalid'
    }
  },
  userName: {
    isLength: {
      options: { min: 2 },
      errorMessage: 'userName is invalid'
    }
  },
  password: {
    matches: {
      options: PASS_REG_EX,
      errorMessage: 'The passwortd must have at least 8 chracthers, numbers and letters'
    }
  },
  currency: {
    custom: {
      options: coin => validateCoin(coin),
      errorMessage: 'The Coin is invalid'
    }
  }
};
