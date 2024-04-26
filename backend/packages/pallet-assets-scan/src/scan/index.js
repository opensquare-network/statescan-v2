const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("@statescan/asset-scan/src/scan/delete");
const {
  chain: { getBlockIndexer, wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);
  await doJobsAfterBlock(blockIndexer);
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
