const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
  scan: { oneStepScan },
  utils: { sleep },
  logger,
} = require("@osn/scan-common");
const {
  asset: { getAssetDb },
} = require("@statescan/mongo");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);

  // todo: handle block business
  const db = getAssetDb();
  await db.updateScanHeight(height);
}

async function wrappedHandleBlock(wrappedBlock) {
  try {
    await handleBlock(wrappedBlock);
  } catch (e) {
    logger.error(`${wrappedBlock.height} scan error`, e);
    throw e;
  }
}

async function scan() {
  const db = getAssetDb();
  let toScanHeight = await db.getNextScanHeight();

  // todo: handle business
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, wrappedHandleBlock);
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
