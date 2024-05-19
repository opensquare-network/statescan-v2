const {
  mongo: { ScanDb },
  env: { getEnvOrThrow, getScanStep },
} = require("@osn/scan-common");

let db = null;
let heightCol = null;

async function initKnownHeightDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_DB_KNOWN_HEIGHTS_URL"),
    getEnvOrThrow("MONGO_DB_KNOWN_HEIGHTS_NAME"),
  );
  await db.init();

  heightCol = await db.createCol("height");
  _createIndexes().then(() => console.log("known height DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await heightCol.createIndex({ height: 1 }, { unique: true });
}

async function makeSureInit(col) {
  if (!col) {
    await initKnownHeightDb();
  }
}

async function getHeightCol() {
  await makeSureInit(heightCol);
  return heightCol;
}

async function getKnownHeightDb() {
  if (!db) {
    await initKnownHeightDb();
  }

  return db;
}

async function saveKnownHeights(heights = []) {
  if (heights.length <= 0) {
    return;
  }

  const col = await getHeightCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const height of heights) {
    bulk.find({ height }).upsert().updateOne({ $set: { height } });
  }

  await bulk.execute();
}

async function getNextKnownHeights(beginHeight) {
  const step = 1;
  const col = await getHeightCol();
  const records = await col
    .find({
      height: { $gte: beginHeight },
    })
    .sort({ height: 1 })
    .limit(step)
    .toArray();

  const heights = (records || []).map((item) => item.height);
  return [...new Set(heights)].sort((a, b) => a - b);
}

module.exports = {
  initKnownHeightDb,
  getHeightCol,
  getKnownHeightDb,
  getNextKnownHeights,
  saveKnownHeights,
};
