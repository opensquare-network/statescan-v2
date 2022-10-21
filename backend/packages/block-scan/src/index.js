const { startJobs } = require("./jobs");
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
  block: { initBlockDb },
} = require("@statescan/mongo");

async function main() {
  await initBlockDb();
  await subscribeLatestHeight();
  await subscribeFinalizedHeight();
  await startJobs();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
