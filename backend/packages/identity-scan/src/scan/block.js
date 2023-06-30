const { executeUpdateAllIdentitiesJob } = require("./jobs");
const { clearBlockAccounts } = require("../store");
const { updateBlockIdentities } = require("./jobs/block");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");
const { handleExtrinsics } = require("./extrinsic");

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

  await executeUpdateAllIdentitiesJob(blockIndexer);

  const db = await getIdentityDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
