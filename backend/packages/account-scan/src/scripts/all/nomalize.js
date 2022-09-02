const { encodeAddress } = require("@polkadot/util-crypto");
const { Decimal128 } = require("mongodb");
const BigNumber = require("bignumber.js");
const { utils: { bigAdd } } = require("@osn/scan-common");

function toDecimal128(num) {
  return Decimal128.fromString(new BigNumber(num).toString());
}

function normalizeData(accountData) {
  const { free, reserved, miscFrozen, feeFrozen } = accountData;
  const total = bigAdd(free, reserved);

  return {
    total: toDecimal128(total),
    free: toDecimal128(free),
    reserved: toDecimal128(reserved),
    miscFrozen: toDecimal128(miscFrozen),
    feeFrozen: toDecimal128(feeFrozen),
  };
}

function normalizeEntry([key, value], ss58Format) {
  const pubKeyU8a = key.slice(48);
  const addr = encodeAddress(pubKeyU8a, ss58Format);
  const detail = value.toJSON();
  const data = normalizeData(detail.data);

  return {
    addr,
    detail: {
      ...detail,
      data,
    },
  };
}

module.exports = {
  normalizeEntry,
}
