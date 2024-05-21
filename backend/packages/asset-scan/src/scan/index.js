const { tryCreateAssetStatistics } = require("./statistic/assets");
const { updateUnFinalized } = require("./unFinalized");
const { deleteFrom } = require("./delete");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight, wrapBlockHandler },
  scan: { oneStepScan, scanKnownHeights },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const {
  asset: { getAssetDb },
  block: { getBlockDb },
} = require("@statescan/mongo");
const { deleteAllUnFinalizedData } = require("./unFinalized/db");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);

  await tryCreateAssetStatistics(blockIndexer);

  const db = getAssetDb();
  await db.updateScanHeight(height);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight - 100) {
    await updateUnFinalized(finalizedHeight);
  }
}

async function getBlockScanHeight() {
  let blockScanHeight = null;
  const blockDb = await getBlockDb();
  if (process.env.FOLLOW_BLOCK_SCAN === "true") {
    blockScanHeight = await blockDb.getScanHeight();
  }

  return blockScanHeight;
}

async function scan() {
  const db = getAssetDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  if (firstScanKnowHeights()) {
    await scanKnownHeights(
      toScanHeight,
      undefined,
      wrapBlockHandler(handleBlock),
    );
    toScanHeight = await db.getNextScanHeight();
  }

  const finalizedHeight = getLatestFinalizedHeight();
  if (toScanHeight < finalizedHeight - 100) {
    await deleteAllUnFinalizedData();
  } else if (toScanHeight >= finalizedHeight) {
    await updateUnFinalized(finalizedHeight);
  }

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
      false,
      await getBlockScanHeight(),
    );
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
