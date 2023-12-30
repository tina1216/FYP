const { HttpException } = require("./root.js");

class notFoundException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 404, null);
  }
}

module.exports = notFoundException;
