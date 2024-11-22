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
const { initEvmWeb3InstanceConditionally } = require("./evm/web3");

async function main() {
  await initBlockDb();
  await subscribeLatestHeight();
  await subscribeFinalizedHeight();
  await initEvmWeb3InstanceConditionally();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
