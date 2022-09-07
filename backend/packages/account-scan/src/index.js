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

async function main() {
  await subscribeChainHeight();
  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  // todo: scan blocks
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
