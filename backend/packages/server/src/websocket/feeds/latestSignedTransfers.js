const util = require("util");
const {
  latestSignedTransfersRoom,
  latestSignedTransfersKey,
  feedInterval,
} = require("../consts");
const {
  getLatestSignedTransfers,
  setLatestSignedTransfers,
} = require("../store");
const {
  asset: { getTransferCollection, getUnFinalizedTransferCol },
} = require("@statescan/mongo");

async function query(col, size = 5) {
  return await col
    .find({}, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .limit(size)
    .toArray();
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

async function feedLatestSignedTransfers(io) {
  try {
    const oldData = await getLatestSignedTransfers();
    const unFinalizedTransfers = await queryUnFinalizedTransfers();
    const finalizedTransfers = await queryTransfers();
    const transfers = [
      ...unFinalizedTransfers.map((item) => normalizeTransfer(item, false)),
      ...finalizedTransfers.map((item) => normalizeTransfer(item, true)),
    ].slice(0, 5);

    if (util.isDeepStrictEqual(oldData, transfers)) {
      return;
    }

    setLatestSignedTransfers(transfers);
    io.to(latestSignedTransfersRoom).emit(latestSignedTransfersKey, transfers);
  } catch (e) {
    console.error("feed latest signed transfers error:", e);
  } finally {
    setTimeout(feedLatestSignedTransfers.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedLatestSignedTransfers,
};
