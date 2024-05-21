const {
  vesting: { getVestingCol },
} = require("@statescan/mongo");
const {
  chain: { getApi },
} = require("@osn/scan-common");

async function updateAllVesting() {
  const col = await getVestingCol();
  const bulk = col.initializeOrderedBulkOp();
  bulk.find({}).delete();

  const api = await getApi();
  const entries = await api.query?.vesting?.vesting.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const address = storageKey.args[0].toString();
    if (!optionalStorage.isSome) {
      continue;
    }

    const storage = optionalStorage.unwrap();
    const json = storage.toJSON();
    if (Array.isArray(json)) {
      for (const item of json) {
        bulk.insert({ address, ...item });
      }
    } else {
      bulk.insert({ address, ...json });
    }
  }

  await bulk.execute();
}

module.exports = {
  updateAllVesting,
};
