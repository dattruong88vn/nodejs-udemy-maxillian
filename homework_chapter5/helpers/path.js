const path = require("path");

function getMainModulePath() {
  return path.dirname(require.main.filename);
}

module.exports = { getMainModulePath };
