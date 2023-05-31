const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");

const { getVestingEvents, clearAllEvents } = require("../store/event");
const { getVestingCalls, clearAllCalls } = require("../store/call");
const { generateVestingSummary } = require("../service/vestingSummary");

const {
  upsertVestingSummary,
  batchUpsertAccountVestingSummary,
  batchUpsertEvents,
  batchUpsertCalls,
} = require("../mongo");

async function handleBlock({ block, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  await handleExtrinsics(block?.extrinsics, events, blockIndexer);
  await handleEvents(events, blockIndexer, block.extrinsics);

  const vestingSummaryResult = await generateVestingSummary(blockIndexer);

  if (vestingSummaryResult) {
    const [vestingSummary, accountSummaryList] = vestingSummaryResult;
    await upsertVestingSummary(vestingSummary);
    await batchUpsertAccountVestingSummary(accountSummaryList);
  }

  await batchUpsertEvents(getVestingEvents());
  await batchUpsertCalls(getVestingCalls());

  clearAllEvents();
  clearAllCalls();
  const db = await getVestingDb();
  await db.updateScanHeight(height);
}

module.exports = {
  handleBlock,
};
