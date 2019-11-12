const nock = require('nock');

const { braveCoinEnpoint } = require('../../config').common.braveCoin;
const { testTickerResponse } = require('./coin');

exports.successTicker = nock(braveCoinEnpoint)
  .get(/ticker\?[^/]+$/)
  .reply(200, testTickerResponse);
