const supertest = require('supertest');

const app = require('../app');
const { testUser } = require('./mock/user');
const { testCoin, testNotCryptoCoin, testCoins } = require('./mock/coin');
const { getToken } = require('../app/helpers/jwt');

const request = supertest(app);

describe('Coins controllers', () => {
  let createdUser = null;
  beforeEach(() =>
    request
      .post('/users')
      .send(testUser)
      .then(res => {
        createdUser = res.body.user;
      })
  );

  describe('POST /coins', () => {
    it('Shoul created Coin', () =>
      request
        .post('/coins')
        .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
        .send(testCoin)
        .then(response => {
          expect(response.statusCode).toBe(201);
        }));

    it('Shoul failed because the Coin isn´t a cryptoCoin', () =>
      request
        .post('/coins')
        .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
        .send(testNotCryptoCoin)
        .then(response => {
          expect(response.statusCode).toBe(400);
        }));

    it('Shoul failed because the request don´t have a coin', () =>
      request
        .post('/coins')
        .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
        .then(response => {
          expect(response.statusCode).toBe(400);
        }));
  });

  describe('GET /coins/list', () => {
    it('get list of crypto coins for user', () =>
      Promise.all(
        testCoins.map(coin =>
          request
            .post('/coins')
            .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
            .send(coin)
        )
      ).then(() =>
        request
          .get('/coins/list')
          .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
          .then(response => {
            expect(response.statusCode).toBe(200);
          })
      ));

    it('get list of crypto coins for user without coins', () =>
      request
        .get('/coins/list')
        .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
        .then(response => {
          expect(response.statusCode).toBe(200);
        }));
  });

  describe('GET /coins/topList', () => {
    it('get top list of crypto coins for user', () =>
      Promise.all(
        testCoins.map(coin =>
          request
            .post('/coins')
            .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
            .send(coin)
        )
      ).then(() =>
        request
          .get('/coins/topList')
          .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
          .then(response => {
            expect(response.statusCode).toBe(200);
          })
      ));

    it('get toplist of crypto coins for user without coins', () =>
      request
        .get('/coins/topList')
        .set({ Authorization: getToken({ ...testUser, id: createdUser.id }) })
        .then(response => {
          expect(response.statusCode).toBe(200);
        }));
  });
});
