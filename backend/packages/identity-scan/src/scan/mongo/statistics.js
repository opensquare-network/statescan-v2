const {
  identity: { getStatisticsCol },
} = require("@statescan/mongo");

const keyName = "totalJudgementGiven";
const generalKeyName = "general";

async function incJudgementGiven(indexer) {
  const col = await getStatisticsCol();
  const judgementGiven = await col.findOne({ name: keyName });
  if (!judgementGiven) {
    await col.insertOne({
      name: keyName,
      value: 1,
      indexer,
    });
  } else {
    await col.updateOne(
      { name: keyName },
      { $set: { value: judgementGiven.value + 1, indexer } },
    );
  }
}

async function upsertGeneralStatistics(statistics = {}, indexer) {
  const col = await getStatisticsCol();
  await col.updateOne(
    { name: generalKeyName },
    { $set: { ...statistics, indexer } },
    { upsert: true },
  );
}

module.exports = {
  incJudgementGiven,
  upsertGeneralStatistics,
};
