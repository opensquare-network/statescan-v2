const { startJobs } = require("./jobs");
const { clearIssuance } = require("./store/blockInstances");
const { handleBlockIssuance } = require("./batch/issuance");
const { handleEvents } = require("./events");
const { deleteFrom } = require("./delete");
const {
  uniques: { getUniquesDb },
} = require("@statescan/mongo");
const {
  chain: { getBlockIndexer, wrapBlockHandler },
  scan: { oneStepScan, scanKnownHeights },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");

async function updateScanHeight(height) {
  const db = getUniquesDb();
  await db.updateScanHeight(height);
}

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);

  await handleBlockIssuance(blockIndexer);
  clearIssuance(blockIndexer.blockHeight);

  await updateScanHeight(height);
}

async function scan() {
  const db = getUniquesDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);
  await startJobs();

  if (firstScanKnowHeights()) {
    await scanKnownHeights(
      toScanHeight,
      undefined,
      wrapBlockHandler(handleBlock),
    );
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
