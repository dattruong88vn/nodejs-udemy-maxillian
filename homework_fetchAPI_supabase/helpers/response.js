class ResponseFormat {
  constructor(data, status = 200) {
    this.data = data;
    this.status = status;
    this.error = "";
  }
}

module.exports = {
  ResponseFormat,
};
