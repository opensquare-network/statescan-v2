const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");

const { clearAllEvents } = require("../store/event");

const { clearAllCalls } = require("../store/call");

const { generateVestingSummary } = require("../service/vestingSummary");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block?.extrinsics, events, blockIndexer);
  await handleEvents(events, blockIndexer, block.extrinsics);

  const [vestingSummary, accountSummaryList] = await generateVestingSummary(
    blockIndexer,
  );

  const db = await getIdentityDb();
  await db.updateScanHeight(height);

  clearAllEvents();
  clearAllCalls();
}

module.exports = {
  handleBlock,
};
