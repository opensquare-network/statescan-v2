const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let stakingRewardCol = null;
let stakingRewardTimelineCol = null;

async function initPalletStakingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_STAKING_SCAN_URL"),
    getEnvOrThrow("MONGO_STAKING_SCAN_NAME"),
  );
  await db.init();

  stakingRewardCol = await db.createCol("stakingReward");
  stakingRewardTimelineCol = await db.createCol("stakingRewardTimeline");

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
  
  await stakingRewardTimelineCol.createIndex({ "indexer.blockHeight": 1 });
  await stakingRewardTimelineCol.createIndex({ rewardId: 1 });
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

async function getStakingRewardTimelineCol() {
  await makeSureInit(stakingRewardTimelineCol);
  return stakingRewardTimelineCol;
}

module.exports = {
  initPalletStakingScanDb,
  getStakingDb,
  getStakingRewardCol,
  getStakingRewardTimelineCol,
};