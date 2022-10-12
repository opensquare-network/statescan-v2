const { updateUnFinalized } = require("./unFinalized");
const { deleteFrom } = require("./delete");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight, wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const {
  asset: { getAssetDb },
  block: { getBlockDb },
} = require("@statescan/mongo");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);

  // todo: handle block business
  const db = getAssetDb();
  await db.updateScanHeight(height);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight) {
    await updateUnFinalized(finalizedHeight);
  }
}

async function scan() {
  const db = getAssetDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  const blockDb = await getBlockDb();
  while (true) {
    const blockScanHeight = await blockDb.getScanHeight();
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
      false,
      blockScanHeight,
    );
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
