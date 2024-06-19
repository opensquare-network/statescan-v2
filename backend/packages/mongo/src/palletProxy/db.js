const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let proxyCol = null;

async function initPalletProxyScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_PALLET_PROXY_SCAN_URL"),
    getEnvOrThrow("MONGO_PALLET_PROXY_SCAN_NAME"),
  );
  await db.init();

  proxyCol = await db.createCol("proxy");

  _createIndexes().then(() => console.log("proxy scan DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first to initialize proxy DB");
    process.exit(1);
  }
}

async function getProxyDb() {
  if (!db) {
    await initPalletProxyScanDb();
  }

  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initPalletProxyScanDb();
  }
}

async function getProxyCol() {
  await makeSureInit(proxyCol);
  return proxyCol;
}

module.exports = {
  getProxyDb,
  initPalletProxyScanDb,
  getProxyCol,
};
