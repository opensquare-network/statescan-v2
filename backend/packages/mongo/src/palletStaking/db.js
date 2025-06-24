const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let rewardCol = null;

async function initPalletStakingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_STAKING_SCAN_URL"),
    getEnvOrThrow("MONGO_STAKING_SCAN_NAME"),
  );
  await db.init();

  rewardCol = await db.createCol("reward");

  _createIndexes().then(() => console.log("staking scan DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first to initialize staking DB");
    process.exit(1);
  }

  // todo: add indexes for reward col
}

async function getStakingDb() {
  if (!db) {
    await initPalletStakingScanDb();
  }
  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initPalletStakingScanDb();
  }
}

async function getStakingRewardCol() {
  await makeSureInit(rewardCol);
  return rewardCol;
}

module.exports = {
  initPalletStakingScanDb,
  getStakingDb,
  getStakingRewardCol,
};
