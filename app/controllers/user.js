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

exports.logging = (req, res, next) => {
  logger.info('Start user sign in');
  const log = req.body;
  return authentication(log)
    .then(user => comparePassword(log.password, user.password))
    .then(isLog => {
      if (isLog) {
        res.send({
          logging: {
            token: getToken(),
            message: 'Successful logging'
          }
        });
        logger.info('Finish user sign in');
      } else {
        next(errors.badRequest('Invalid user name or password'));
      }
    })
    .catch(next);
};
