class HttpException extends Error {
  constructor(message, errorCode, statusCode, error) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

const ErrorCode = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROCESSABLE_ENTITY: 20001,
  INTERNAL_EXCEPTION: 3001,
  UNAUTHORIZED: 4001,
};

module.exports = { HttpException, ErrorCode };
