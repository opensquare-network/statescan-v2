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
  asset: { getTransferCollection },
} = require("@statescan/mongo");

async function queryTransfers(size = 5) {
  const col = await getTransferCollection();
  return await col
    .find({}, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .limit(size)
    .toArray();
}

async function feedLatestSignedTransfers(io) {
  try {
    const oldData = await getLatestSignedTransfers();
    const transfers = await queryTransfers();
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
