const { HttpException } = require("./root.js");

class OtpException extends HttpException {
  constructor(message, errors = [], errorCode = "OTP_ERROR") {
    super(message, errorCode, 400, errors);
  }
}

module.exports = OtpException;
