const { healthCheck } = require('./controllers/health_check');
const { createUser, logging } = require('./controllers/user');
const { signUpSchema, signInSchema } = require('./schemas/user');
const { createCoinSchema, listCoinsSchema } = require('./schemas/crypto_coin');
const { validateSchema, validateSchemaAuth } = require('./middlewares/validate_schema');
const { createCoin, listCoins } = require('./controllers/crypto_coin');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(signUpSchema), createUser);
  app.post('/users/sessions', validateSchema(signInSchema), logging);
  app.post('/coins', validateSchemaAuth(createCoinSchema), createCoin);
  app.get('/coins/:id/list', validateSchemaAuth(listCoinsSchema), listCoins);
};
