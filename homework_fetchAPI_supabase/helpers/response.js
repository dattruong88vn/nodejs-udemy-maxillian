class ResponseFormat {
  constructor(data, statusCode = 200, message = "", meta) {
    this.data = data;
    this.statusCode = statusCode;
    this.error = "";
    if (meta) this.meta = meta;
  }
}

module.exports = {
  ResponseFormat,
};
