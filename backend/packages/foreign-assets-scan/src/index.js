require("dotenv").config();

const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  foreignAsset: { initForeignAssetScanDb },
  knownHeight: { initKnownHeightDb },
} = require("@statescan/mongo");
const { scan } = require("./scan");

async function main() {
  await initForeignAssetScanDb();
  await initKnownHeightDb();
  await subscribeFinalizedHeight();
  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
