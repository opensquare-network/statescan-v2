function hasAssets() {
  return !!process.env.MONGO_PALLET_ASSET_SCAN_NAME;
}

function hasVesting() {
  return !!process.env.MONGO_VESTING_SCAN_NAME;
}

function hasMultisig() {
  return !!process.env.MONGO_MULTISIG_SCAN_NAME;
}

function hasIdentity() {
  return !!process.env.MONGO_IDENTITY_SCAN_NAME;
}

function hasRecovery() {
  return !!process.env.MONGO_PALLET_RECOVERY_SCAN_NAME;
}

function hasProxy() {
  return !!process.env.MONGO_PROXY_SCAN_NAME;
}

function getEndpoints() {
  return (process.env.WS_ENDPOINTS || "").split(";");
}

module.exports = {
  hasAssets,
  hasVesting,
  hasMultisig,
  hasIdentity,
  hasRecovery,
  hasProxy,
  getEndpoints,
};
