const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const { handleBlock } = require("./block");
const { scanKnownHeights } = require("./known");
const { deleteFrom } = require("./delete");

async function scan() {
  const db = getAssetDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  if (firstScanKnowHeights()) {
    await scanKnownHeights(toScanHeight);
    toScanHeight = await db.getNextScanHeight();
  }

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
  handleBlock,
  scan,
};
