const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let scheduleCol = null;
let vestingCol = null; // store every account vesting

async function initVestingScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_IDENTITY_SCAN_URL"),
    getEnvOrThrow("MONGO_IDENTITY_SCAN_NAME"),
  );
  await db.init();

  scheduleCol = await db.createCol("schedule");
  vestingCol = await db.createCol("vesting");
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
    await initVestingScanDb();
  }
}

async function getScheduleCol() {
  await makeSureInit(scheduleCol);
  return scheduleCol;
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
  getScheduleCol,
  getVestingCol,
  getVestingDb,
};
