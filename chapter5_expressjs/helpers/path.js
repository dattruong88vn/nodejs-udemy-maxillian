const path = require("path");

module.exports = {
  getRootPath: function () {
    return __dirname;
  },
  // process.mainModule.filename is deprecated, use require.main.filename instead.
  getMainModulePath: function () {
    return path.dirname(require.main.filename);
  },
};
