export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.name === 'ValidationError' ? 400 : 500;
  return res.status(statusCode).json({
    message: err.message || 'Internal server error'
  });
}
