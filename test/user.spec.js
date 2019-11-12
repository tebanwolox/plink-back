const supertest = require('supertest');

const app = require('../app');
const { testUser, testLogging } = require('./mock/user');

const request = supertest(app);

describe('Users controllers', () => {
  describe('POST /users', () => {
    it('Should be a successful sign up', () =>
      request
        .post('/users')
        .send(testUser)
        .then(response => {
          expect(response.statusCode).toBe(201);
        }));

    it('Should fail because the userName already exists', () =>
      request
        .post('/users')
        .send(testUser)
        .then(() =>
          request
            .post('/users')
            .send(testUser)
            .then(response => {
              expect(response.statusCode).toBe(503);
            })
        ));

    it('Should failed because the password is too short', () =>
      request
        .post('/users')
        .send({ ...testUser, password: '1234' })
        .then(response => {
          expect(response.statusCode).toBe(400);
        }));
  });

  describe('POST /users/sessions', () => {
    it('Should be a successful logging', () =>
      request
        .post('/users')
        .send(testUser)
        .then(() =>
          request
            .post('/users/sessions')
            .send(testLogging)
            .then(response => {
              expect(response.statusCode).toBe(200);
            })
        ));

    it('Should be a bad logging because wrong password', () =>
      request
        .post('/users')
        .send(testUser)
        .then(() =>
          request
            .post('/users/sessions')
            .send({ ...testLogging, password: '123' })
            .then(response => {
              expect(response.statusCode).toBe(401);
            })
        ));

    it('Should be a bad logging because the user don´t exists', done =>
      request
        .post('/users/sessions')
        .send(testLogging)
        .then(response => {
          expect(response.statusCode).toBe(401);
          done();
        }));
  });
});
