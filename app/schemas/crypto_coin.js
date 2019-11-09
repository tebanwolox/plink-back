exports.createCoinSchema = {
  currency: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Coin is invalid'
    }
  }
};

exports.listCoinsSchema = {
  id: {
    in: ['params'],
    isEmpty: {
      negated: true,
      errorMessage: 'Invalid Id'
    }
  }
};
