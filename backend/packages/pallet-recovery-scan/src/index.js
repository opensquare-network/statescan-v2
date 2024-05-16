require("dotenv").config();

const {
  palletRecovery: { initPalletRecoveryScanDb },
  knownHeight: { initKnownHeightDb },
} = require("@statescan/mongo");
const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const { scan } = require("./scan");

(async () => {
  await initPalletRecoveryScanDb();
  await initKnownHeightDb();
  await subscribeFinalizedHeight();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
})();
