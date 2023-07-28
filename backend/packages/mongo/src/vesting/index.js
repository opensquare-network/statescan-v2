const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let vestingCol = null;
let vestingTimelineCol = null;
let accountCol = null;
let accountTimelineCol = null;

async function initVestingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_VESTING_SCAN_URL"),
    getEnvOrThrow("MONGO_VESTING_SCAN_NAME"),
  );
  await db.init();

  vestingCol = await db.createCol("vesting");
  vestingTimelineCol = await db.createCol("vestingTimeline");

  accountCol = await db.createCol("account");
  accountTimelineCol = await db.createCol("accountTimeline");

  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await vestingCol.createIndex({
    target: 1,
    "indexer.initialBlockHeigh": 1,
    "indexer.initialIndex": 1,
    "indexer.currentIndex": 1,
  });
  await vestingTimelineCol.createIndex({
    "event.target": 1,
    "indexer.initialBlockHeigh": 1,
    "indexer.initialIndex": 1,
  });
  await accountCol.createIndex({
    account: 1,
  });
  await accountTimelineCol.createIndex({
    account: 1,
    "indexer.blockHeight": 1,
  });
}

async function makeSureInit(col) {
  if (!col) {
    await initVestingScanDb();
  }
}

async function getVestingCol() {
  await makeSureInit(vestingCol);
  return vestingCol;
}

async function getVestingTimelineCol() {
  await makeSureInit(vestingTimelineCol);
  return vestingTimelineCol;
}

async function getAccountCol() {
  await makeSureInit(accountCol);
  return accountCol;
}

async function getAccountTimelineCol() {
  await makeSureInit(accountTimelineCol);
  return accountTimelineCol;
}

async function getVestingDb() {
  if (!db) {
    await initVestingScanDb();
  }

  return db;
}

module.exports = {
  initVestingScanDb,
  getVestingDb,
  getVestingCol,
  getVestingTimelineCol,
  getAccountCol,
  getAccountTimelineCol,
};
