require("dotenv").config();
const { oneStepScan } = require("./scan/oneStep");
const {
  chain: { subscribeChainHeight },
} = require("@osn/scan-common");
const {
  runtime: { initRuntimeScanDb },
} = require("@statescan/mongo");

async function main() {
  await initRuntimeScanDb();
  await subscribeChainHeight();

  await oneStepScan(2040269);
}

main().then(console.log);
