const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const { createUser, logging } = require('./controllers/user');
const { signUpSchema, signInSchema } = require('./schemas/user');
const { signUpMiddleware, signInMiddleware } = require('./middlewares/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', checkSchema(signUpSchema), signUpMiddleware, createUser);
  app.post('/users/sessions', checkSchema(signInSchema), signInMiddleware, logging);
};
