const { Decimal128 } = require("mongodb");
const {
  vesting: { getSummaryCol, getAccountSummaryCol, getEventCol, getCallCol },
} = require("@statescan/mongo");

async function batchUpsertAccountVestingSummary(accountVestingSummaryList) {
  const accountSummaryCol = await getAccountSummaryCol();
  const bulkOp = accountSummaryCol.initializeUnorderedBulkOp();

  accountVestingSummaryList.forEach((summary) => {
    bulkOp
      .find({
        "indexer.blockHash": summary.indexer.blockHash,
        account: summary.account,
      })
      .upsert()
      .updateOne({
        $set: { ...summary, lockedAmount: toDecimal128(summary.lockedAmount) },
      });
  });
  await bulkOp.execute();
}

async function upsertVestingSummary(summary) {
  const vestingSummaryCol = await getSummaryCol();
  const option = { upsert: true };
  await vestingSummaryCol.updateOne(
    { "indexer.blockHash": summary.indexer.blockHash },
    { $set: { ...summary, lockedAmount: toDecimal128(summary.lockedAmount) } },
    option,
  );
}

async function batchUpsertEvents(events) {
  if (events.length === 0) {
    return;
  }
  const eventCol = await getEventCol();
  const bulkOp = eventCol.initializeUnorderedBulkOp();

  events.forEach((event) => {
    bulkOp
      .find({
        "indexer.blockHash": event.indexer.blockHash,
        "indexer.eventIndex": event.indexer.eventIndex,
      })
      .upsert()
      .updateOne({ $set: event });
  });
  await bulkOp.execute();
}

async function batchUpsertCalls(calls) {
  if (calls.length === 0) {
    return;
  }
  const callCol = await getCallCol();
  const bulkOp = callCol.initializeUnorderedBulkOp();

  calls.forEach((call) => {
    bulkOp
      .find({
        "indexer.blockHash": call.indexer.blockHash,
        "indexer.extrinsicIndex": call.indexer.extrinsicIndex,
      })
      .upsert()
      .updateOne({ $set: call });
  });
  await bulkOp.execute();
}

function toDecimal128(amount) {
  return Decimal128.fromString(amount.toString());
}

module.exports = {
  batchUpsertAccountVestingSummary,
  batchUpsertEvents,
  batchUpsertCalls,
  upsertVestingSummary,
};
