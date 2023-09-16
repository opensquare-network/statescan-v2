require("dotenv").config();

const {
  chain: { subscribeFinalizedHeight, updateSpecs, checkSpecs },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const {
  identity: { initIdentityScanDb },
  multisig: { initMultisigScanDb },
} = require("@statescan/mongo");

async function main() {
  await initMultisigScanDb();
  await subscribeFinalizedHeight();
  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
