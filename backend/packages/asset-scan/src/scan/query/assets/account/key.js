const {
  blake2AsU8a,
  decodeAddress,
  xxhashAsU8a,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

const section = xxhashAsU8a("Assets", 128);
const method = xxhashAsU8a("Account", 128);

function blake2Concat(u8a) {
  const hash = blake2AsU8a(u8a, 128);
  return [...hash, ...u8a];
}

function getAssetAccountStorageKey(assetId, account, registry) {
  const assetIdU8a = registry.createType("AssetId", assetId, true).toU8a();
  const accountIdU8a = decodeAddress(account);

  return u8aToHex(
    new Uint8Array([
      ...section,
      ...method,
      ...blake2Concat(assetIdU8a),
      ...blake2Concat(accountIdU8a),
    ]),
  );
}

module.exports = {
  getAssetAccountStorageKey,
};
