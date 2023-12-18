const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    err: err.message || "Something went wrong",
  });
};

const notFound = (req, res, next) => {
  const err = newError("Not Found");
  err.status = 404;
  next(err);
};

module.exports = { handleErrors, notFound };
