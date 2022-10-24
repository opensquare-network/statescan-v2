const {
  block: { getBlockDb },
} = require("@statescan/mongo");

let latestBlockHeight = 0;

async function queryAndSet() {
  const db = await getBlockDb();
  latestBlockHeight = await db.getScanHeight();
}

async function queryAndSetLatestBlockHeight() {
  try {
    await queryAndSet();
  } finally {
    setTimeout(queryAndSetLatestBlockHeight, 6000);
  }
}

function getLatestBlockHeight() {
  return latestBlockHeight;
}

module.exports = {
  queryAndSetLatestBlockHeight,
  getLatestBlockHeight,
};
