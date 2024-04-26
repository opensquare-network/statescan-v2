const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("@statescan/asset-scan/src/scan/delete");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight, wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const { handleEvents } = require("./events");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);

  const db = getAssetDb();
  await db.updateScanHeight(height);
  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight - 100) {
    // todo: handle un finalized
  }
}

async function scan() {
  const db = getAssetDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  // todo: scan known heights

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
