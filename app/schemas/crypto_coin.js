exports.createCoinSchema = {
  currency: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Coin is invalid'
    }
  }
};

exports.topCoinsSchema = {
  ord: {
    in: ['query'],
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
  },
  limit: {
    in: ['query'],
    optional: {
      options: {
        checkFalsy: true,
        nullable: false
      }
    }
  }
};
