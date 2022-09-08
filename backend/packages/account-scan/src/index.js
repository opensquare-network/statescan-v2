require("dotenv").config();

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
const { scan } = require("./scan");

async function main() {
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
