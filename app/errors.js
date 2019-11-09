const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.API_ERROR = 'api_error';
exports.apiError = message => internalError(message, exports.API_ERROR);

exports.AUTH_ERROR = 'auth_error';
exports.authError = message => internalError(message, exports.AUTH_ERROR);
