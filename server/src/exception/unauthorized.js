const { HttpException } = require("./root.js");

class unauthorisedException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 401, null);
  }
}

module.exports = unauthorisedException;
