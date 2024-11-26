const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Let Express handle it
  }

  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;