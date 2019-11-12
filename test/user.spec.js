const supertest = require('supertest');

const app = require('../app');
const { testUser, testLogging } = require('./mock/user');
const { User } = require('../app/models');
const { verifiedToken } = require('../app/helpers/jwt');

const request = supertest(app);

describe('Users controllers', () => {
  describe('POST /users', () => {
    it('Should be a successful sign up', () =>
      request
        .post('/users')
        .send(testUser)
        .then(response => {
          const { currency, firstName, lastName, userName } = testUser;
          expect(response.statusCode).toBe(201);
          return User.findOne({
            where: { userName: testUser.userName },
            attributes: ['currency', 'firstName', 'lastName', 'userName'],
            raw: true
          }).then(res => {
            expect(res).toStrictEqual({ currency, firstName, lastName, userName });
          });
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
              const { internal_code, message } = response.body;
              expect(response.statusCode).toBe(503);
              expect(message).toBe('Database error');
              expect(internal_code).toBe('database_error');
            })
        ));

    it('Should failed because the password is too short', () =>
      request
        .post('/users')
        .send({ ...testUser, password: '1234' })
        .then(response => {
          const { internal_code, message } = response.body;
          expect(response.statusCode).toBe(400);
          expect(message[0]).toBe('The passwortd must have at least 8 characters, numbers and letters');
          expect(internal_code).toBe('bad_request');
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
              const { token } = response.body.logging;
              expect(response.statusCode).toBe(200);
              expect(verifiedToken(token)).toBeTruthy();
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
              const { internal_code, message } = response.body;
              expect(response.statusCode).toBe(401);
              expect(message).toBe('Invalid password');
              expect(internal_code).toBe('auth_error');
            })
        ));

    it('Should be a bad logging because the user don´t exists', done =>
      request
        .post('/users/sessions')
        .send(testLogging)
        .then(response => {
          const { internal_code, message } = response.body;
          expect(response.statusCode).toBe(401);
          expect(message).toBe('The user don`t exists');
          expect(internal_code).toBe('auth_error');
          done();
        }));
  });
});
