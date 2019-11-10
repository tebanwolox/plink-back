exports.serializeCoins = coins =>
  coins.map(convertCoin => ({
    name: convertCoin.from_name,
    price: convertCoin.to_quantity,
    source: convertCoin.source
  }));
