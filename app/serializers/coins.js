exports.cryptoList = coins =>
  coins.map(convertCoin => {
    const coin = {
      name: convertCoin.from_name,
      price: convertCoin.to_quantity,
      source: convertCoin.source
    };
    return coin;
  });
