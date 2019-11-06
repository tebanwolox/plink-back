const { createUser, authentication } = require('../services/user');
const logger = require('../logger');
const { hashingPassword, comparePassword } = require('../helpers/crypt');
const { getToken } = require('../helpers/jwt');
const errors = require('../errors');

exports.createUser = (req, res, next) => {
  logger.info('Start user sign up');
  const user = req.body;
  return hashingPassword(user.password)
    .then(hash => {
      user.password = hash;
      return createUser(user);
    })
    .then(createdUser => {
      delete createdUser.dataValues.password;
      logger.info('Finish user sign up');
      return res.status(201).send({ user: createdUser.dataValues });
    })
    .catch(next);
};

exports.logging = async (req, res, next) => {
  try {
    logger.info('Start user sign in');
    const log = req.body;
    const user = await authentication(log);
    const isLog = await comparePassword(log.password, user.password);
    if (isLog) {
      logger.info('Finish user sign in');
      return res.send({
        logging: {
          token: getToken(user),
          message: 'Successful logging'
        }
      });
    }
    return next(errors.badRequest('Invalid user name or password'));
  } catch (err) {
    return next(err);
  }
};
