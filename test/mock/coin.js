exports.testCoin = {
  currency: 'BTC'
};

exports.testNotCryptoCoin = {
  currency: 'COP'
};

exports.testCoins = [
  {
    currency: 'BTC'
  }
];

exports.testConvertResponse = {
  success: true,
  source: 'BraveNewCoin',
  request_date: '2019-11-12 14:31:07',
  from_quantity: '1',
  from_symbol: 'BTC',
  from_name: 'Bitcoin',
  to_symbol: 'COP',
  to_name: 'Colombian Peso',
  to_quantity: 28916594.408958
};

exports.testTickerResponse = {
  success: true,
  source: 'BraveNewCoin',
  time_stamp: '1573568761',
  utc_date: '2019-11-12 14:26:01',
  coin_id: 'BTC',
  coin_name: 'Bitcoin',
  last_price: '8666.59251032',
  price_24hr_pcnt: '-0.22',
  volume_24hr: '3300517246',
  vol_24hr_pcnt: '-23.00',
  currency: 'USD',
  currency_name: 'United States Dollar'
};

exports.testTickerNoCrypto = {
  success: false,
  error: 'The coin specified is not available'
};
