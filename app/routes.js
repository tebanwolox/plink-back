const { healthCheck } = require('./controllers/health_check');
const { createUser, logging } = require('./controllers/user');
const { signUpSchema, signInSchema } = require('./schemas/user');
const { createCoinSchema, topCoinsSchema } = require('./schemas/crypto_coin');
const { validateSchema, validateSchemaAuth } = require('./middlewares/validate_schema');
const { validateAuth } = require('./middlewares/authentication');
const { createCoin, listCoins, topCoins } = require('./controllers/crypto_coin');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateSchema(signUpSchema), createUser);
  app.post('/users/sessions', validateSchema(signInSchema), logging);
  app.post('/coins', validateSchemaAuth(createCoinSchema), createCoin);
  app.get('/coins/list', validateAuth, listCoins);
  app.get('/coins/topList', validateSchemaAuth(topCoinsSchema), topCoins);
};
