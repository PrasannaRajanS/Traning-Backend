const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Logs the stack trace to the console
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;