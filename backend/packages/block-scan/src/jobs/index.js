const {
  block: { getBlockDb },
} = require("@statescan/mongo");
const {
  chain: { getLatestFinalizedHeight, getLatestUnFinalizedHeight, getApi },
} = require("@osn/scan-common");
const { CronJob } = require("cron");
const { isInterlay } = require("../env");

const timeZone = "Asia/Shanghai";
const every6SecCron = "*/6 * * * * *";

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

async function getTotalIssuance() {
  const api = await getApi();
  if (isInterlay()) {
    const raw = await api.query.tokens.totalIssuance({ token: "INTR" });
    return raw.toString();
  } else {
    const raw = await api.query.balances.totalIssuance();
    return raw.toString();
  }
}

async function updateTotalIssuance() {
  const value = await getTotalIssuance();
  const col = await getBlockDb().getStatusCol();
  await col.updateOne(
    { name: "totalIssuance" },
    { $set: { value } },
    { upsert: true },
  );
}

function startJobs() {
  new CronJob(
    every6SecCron,
    async () => {
      await updateTotalIssuance();
      await updateHeights();
    },
    null,
    true,
    timeZone,
  );
}

module.exports = {
  startJobs,
};
