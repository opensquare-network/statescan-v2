const {
  block: { getBlockDb },
} = require("@statescan/mongo");
const {
  chain: { getLatestFinalizedHeight, getLatestUnFinalizedHeight, getApi },
} = require("@osn/scan-common");

async function updateHeights() {
  const db = getBlockDb();
  const col = await db.getStatusCol();

  const latestHeight = getLatestUnFinalizedHeight();
  const finalizedHeight = getLatestFinalizedHeight();
  const bulk = col.initializeUnorderedBulkOp();
  bulk
    .find({ name: "finalizedHeight" })
    .upsert()
    .updateOne({ $set: { value: finalizedHeight } });
  bulk
    .find({ name: "latestHeight" })
    .upsert()
    .updateOne({ $set: { value: latestHeight } });
  await bulk.execute();
}

async function updateTotalIssuance() {
  const api = await getApi();
  const raw = await api.query.balances.totalIssuance();
  const value = raw.toString();

  const col = await getBlockDb().getStatusCol();
  await col.updateOne(
    { name: "totalIssuance" },
    { $set: { value } },
    { upsert: true },
  );
}

async function startJobs() {
  try {
    await updateTotalIssuance();
    await updateHeights();
  } finally {
    setTimeout(startJobs, 6000);
  }
}

module.exports = {
  startJobs,
};
