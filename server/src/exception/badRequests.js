import HttpException from "./root";

export class badRequestsException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 404, null);
  }
}
