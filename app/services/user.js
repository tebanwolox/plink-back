const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.createUser = user =>
  User.create(user).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.databaseError('Database error'));
  });

exports.getUser = log =>
  User.findOne({
    where: { userName: log.userName },
    attributes: ['id', 'firstName', 'lastName', 'password', 'currency'],
    raw: true
  }).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.databaseError('Database error'));
  });
