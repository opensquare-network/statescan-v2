const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);

  const db = await getIdentityDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
