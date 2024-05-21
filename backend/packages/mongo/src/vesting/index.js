const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let vestingCol = null;

async function initVestingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_VESTING_SCAN_URL"),
    getEnvOrThrow("MONGO_VESTING_SCAN_NAME"),
  );
  await db.init();

  vestingCol = await db.createCol("vesting");
  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await vestingCol.createIndex({ address: 1 });
  await vestingCol.createIndex({ startingBlock: -1, address: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initVestingScanDb();
  }
}

async function getVestingCol() {
  await makeSureInit(vestingCol);
  return vestingCol;
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
  getVestingCol,
};
