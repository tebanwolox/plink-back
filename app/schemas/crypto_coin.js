exports.createCoinSchema = {
  in: ['body'],
  currency: {
    isEmpty: {
      negated: true,
      errorMessage: 'Coin is invalid'
    }
  }
};
