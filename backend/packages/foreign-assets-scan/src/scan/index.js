const {
  foreignAsset: { getForeignAssetDb },
} = require("@statescan/mongo");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const { deleteFrom } = require("./delete");
const { handleBlock } = require("./block");
const { scanKnownForeignAssetsHeights } = require("./known");

async function scan() {
  const db = await getForeignAssetDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  if (firstScanKnowHeights()) {
    await scanKnownForeignAssetsHeights(toScanHeight);
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
