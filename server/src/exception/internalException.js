const { HttpException } = require("./root.js");

class InternalException extends HttpException {
  constructor(message, errors, errorCode) {
    super(message, errorCode, 500, errors);
  }
}

module.exports = InternalException;
