const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.createUser = user =>
  User.create(user).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.createUserError('Error trying to created User'));
  });
