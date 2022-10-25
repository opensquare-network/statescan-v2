const { normalizeData } = require("../../utils/normalizeAccountData");
const { encodeAddress } = require("@polkadot/util-crypto");

function normalizeEntry([key, value], ss58Format) {
  const pubKeyU8a = key.slice(48);
  const address = encodeAddress(pubKeyU8a, ss58Format);
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
