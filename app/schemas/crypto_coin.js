exports.createCoinSchema = {
  in: ['body'],
  currency: {
    isEmpty: {
      negated: true,
      errorMessage: 'Coin is invalid'
    }
  }
};

exports.topCoinsSchema = {
  in: ['query'],
  ord: {
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: 'Ord invalid'
    },
    optional: {
      options: {
        checkFalsy: true,
        nullable: false
      }
    }
  }
};
