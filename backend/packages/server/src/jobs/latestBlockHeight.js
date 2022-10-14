const {
  block: { getBlockDb },
} = require("@statescan/mongo");

let latestBlockHeight = 0;

async function queryAndSet() {
  const db = await getBlockDb();
  latestBlockHeight = await db.getScanHeight();
}

async function queryAndSetLatestBlockHeight() {
  setInterval(queryAndSet, 6 * 1000);
}

function getLatestBlockHeight() {
  return latestBlockHeight;
}

module.exports = {
  queryAndSetLatestBlockHeight,
  getLatestBlockHeight,
};
