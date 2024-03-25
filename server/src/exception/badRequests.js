const { HttpException } = require("./root.js");

class badRequestsException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 404, null);
  }
}

module.exports = badRequestsException;
