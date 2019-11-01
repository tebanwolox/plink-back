const bcrypt = require('bcrypt');
const logger = require('../logger');
const errors = require('../errors');

exports.hashingPassword = password =>
  bcrypt.hash(password, parseInt(process.env.CRYPT_SALT_ROUNDS)).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.createUserError('Error trying to crypt the password'));
  });

exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash).catch(err => {
    logger.error(err.message);
    return Promise.reject(errors.createUserError('Error trying to compare hash with the password'));
  });
