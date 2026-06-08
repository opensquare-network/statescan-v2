const { Decimal128 } = require("mongodb");
const BigNumber = require("bignumber.js");

function toDecimal128(num) {
  const bn = new BigNumber(num);
  const str = bn.toFixed();
  try {
    return Decimal128.fromString(str);
  } catch {
    // Fallback: round to 34 significant digits (Decimal128 max precision)
    return Decimal128.fromString(bn.toPrecision(34));
  }
}

module.exports = {
  toDecimal128,
};
