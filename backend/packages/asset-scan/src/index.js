require("dotenv").config();

const { scan } = require("./scan");
const {
  chain: {
    subscribeLatestHeight,
    subscribeFinalizedHeight,
    updateSpecs,
    checkSpecs,
  },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  asset: { initAssetScanDb },
  block: { initBlockDb },
} = require("@statescan/mongo");

async function main() {
  await initBlockDb();
  await initAssetScanDb();
  await subscribeLatestHeight();
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
