require("dotenv").config();

const { scan } = require("./scan");
const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  palletAsset: { initPalletAssetScanDb },
  knownHeight: { initKnownHeightDb },
} = require("@statescan/mongo");

async function main() {
  await initPalletAssetScanDb();
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
