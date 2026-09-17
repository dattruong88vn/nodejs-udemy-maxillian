const ERROR_NAME = {
  NOT_FOUND: "NotFoundError",
  VALIDATOR: "ValidationError",
};

const ERROR_STATUS_MAP = {
  NotFoundError: 404,
  ValidationError: 400,
};

class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = ERROR_NAME.NOT_FOUND;
    this.statusCode = ERROR_STATUS_MAP.NotFoundError;
  }
}

class ValidationError extends Error {
  constructor(message = "Invalid input") {
    super(message);
    this.name = ERROR_NAME.VALIDATOR;
    this.statusCode = ERROR_STATUS_MAP.ValidationError;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  ERROR_STATUS_MAP,
  ERROR_NAME,
};
