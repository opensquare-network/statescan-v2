const {
  palletRecovery: { getRecoveryDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("./delete");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const { handleBlock } = require("./block");
const {
  known: { scanKnownHeights },
} = require("@statescan/common");

async function scan() {
  const db = await getRecoveryDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  if (firstScanKnowHeights()) {
    await scanKnownHeights(toScanHeight, wrapBlockHandler(handleBlock));
    toScanHeight = await db.getNextScanHeight();
  }

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
    );
    await sleep(1);
  }
}

module.exports = {
  scan,
  handleBlock,
};
