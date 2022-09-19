const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let transferCol = null;

async function initAssetScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_ASSET_SCAN_URL"),
    getEnvOrThrow("MONGO_ASSET_SCAN_NAME"),
  );
  await db.init();

  transferCol = await db.createCol("transfer");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }
}

async function makeSureInit(col) {
  if (!col) {
    await initAssetScanDb();
  }
}

async function getTransferCollection() {
  await makeSureInit(transferCol);
  return transferCol;
}

function getAssetDb() {
  return db;
}

module.exports = {
  initAssetScanDb,
  getTransferCollection,
  getAssetDb,
};
