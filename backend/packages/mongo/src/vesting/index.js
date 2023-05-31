const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let summaryCol = null;
let accountSummaryCol = null;
let blockRecordCol = null;
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
  blockRecordCol = await db.createCol("blockRecord");
  eventCol = await db.createCol("event");
  callCol = await db.createCol("call");

  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  // todo: create indexes
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

async function getBlockRecordCol() {
  await makeSureInit(blockRecordCol);
  return blockRecordCol;
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
  getBlockRecordCol,
  getEventCol,
  getCallCol,
};
