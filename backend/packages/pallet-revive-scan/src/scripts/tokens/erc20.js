const { hexToU8a, u8aToBn, u8aToString } = require("@polkadot/util");

// The getters of the EIP-20 metadata interface, the keccak of the signatures. A contract
// which answers all of them is the token list of the chain.
const GETTERS = Object.freeze({
  name: "0x06fdde03",
  symbol: "0x95d89b41",
  decimals: "0x313ce567",
  totalSupply: "0x18160ddd",
});

// A dry run charges no fee and changes no state, only the weight of the node is spent,
// so the call is capped instead of priced.
const WEIGHT_LIMIT = { refTime: 1000000000000, proofSize: 1000000 };
// The zero address reverts in some contracts, any other account works as the caller.
const CALLER = `0x${"11".repeat(32)}`;
// The lowest bit of the return flags marks a reverted call.
const REVERT_FLAG = 1;
// Neither a name nor a symbol is longer than this, and a broken offset must not be
// followed to the end of a huge return data.
const MAX_STRING_LENGTH = 4096;

function toBigInt(bytes) {
  return u8aToBn(bytes, { isLe: false });
}

function toBoundedNumber(value, max) {
  return value <= BigInt(max) ? Number(value.toString()) : null;
}

// uint256 is a single 32 bytes word, a wider answer is not a standard getter.
function decodeUint(data) {
  return data.length === 32 ? toBigInt(data) : null;
}

function decodeDecimals(data) {
  const value = decodeUint(data);
  return value === null ? null : toBoundedNumber(value, 255);
}

// An old contract returns the bytes of a string in a single word, zero padded.
function decodeBytes32String(data) {
  let end = data.length;
  while (end > 0 && data[end - 1] === 0) {
    end--;
  }

  return end > 0 ? u8aToString(data.slice(0, end)) : null;
}

// A string is the offset of its bytes, their length and the utf8 encoded text.
function decodeString(data) {
  if (data.length === 32) {
    return decodeBytes32String(data);
  }
  if (data.length < 64) {
    return null;
  }

  const offset = toBoundedNumber(
    toBigInt(data.slice(0, 32)),
    MAX_STRING_LENGTH,
  );
  if (offset === null || offset + 32 > data.length) {
    return null;
  }

  const length = toBoundedNumber(
    toBigInt(data.slice(offset, offset + 32)),
    MAX_STRING_LENGTH,
  );
  if (length === null || offset + 32 + length > data.length) {
    return null;
  }

  return u8aToString(data.slice(offset + 32, offset + 32 + length));
}

// A revert is reported as a successful result carrying the revert flag, and a contract
// with a fallback answers every selector with success and no data at all, so both the
// flag and the answer itself decide whether the getter exists.
async function callGetter(api, address, data) {
  const result = await api.call.reviveApi.call(
    CALLER,
    address,
    0,
    WEIGHT_LIMIT,
    null,
    data,
  );
  const execution = result?.toJSON?.()?.result?.ok;
  if (!execution) {
    return null;
  }
  if (((execution.flags?.bits ?? 0) & REVERT_FLAG) !== 0) {
    return null;
  }

  return hexToU8a(execution.data || "0x");
}

// The four getters are read together. An answer which does not decode on any of them
// means the contract does not carry the metadata interface, so it is not a token of the
// list, which also filters the contracts whose fallback answers everything with nothing.
async function readTokenMetadata(api, address) {
  const [nameData, symbolData, decimalsData, totalSupplyData] =
    await Promise.all([
      callGetter(api, address, GETTERS.name),
      callGetter(api, address, GETTERS.symbol),
      callGetter(api, address, GETTERS.decimals),
      callGetter(api, address, GETTERS.totalSupply),
    ]);

  if (!nameData || !symbolData || !decimalsData || !totalSupplyData) {
    return null;
  }

  const name = decodeString(nameData);
  const symbol = decodeString(symbolData);
  const decimals = decodeDecimals(decimalsData);
  const totalSupply = decodeUint(totalSupplyData);
  if (
    name === null ||
    symbol === null ||
    decimals === null ||
    totalSupply === null
  ) {
    return null;
  }

  return { name, symbol, decimals, totalSupply: totalSupply.toString() };
}

module.exports = {
  GETTERS,
  decodeBytes32String,
  decodeDecimals,
  decodeString,
  decodeUint,
  readTokenMetadata,
};
