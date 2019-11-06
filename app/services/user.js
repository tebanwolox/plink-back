const { User } = require('../models');
const logger = require('../logger');
const errors = require('../errors');

exports.createUser = user =>
  User.create(user).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.databaseError('Error with data base'));
  });

exports.authentication = log =>
  User.findOne({
    where: { userName: log.userName },
    attributes: ['id', 'firstName', 'lastName', 'password']
  }).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.databaseError('Error with data base'));
  });
