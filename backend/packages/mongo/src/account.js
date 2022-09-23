const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let addressCol = null;

async function initAccountScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_ACCOUNT_SCAN_URL"),
    getEnvOrThrow("MONGO_ACCOUNT_SCAN_NAME"),
  );
  await db.init();

  addressCol = await db.createCol("address");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await addressCol.createIndex({ address: 1 }, { unique: true });
  await addressCol.createIndex({ "data.total": 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initAccountScanDb();
  }
}

async function getAddressCollection() {
  await makeSureInit(addressCol);
  return addressCol;
}

function getAccountDb() {
  return db;
}

module.exports = {
  initAccountScanDb,
  getAddressCollection,
  getAccountDb,
};
