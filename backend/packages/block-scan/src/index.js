require("dotenv").config();

const { scan } = require("./scan");
const {
  chain: {
    subscribeChainHeight,
    updateSpecs,
    checkSpecs,
  },
  env: {
    isUseMetaDb,
  }
} = require("@osn/scan-common");
const { block: { initBlockDb } } = require("@statescan/mongo");

async function main() {
  await initBlockDb();
  await subscribeChainHeight();
  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
