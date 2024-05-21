require("dotenv").config();

const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");
const {
  asset: {
    getAssetCol,
    getTransferCollection,
    getAssetTimelineCol,
    getAssetDailyStatisticCol,
  },
} = require("@statescan/mongo");

(async () => {
  const timelineCol = await getAssetTimelineCol();
  await saveHeightsCommon(timelineCol);

  const assetCol = await getAssetCol();
  await saveHeightsCommon(assetCol);

  const transferCol = await getTransferCollection();
  await saveHeightsCommon(transferCol);

  const statisticsCol = await getAssetDailyStatisticCol();
  await saveHeightsCommon(statisticsCol);

  process.exit(0);
})();
