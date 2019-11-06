const { validationResult, checkSchema } = require('express-validator');

const { badRequest } = require('../errors');

exports.checkValidationResult = (req, _, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) next(badRequest(errors.map(err => err.msg)));
  return next();
};

exports.validateSchema = schema => [checkSchema(schema), exports.checkValidationResult];
