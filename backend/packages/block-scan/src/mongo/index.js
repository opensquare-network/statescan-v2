const {
  mongo: {
    scan: { initScanDb },
    common: { getCollection },
  },
} = require("@osn/scan-common");

let db = null;

let blockCol = null;
let eventCol = null;
let extrinsicCol = null;
let callCol = null;

async function initDb() {
  db = await initScanDb();

  blockCol = await getCollection(db, "block");
  eventCol = await getCollection(db, "event");
  extrinsicCol = await getCollection(db, "extrinsic");
  callCol = await getCollection(db, "call");

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  // todo: create indexes
}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getBlockCollection() {
  await tryInit(blockCol);
  return blockCol;
}

async function getExtrinsicCollection() {
  await tryInit(extrinsicCol);
  return extrinsicCol;
}

async function getEventCollection() {
  await tryInit(eventCol);
  return eventCol;
}

async function getCallCollection() {
  await tryInit(callCol);
  return callCol;
}

module.exports = {
  getBlockCollection,
  getExtrinsicCollection,
  getEventCollection,
  getCallCollection,
}
