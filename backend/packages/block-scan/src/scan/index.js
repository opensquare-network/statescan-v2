const { startJobs } = require("../jobs");
const { deleteAllUnFinalizedData } = require("./unFinalized/delete");
const { deleteFrom } = require("../mongo/services/delete");
const { updateUnFinalized } = require("./unFinalized");
const { batchInsertCalls } = require("../mongo/services/call");
const { batchInsertExtrinsics } = require("../mongo/services/extrinsic");
const { batchInsertEvents } = require("../mongo/services/event");
const { insertBlock } = require("../mongo/services/block");
const { normalizeBlock } = require("./block");
const { normalizeEvents } = require("./event");
const { normalizeExtrinsics } = require("./extrinsic");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight, wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const {
  block: { getBlockDb },
} = require("@statescan/mongo");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  const normalizedEvents = normalizeEvents(events, blockIndexer);
  const { normalizedExtrinsics, normalizedCalls } = await normalizeExtrinsics(
    block.extrinsics,
    events,
    blockIndexer,
  );

  await insertBlock(normalizedBlock);
  await batchInsertExtrinsics(normalizedExtrinsics);
  await batchInsertEvents(normalizedEvents);
  await batchInsertCalls(normalizedCalls);

  const db = getBlockDb();
  await db.updateScanHeight(height);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight) {
    await updateUnFinalized(finalizedHeight);
  }
}

async function scan() {
  const db = getBlockDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  const finalizedHeight = getLatestFinalizedHeight();
  if (toScanHeight < finalizedHeight - 100) {
    await deleteAllUnFinalizedData();
  } else if (toScanHeight > finalizedHeight - 100) {
    await startJobs();
  }

  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
      true,
    );
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
