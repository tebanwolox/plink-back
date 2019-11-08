const { healthCheck } = require('./controllers/healthCheck');
const { createUser, logging } = require('./controllers/user');
const { signUpSchema, signInSchema } = require('./schemas/user');
const { validateSchema } = require('./middlewares/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(signUpSchema), createUser);
  app.post('/users/sessions', validateSchema(signInSchema), logging);
};
