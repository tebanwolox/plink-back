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

exports.listCoinsSchema = {
  id: {
    in: ['params'],
    isEmpty: {
      negated: true,
      errorMessage: 'Invalid Id'
    }
  }
};
