const {
  createBlockColIndexes,
  createExtrinsicColIndexes,
  createEventColIndexes,
  createCallColIndexes,
  createTransferIndexes,
  createEvmTxIndexes,
} = require("./dbIndexes");
const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let blockCol = null;
let eventCol = null;
let extrinsicCol = null;
let callCol = null;
let transferCol = null;
let evmTxCol = null;

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
  transferCol = await db.createCol("transfer");
  evmTxCol = await db.createCol("evmTx");

  unFinalizedBlockCol = await db.createCol("unFinalizedBlock");
  unFinalizedEventCol = await db.createCol("unFinalizedEvent");
  unFinalizedExtrinsicCol = await db.createCol("unFinalizedExtrinsic");
  unFinalizedCallCol = await db.createCol("unFinalizedCall");

  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await createBlockColIndexes(blockCol);
  await createExtrinsicColIndexes(extrinsicCol);
  await createEventColIndexes(eventCol);
  await createCallColIndexes(callCol);
  await createTransferIndexes(transferCol);
  await createEvmTxIndexes(evmTxCol);
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

async function getTransferCol() {
  await makeSureInit(transferCol);
  return transferCol;
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

async function getEvmTxCol() {
  await makeSureInit(evmTxCol);
  return evmTxCol;
}

module.exports = {
  initBlockDb,
  getBlockDb,
  getBlockCollection,
  getExtrinsicCollection,
  getEventCollection,
  getCallCollection,
  getTransferCol,
  getEvmTxCol,

  getUnFinalizedBlockCollection,
  getUnFinalizedEventCollection,
  getUnFinalizedExtrinsicCollection,
  getUnFinalizedCallCollection,
};
