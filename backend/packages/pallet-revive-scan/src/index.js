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
const { startJobs } = require("./jobs");

(async () => {
  await initPalletReviveScanDb();
  await initKnownHeightDb();
  await subscribeFinalizedHeight();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  // scan() never returns, the jobs share the process and its api connection.
  startJobs();
  await scan();
})();
