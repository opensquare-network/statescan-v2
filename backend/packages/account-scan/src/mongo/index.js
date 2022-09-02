const { MongoClient } = require("mongodb");

function getDbName() {
  const dbName = process.env.MONGO_DB_SCAN_NAME;
  if (!dbName) {
    throw new Error("MONGO_ACCOUNT_DB_NAME not set");
  }

  return dbName;
}

const mongoUrl = process.env.MONGO_SCAN_URL || "mongodb://127.0.0.1:27017";

let client = null;
let db = null;

let addressCol = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  const dbName = getDbName();
  console.log(`Use scan DB name:`, dbName);

  db = client.db(dbName);

  addressCol = await db.collection("address");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  addressCol.createIndex({ address: 1 });
}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getAddressCollection() {
  await tryInit(addressCol);
  return addressCol;
}

async function closeDb() {
  if (client) {
    await client.close();
  }
}

module.exports = {
  getAddressCollection,
  closeDb,
};
