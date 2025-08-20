function hasAssets() {
  return !!process.env.MONGO_PALLET_ASSET_SCAN_NAME;
}

function hasForeignAssets() {
  return !!process.env.MONGO_FOREIGN_ASSET_SCAN_NAME;
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

function hasEndpoints() {
  return !!process.env.WS_ENDPOINTS;
}

function getEndpoints() {
  return (process.env.WS_ENDPOINTS || "").split(";");
}

function hasStaking() {
  return !!process.env.MONGO_STAKING_SCAN_NAME;
}

module.exports = {
  hasStaking,
  hasAssets,
  hasForeignAssets,
  hasVesting,
  hasMultisig,
  hasIdentity,
  hasRecovery,
  hasProxy,
  hasEndpoints,
  getEndpoints,
};
