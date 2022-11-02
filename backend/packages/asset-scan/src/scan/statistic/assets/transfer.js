const moment = require("moment-timezone");
const {
  asset: { getTransferCollection },
} = require("@statescan/mongo");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");
const BigNumber = require("bignumber.js");

async function getAssetDayTransferData(assetId, assetHeight, timestamp) {
  const startTime = moment(timestamp).utc().startOf("day").toDate().getTime();

  const col = await getTransferCollection();
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

  const amount = (transfers || []).reduce((result, { balance }) => {
    return toDecimal128(new BigNumber(result).plus(balance).toNumber());
  }, 0);

  return {
    count: transfers.length,
    amount,
  };
}

module.exports = {
  getAssetDayTransferData,
};
