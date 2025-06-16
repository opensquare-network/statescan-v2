const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let stakingRewardCol = null;

async function initPalletStakingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_STAKING_SCAN_URL"),
    getEnvOrThrow("MONGO_STAKING_SCAN_NAME"),
  );
  await db.init();

  stakingRewardCol = await db.createCol("stakingReward");

  _createIndexes().then(() => console.log("staking scan DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first to initialize staking DB");
    process.exit(1);
  }

  await stakingRewardCol.createIndex({ "indexer.blockHeight": 1 });
  await stakingRewardCol.createIndex({ stash: 1 });
  await stakingRewardCol.createIndex({ rewardId: 1 }, { unique: true });

  await stakingRewardCol.createIndex({ destType: 1 });
  await stakingRewardCol.createIndex({ destAccount: 1 });
  await stakingRewardCol.createIndex({ era: 1 });
  await stakingRewardCol.createIndex({ isValidator: 1 });
  await stakingRewardCol.createIndex({ stash: 1, era: 1 });
  await stakingRewardCol.createIndex({ era: 1, isValidator: 1 });
  await stakingRewardCol.createIndex({ "exposure.total": 1 });

  // 移除 timeline 相关索引
  // await stakingRewardTimelineCol.createIndex({ "indexer.blockHeight": 1 });
  await stakingRewardCol.createIndex({ "indexer.blockHeight": 1, stash: 1 });
  await stakingRewardCol.createIndex({ era: 1, amount: 1 });
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
  await makeSureInit(stakingRewardCol);
  return stakingRewardCol;
}

module.exports = {
  initPalletStakingScanDb,
  getStakingDb,
  getStakingRewardCol,
};
