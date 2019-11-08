exports.serializeCoins = coins =>
  coins.map(convertCoin => {
    const coin = {
      name: convertCoin.from_name,
      price: convertCoin.to_quantity,
      source: convertCoin.source
    };
    return coin;
  });

exports.orderCoinsAsc = coins =>
  coins.sort((coinPrev, coinNext) => (coinPrev.price < coinNext.price ? 1 : -1));

exports.orderCoinsDes = coins =>
  coins.sort((coinPrev, coinNext) => (coinPrev.price > coinNext.price ? 1 : -1));
