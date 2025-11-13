require("dotenv").config();

const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs, getApi },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  multisig: { initMultisigScanDb },
} = require("@statescan/mongo");
const { scan } = require("./scan");

async function main() {
  await initMultisigScanDb();
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
