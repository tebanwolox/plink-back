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
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'lastName is invalid'
    }
  },
  userName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'userName is invalid'
    }
  },
  password: {
    in: ['body'],
    matches: {
      options: PASS_REG_EX,
      errorMessage: 'The passwortd must have at least 8 chracthers, numbers and letters'
    }
  },
  currency: {
    in: ['body'],
    custom: {
      options: coin => validateCoin(coin),
      errorMessage: 'The Coin is invalid'
    }
  }
};

exports.signInSchema = {
  in: ['body'],
  userName: {
    isEmpty: {
      negated: true,
      errorMessage: 'userName is invalid'
    }
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'userName is invalid'
    }
  }
};
