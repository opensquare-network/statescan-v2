require("dotenv").config();
const {
  palletStaking: { initPalletStakingScanDb, getStakingRewardCol },
} = require("@statescan/mongo");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { getBonded } = require("../scan/common/bond");
const isNil = require("lodash.isnil");

async function query(col) {
  return await col
    .find({
      "dest.controller": { $exists: true },
      bonded: { $exists: false },
    })
    .limit(100)
    .toArray();
}

function isController(dest) {
  return (dest || {})?.hasOwnProperty("controller");
}

async function handleEach(obj, col) {
  const { who, dest, indexer } = obj || {};
  const { blockHeight, eventIndex, blockHash } = indexer || {};
  if (who && isController(dest)) {
    const bonded = await getBonded(who, blockHash);
    const q = { who, "indexer.blockHeight": blockHeight };
    if (!isNil(eventIndex)) {
      Object.assign(q, { "indexer.eventIndex": eventIndex });
    }
    await col.findOneAndUpdate(q, { $set: { bonded } });
    console.log(`${who} at ${indexer.blockHeight} is handled`);
  }
}

(async () => {
  await initPalletStakingScanDb();
  await getApi();
  const col = await getStakingRewardCol();
  let records = await query(col);
  while (records.length > 0) {
    const promises = [];
    for (const record of records) {
      promises.push(handleEach(record, col));
    }
    await Promise.all(promises);
    records = await query(col);
  }

  console.log("Finished");
  process.exit(0);
})();
