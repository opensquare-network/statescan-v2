const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");
const { handleVestingsChange } = require("./vestings");

async function handleBlock({ block, events, height }) {
  const parentHash = block?.header?.parentHash;
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block?.extrinsics, events, blockIndexer, parentHash);
  await handleVestingsChange(blockIndexer);

  const db = await getVestingDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
