/**
 *
 * @param {number} page
 * @param {number} offset
 * @returns {{from: number, to: number}}
 *
 */
exports.convertPageAndPageSize = (page = 1, pageSize = 10) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { from, to };
};

exports.checkExistAndInvalid = (field, type) => {
  return field && typeof field !== type;
};

exports.sliceStringAtCharFirstPosition = (str, char) => {
  const index = str.indexOf(char);
  return index === -1 ? str : str.substring(0, index);
};
