const bcrypt = require('bcrypt');

const logger = require('../logger');
const errors = require('../errors');
const { saltRounds } = require('../../config').common.bcrypt;

exports.hashingPassword = password =>
  bcrypt.hash(password, parseInt(saltRounds)).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.createUserError('Error trying to crypt the password'));
  });

exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.createUserError('Error trying to compare hash with the password'));
  });
