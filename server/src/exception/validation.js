const { HttpException } = require("./root.js");

class UnprocessableEntity extends HttpException {
  constructor(message, errorCode, error) {
    super(message, errorCode, 422, error);
  }
}

module.exports = UnprocessableEntity;
