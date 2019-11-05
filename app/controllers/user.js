const { createUser } = require('../services/user');
const logger = require('../logger');
const { hashingPassword } = require('../helpers/crypt');

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
