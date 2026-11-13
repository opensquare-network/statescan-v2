const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let contractCol = null;
let callCol = null;
let verifiedContractCol = null;
let tokenCol = null;

async function initPalletReviveScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_PALLET_REVIVE_SCAN_URL"),
    getEnvOrThrow("MONGO_PALLET_REVIVE_SCAN_NAME"),
  );
  await db.init();

  contractCol = await db.createCol("contract");
  callCol = await db.createCol("call");
  verifiedContractCol = await db.createCol("verifiedContract");
  tokenCol = await db.createCol("token");

  await _createIndexes();
  console.log("revive scan DB indexes created!");
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first to initialize revive DB");
    process.exit(1);
  }

  await contractCol.createIndex({ address: 1 }, { unique: true });
  await contractCol.createIndex({ deployer: 1 });
  await contractCol.createIndex({ "indexer.blockHeight": -1 });

  await callCol.createIndex({ dest: 1, "indexer.blockHeight": -1 });
  await callCol.createIndex({ caller: 1, "indexer.blockHeight": -1 });
  await callCol.createIndex({ methodHash: 1, "indexer.blockHeight": -1 });
  await callCol.createIndex({
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
    "indexer.eventIndex": 1,
  });

  await verifiedContractCol.createIndex({ address: 1 }, { unique: true });
  await verifiedContractCol.createIndex({ verifiedAt: -1 });
  await verifiedContractCol.createIndex({ name: 1 });

  await tokenCol.createIndex({ address: 1 }, { unique: true });
  await tokenCol.createIndex({ symbol: 1 });
  await tokenCol.createIndex({ updatedAt: -1 });
  await tokenCol.createIndex({ "indexer.blockHeight": -1 });
}

async function getReviveDb() {
  if (!db) {
    await initPalletReviveScanDb();
  }

  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initPalletReviveScanDb();
  }
}

async function getContractCol() {
  await makeSureInit(contractCol);
  return contractCol;
}

async function getCallCol() {
  await makeSureInit(callCol);
  return callCol;
}

async function getVerifiedContractCol() {
  await makeSureInit(verifiedContractCol);
  return verifiedContractCol;
}

async function getTokenCol() {
  await makeSureInit(tokenCol);
  return tokenCol;
}

module.exports = {
  initPalletReviveScanDb,
  getReviveDb,
  getContractCol,
  getCallCol,
  getVerifiedContractCol,
  getTokenCol,
};
