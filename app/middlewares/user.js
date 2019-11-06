const { validationResult } = require('express-validator');

const { badRequest } = require('../errors');

exports.userSchemaMiddleware = (req, _, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) next(badRequest(errors.map(err => err.msg)));
  return next();
};
