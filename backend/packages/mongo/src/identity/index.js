const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let identityCol = null;
let identityTimelineCol = null;

async function initIdentityScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_IDENTITY_SCAN_URL"),
    getEnvOrThrow("MONGO_IDENTITY_SCAN_NAME"),
  );
  await db.init();

  identityCol = await db.createCol("identity");
  identityTimelineCol = await db.createCol("identityTimeline");
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
    await initIdentityScanDb();
  }
}

async function getIdentityCol() {
  await makeSureInit(identityCol);
  return identityCol;
}

async function getIdentityTimelineCol() {
  await makeSureInit(identityTimelineCol);
  return identityTimelineCol;
}

async function getIdentityDb() {
  if (!db) {
    await initIdentityScanDb();
  }

  return db;
}

module.exports = {
  initIdentityScanDb,
  getIdentityDb,
  getIdentityCol,
  getIdentityTimelineCol,
};
