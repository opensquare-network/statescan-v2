const moment = require("moment-timezone");
const {
  palletAsset: { getTransferCol },
} = require("@statescan/mongo");
const {
  utils: { bigIntAdd },
} = require("@statescan/common");

async function getAssetDayTransferData(assetId, assetHeight, timestamp) {
  const startTime = moment(timestamp).utc().startOf("day").toDate().getTime();

  const col = await getTransferCol();
  const transfers = await col
    .find(
      {
        $and: [
          { assetId },
          { assetHeight },
          { "indexer.blockTime": { $gte: startTime } },
          { "indexer.blockTime": { $lte: timestamp } },
        ],
      },
      {
        projection: { balance: 1 },
      },
    )
    .toArray();

  const amount = (transfers || []).reduce(
    (result, { balance }) => bigIntAdd(result, balance),
    "0",
  );
  return { count: transfers.length, amount };
}

module.exports = {
  getAssetDayTransferData,
};
