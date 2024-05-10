const { handleBlock } = require("./block");
const {
  chain: { wrapBlockHandler, getLatestFinalizedHeight },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const { updateAllVesting } = require("./jobs/all");

async function scan() {
  let toScanHeight = getLatestFinalizedHeight();
  await updateAllVesting();

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
      false,
    );
    await sleep(1);
  }
}

module.exports = {
  scan,
};
