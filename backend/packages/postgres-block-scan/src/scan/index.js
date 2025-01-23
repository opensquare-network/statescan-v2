const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const { getNextScanHeight } = require("../postgres");
const { handleBlockIgnoreErrorForChains } = require("./block");

async function beginScan() {
  let toScanHeight = await getNextScanHeight();
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlockIgnoreErrorForChains),
      true,
    );
    await sleep(1);
  }
}

module.exports = {
  beginScan,
};
