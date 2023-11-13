const { toDecimal128 } = require("./toDecimal128");
const {
  utils: { bigAdd },
} = require("@osn/scan-common");

function normalizeData(accountData) {
  const { free, reserved, miscFrozen, feeFrozen } = accountData;
  const total = bigAdd(free, reserved);

  return {
    total: toDecimal128(total),
    free: toDecimal128(free),
    reserved: toDecimal128(reserved),
    miscFrozen: toDecimal128(miscFrozen),
    feeFrozen,
  };
}

module.exports = {
  normalizeData,
};
