const { handleEvents } = require("./events");
const { deleteFrom } = require("./delete");
const {
  uniques: { getUniquesDb },
} = require("@statescan/mongo");
const {
  chain: { getBlockIndexer, wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);

  const db = getUniquesDb();
  await db.updateScanHeight(height);
}

async function scan() {
  const db = getUniquesDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

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
