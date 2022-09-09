const {
  mongo: {
    ScanDb,
  },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let blockCol = null;
let eventCol = null;
let extrinsicCol = null;
let callCol = null;

async function initBlockDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_BLOCK_SCAN_URL"),
    getEnvOrThrow("MONGO_BLOCK_SCAN_NAME"),
  );
  await db.init();

  blockCol = await db.createCol("block");
  eventCol = await db.createCol("event");
  extrinsicCol = await db.createCol("extrinsic");
  callCol = await db.createCol("call");

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  blockCol.createIndex({ hash: 1 });
  blockCol.createIndex({ height: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initBlockDb();
  }
}

async function getBlockCollection() {
  await makeSureInit(blockCol);
  return blockCol;
}

async function getExtrinsicCollection() {
  await makeSureInit(extrinsicCol);
  return extrinsicCol;
}

async function getEventCollection() {
  await makeSureInit(eventCol);
  return eventCol;
}

async function getCallCollection() {
  await makeSureInit(callCol);
  return callCol;
}

function getBlockDb() {
  return db;
}

module.exports = {
  initBlockDb,
  getBlockDb,
  getBlockCollection,
  getExtrinsicCollection,
  getEventCollection,
  getCallCollection,
}
