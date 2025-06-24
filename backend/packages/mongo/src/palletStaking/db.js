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

  await rewardCol.createIndex({ "indexer.blockHeight": 1 });
  await rewardCol.createIndex({ stash: 1 });
  await rewardCol.createIndex({ rewardId: 1 }, { unique: true });

  await rewardCol.createIndex({ destType: 1 });
  await rewardCol.createIndex({ destAccount: 1 });
  await rewardCol.createIndex({ era: 1 });
  await rewardCol.createIndex({ isValidator: 1 });
  await rewardCol.createIndex({ stash: 1, era: 1 });
  await rewardCol.createIndex({ era: 1, isValidator: 1 });
  await rewardCol.createIndex({ "exposure.total": 1 });
  await rewardCol.createIndex({ "indexer.blockHeight": 1, stash: 1 });
  await rewardCol.createIndex({ era: 1, amount: 1 });
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
