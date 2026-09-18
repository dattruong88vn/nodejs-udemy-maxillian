class ValidateError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 400;
    this.data = "";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 404;
    this.data = "";
  }
}

module.exports = {
  ValidateError,
  NotFoundError,
};
