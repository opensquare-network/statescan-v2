const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  multisig: { getMultisigDb },
} = require("@statescan/mongo");
const { handleEvents } = require("./events");
const { handleExtrinsics } = require("./extrinsic");

async function handleBlock({ block, events, height }, updateHeight = true) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);

  if (updateHeight) {
    const db = await getMultisigDb();
    await db.updateScanHeight(height);
  }
}

module.exports = {
  handleBlock,
};
