const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");
const { handleVestingsChange } = require("./vestings");
const { handleAccountChanges } = require("./account");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block?.extrinsics, events, blockIndexer);
  await handleEvents(events, blockIndexer, block.extrinsics);

  await handleVestingsChange(blockIndexer);
  await handleAccountChanges();

  const db = await getVestingDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
