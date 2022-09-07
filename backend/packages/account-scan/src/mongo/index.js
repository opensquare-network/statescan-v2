const {
  mongo: {
    scan: { initScanDb },
    common: { getCollection },
  },
} = require("@osn/scan-common");

let client = null;
let db = null;

let addressCol = null;

async function initDb() {
  db = await initScanDb();
  addressCol = await getCollection(db, "address");

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  addressCol.createIndex({ address: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getAddressCollection() {
  await makeSureInit(addressCol);
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
