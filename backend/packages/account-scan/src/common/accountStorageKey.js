const {
  blake2AsU8a,
  decodeAddress,
  xxhashAsU8a,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

const section = xxhashAsU8a("System", 128);
const method = xxhashAsU8a("Account", 128);

function getAccountStorageKey(address) {
  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 128);

  return u8aToHex(new Uint8Array([...section, ...method, ...hash, ...id]));
}

module.exports = {
  getAccountStorageKey,
};
