const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/user');
const { signUpSchema } = require('./schemas/user');
const { validateSchema } = require('./middlewares/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(signUpSchema), createUser);
};
