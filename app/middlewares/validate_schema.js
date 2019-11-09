const { validationResult, checkSchema } = require('express-validator');

const { badRequest } = require('../errors');
const { validateAuth, verifiedId } = require('./authentication');

exports.checkValidationResult = (req, _, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) return next(badRequest(errors.map(err => err.msg)));
  return next();
};

exports.validateSchema = schema => [checkSchema(schema), exports.checkValidationResult];

exports.validateSchemaAuth = schema => [checkSchema(schema), exports.checkValidationResult, validateAuth];

exports.validateSchemaId = schema => [
  checkSchema(schema),
  exports.checkValidationResult,
  validateAuth,
  verifiedId
];
