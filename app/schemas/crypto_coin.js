exports.createCoinSchema = {
  currency: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Coin is invalid'
    }
  }
};
