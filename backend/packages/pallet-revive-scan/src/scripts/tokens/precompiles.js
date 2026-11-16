// The pallet-assets are exposed to the revive pallet as ERC-20 precompiles, one per
// asset. A precompile is no deployed contract, it has no code and no account info, so it
// never reaches the contract collection the token list is built from. Its address is
// derived from the asset id instead: the id in the first four bytes and the 0x0120
// precompile index at the bytes 16 and 17, see the precompile config of the runtime.
const ADDRESS_SHIFT = BigInt(128);
const ASSET_PRECOMPILE_INDEX = BigInt(0x0120) << BigInt(16);

function getErc20PrecompileAddress(assetId) {
  const value = (BigInt(assetId) << ADDRESS_SHIFT) | ASSET_PRECOMPILE_INDEX;
  return `0x${value.toString(16).padStart(40, "0")}`;
}

module.exports = {
  getErc20PrecompileAddress,
};
