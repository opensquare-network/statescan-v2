require("dotenv").config();

const { scan } = require("./scan");
const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  identity: { initIdentityScanDb },
} = require("@statescan/mongo");

async function main() {
  await initIdentityScanDb();
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
