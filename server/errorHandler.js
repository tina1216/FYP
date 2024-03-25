const { HttpException, ErrorCode } = require("./src/exception/root.js");
const InternalException = require("./src/exception/internalException.js");

const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        exception = new InternalException(
          "Something went wrong",
          err,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
      console.error("Error caught in errorHandler:", err);
    }
  };
};

module.exports = errorHandler;
