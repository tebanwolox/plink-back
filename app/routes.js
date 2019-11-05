const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/user');
const { signUpSchema } = require('./schemas/user');
const { signUpMiddleware } = require('./middlewares/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', checkSchema(signUpSchema), signUpMiddleware, createUser);
};
