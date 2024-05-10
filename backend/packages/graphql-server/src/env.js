function hasAssets() {
  return !!process.env.MONGO_PALLET_ASSET_SCAN_NAME;
}

function hasVesting() {
  return !!process.env.MONGO_VESTING_SCAN_NAME;
}

function hasMultisig() {
  return !!process.env.MONGO_MULTISIG_SCAN_NAME;
}

module.exports = {
  hasAssets,
  hasVesting,
  hasMultisig,
};
