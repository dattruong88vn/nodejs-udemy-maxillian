const path = require("path");

module.exports = {
  getBooksPath: () => path.join(__dirname, "../data/books.json"),
  getMainModulePath: function () {
    return path.dirname(require.main.filename);
  },
};
