const {
  asset: { getTransferCollection, getUnFinalizedTransferCol },
} = require("@statescan/mongo");
const { normalizeTransfers } = require("../../common/transfer");
const { setLatestSignedTransfers } = require("../../websocket/store");
const { CronJob } = require("cron");
const { every12Secs, timeZone } = require("./common");

async function query(col, size = 5) {
  const transfers = await col
    .find({ isSigned: true }, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .limit(size)
    .toArray();

  return normalizeTransfers(transfers);
}

async function queryUnFinalizedTransfers(size = 5) {
  const col = await getUnFinalizedTransferCol();
  return await query(col, size);
}

async function queryTransfers(size = 5) {
  const col = await getTransferCollection();
  return await query(col, size);
}

function normalizeTransfer(transfer = {}, isFinalized = true) {
  return {
    ...transfer,
    isFinalized,
  };
}

async function updateSignedTransfers() {
  const unFinalizedTransfers = await queryUnFinalizedTransfers();
  const finalizedTransfers = await queryTransfers();
  const transfers = [
    ...unFinalizedTransfers.map((item) => normalizeTransfer(item, false)),
    ...finalizedTransfers.map((item) => normalizeTransfer(item, true)),
  ].slice(0, 5);

  setLatestSignedTransfers(transfers);
}

function startLatestTransfersUpdateJob() {
  new CronJob(every12Secs, updateSignedTransfers, null, true, timeZone);
}

module.exports = {
  startLatestTransfersUpdateJob,
};
