require("dotenv").config();

const {
  chain: {
    subscribeLatestHeight,
    subscribeFinalizedHeight,
    updateSpecs,
    checkSpecs,
  },
  env: { isUseMetaDb },
} = require("@osn/scan-common");
const { beginScan } = require("./scan");

(async () => {
  await subscribeLatestHeight();
  await subscribeFinalizedHeight();

  if (isUseMetaDb()) {
    await updateSpecs();
    checkSpecs();
  }

  await beginScan();
})();
