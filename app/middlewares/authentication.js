const { verifiedToken } = require('../helpers/jwt');

exports.validateAuth = (req, _, next) => {
  req.user = verifiedToken(req.headers.authorization);
  next();
};
