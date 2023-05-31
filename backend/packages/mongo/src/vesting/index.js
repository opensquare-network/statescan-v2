const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let summaryCol = null;
let accountSummaryCol = null;
let eventCol = null;
let callCol = null;

async function initVestingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_IDENTITY_SCAN_URL"),
    getEnvOrThrow("MONGO_IDENTITY_SCAN_NAME"),
  );
  await db.init();

  summaryCol = await db.createCol("summary");
  accountSummaryCol = await db.createCol("accountSummary");
  eventCol = await db.createCol("event");
  callCol = await db.createCol("call");

  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await summaryCol.createIndex({ "indexer.blockHeight": 1 });
  await accountSummaryCol.createIndex({ account: 1, "indexer.blockHeight": 1 });
  await eventCol.createIndex({
    "indexer.blockHeight": 1,
    "indexer.eventIndex": 1,
  });
  await callCol.createIndex({
    "indexer.blockHeight": 1,
    "indexer.extrinsicIndex": 1,
  });
}

async function makeSureInit(col) {
  if (!col) {
    await initVestingScanDb();
  }
}

async function getSummaryCol() {
  await makeSureInit(summaryCol);
  return summaryCol;
}

async function getAccountSummaryCol() {
  await makeSureInit(accountSummaryCol);
  return accountSummaryCol;
}

async function getEventCol() {
  await makeSureInit(eventCol);
  return eventCol;
}

async function getCallCol() {
  await makeSureInit(callCol);
  return callCol;
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
  getSummaryCol,
  getAccountSummaryCol,
  getEventCol,
  getCallCol,
};
