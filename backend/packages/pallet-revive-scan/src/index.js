require("dotenv").config();

const {
  palletRevive: { initPalletReviveScanDb },
  knownHeight: { initKnownHeightDb },
} = require("@statescan/mongo");
const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const { scan } = require("./scan");

(async () => {
  await initPalletReviveScanDb();
  await initKnownHeightDb();
  await subscribeFinalizedHeight();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
})();
