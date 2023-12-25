class HttpException extends Error {
  constructor(message, errorCode, statusCode, error) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export const ErrorCode {
  USER_NOT_FOUND: "1001",
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
}
