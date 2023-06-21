const { u8aToString } = require("@polkadot/util");

function dataAsString(data) {
  if (data.isRaw) {
    return u8aToString(data.asRaw.toU8a(true));
  }

  if (data.isNone) {
    return null;
  }

  return data.toHex();
}

module.exports = {
  dataAsString,
};
