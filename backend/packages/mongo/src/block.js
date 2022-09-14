const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let blockCol = null;
let eventCol = null;
let extrinsicCol = null;
let callCol = null;

let unFinalizedBlockCol = null;
let unFinalizedEventCol = null;
let unFinalizedExtrinsicCol = null;
let unFinalizedCallCol = null;

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

  unFinalizedBlockCol = await db.createCol("unFinalizedBlock");
  unFinalizedEventCol = await db.createCol("unFinalizedEvent");
  unFinalizedExtrinsicCol = await db.createCol("unFinalizedExtrinsic");
  unFinalizedCallCol = await db.createCol("unFinalizedCall");

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  blockCol.createIndex({ hash: 1 });
  blockCol.createIndex({ height: 1 });

  extrinsicCol.createIndex({ "indexer.blockHeight": 1 });
  extrinsicCol.createIndex({
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
  });

  eventCol.createIndex({ "indexer.blockHeight": 1 });
  callCol.createIndex({ "indexer.blockHeight": 1 });
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

async function getUnFinalizedBlockCollection() {
  await makeSureInit(unFinalizedBlockCol);
  return unFinalizedBlockCol;
}

async function getUnFinalizedEventCollection() {
  await makeSureInit(unFinalizedEventCol);
  return unFinalizedEventCol;
}

async function getUnFinalizedExtrinsicCollection() {
  await makeSureInit(unFinalizedExtrinsicCol);
  return unFinalizedExtrinsicCol;
}

async function getUnFinalizedCallCollection() {
  await makeSureInit(unFinalizedCallCol);
  return unFinalizedCallCol;
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

  getUnFinalizedBlockCollection,
  getUnFinalizedEventCollection,
  getUnFinalizedExtrinsicCollection,
  getUnFinalizedCallCollection,
};
