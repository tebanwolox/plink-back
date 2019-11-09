const { verifiedToken } = require('../helpers/jwt');
const errors = require('../errors');

exports.validateAuth = (req, _, next) => {
  req.user = verifiedToken(req.headers.authorization);
  return next();
};

exports.verifiedId = (req, _, next) => {
  if (parseInt(req.params.id) === parseInt(req.user.id)) return next();
  return next(errors.badRequest('Invalid id'));
};
