const { normalizeData } = require("../../utils/normalizeAccountData");

function normalizeEntry([key, value]) {
  const address = key.args[0].toString();
  const detail = value.toJSON();
  const data = normalizeData(detail.data);

  return {
    address,
    detail: {
      ...detail,
      data,
    },
  };
}

module.exports = {
  normalizeEntry,
};
