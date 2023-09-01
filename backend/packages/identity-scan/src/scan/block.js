const { clearBlockAccounts } = require("../store");
const { updateBlockIdentities } = require("./jobs/block");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight },
} = require("@osn/scan-common");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");
const { handleExtrinsics } = require("./extrinsic");
const { saveGeneralStatistics } = require("./jobs");

/**
 * fetch block indexer and handle events
 * @param block
 * @param events
 * @param height
 * @returns {Promise<void>}
 */
async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);

  await updateBlockIdentities(blockIndexer);
  clearBlockAccounts(blockIndexer.blockHash);

  const chainHeight = getLatestFinalizedHeight();
  if (chainHeight > height + 100 && chainHeight % 100 === 0) {
    await saveGeneralStatistics(blockIndexer);
  }

  // note: we disable this because we can not get the latest update for identity
  // await executeUpdateAllIdentitiesJob(blockIndexer);

  const db = await getIdentityDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
