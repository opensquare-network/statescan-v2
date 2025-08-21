const {
  hasVesting,
  hasAssets,
  hasForeignAssets,
  hasMultisig,
  hasIdentity,
  hasRecovery,
  hasProxy,
  hasStaking,
} = require("../env");
const {
  vesting: { initVestingScanDb },
  palletAsset: { initPalletAssetScanDb },
  foreignAsset: { initForeignAssetScanDb },
  multisig: { initMultisigScanDb },
  identity: { initIdentityScanDb },
  palletRecovery: { initPalletRecoveryScanDb },
  palletProxy: { initPalletProxyScanDb },
  palletStaking: { initPalletStakingScanDb },
} = require("@statescan/mongo");

async function initDbs() {
  if (hasVesting()) {
    await initVestingScanDb();
  }
  if (hasAssets()) {
    await initPalletAssetScanDb();
  }
  if (hasMultisig()) {
    await initMultisigScanDb();
  }
  if (hasIdentity()) {
    await initIdentityScanDb();
  }
  if (hasRecovery()) {
    await initPalletRecoveryScanDb();
  }
  if (hasProxy()) {
    await initPalletProxyScanDb();
  }
  if (hasForeignAssets()) {
    await initForeignAssetScanDb();
  }
  if (hasStaking()) {
    await initPalletStakingScanDb();
  }
}

module.exports = {
  initDbs,
};
